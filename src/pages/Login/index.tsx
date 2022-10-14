import './index.scss'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context'

type ILoginState = {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const { error, loading, dispatch } = useContext(AuthContext)
    const passwordRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [login, setLogin] = useState<ILoginState>({
        username: '',
        password: ''
    })

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLogin(prevLoginInfo => {
            return {
                ...prevLoginInfo,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        usernameRef.current!.value = ''
        passwordRef.current!.value = ''
        dispatch?.({ type: 'LOGIN_START', user: null })
        try {
            const response = await axios.post('http://localhost:8000/auth/login', login)
            const { data } = response.data
            console.log(data)
            if (!data) dispatch?.({ type: 'LOGIN_FAILURE', error: 'משתמש לא קיים!', user: null })
            dispatch?.({ type: 'LOGIN_SUCCESS', user: data })
            navigate('/agents')
        } catch (error) {
            dispatch?.({ type: 'LOGIN_FAILURE', error: 'שם משתמש או סיסמה לא נכונים!', user: null })
        }
    }

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <form className='login-container__form'>
                <span>התחברות למערכת</span>
                {error && <span dir='rtl'>{error}</span>}
                <input
                    ref={usernameRef}
                    type='text'
                    name='username'
                    className='login-container__form__input'
                    placeholder='שם משתמש'
                    onChange={handleOnChange}
                />
                <input
                    ref={passwordRef}
                    type='password'
                    name='password'
                    className="login-container__form__input"
                    placeholder='סיסמא'
                    onChange={handleOnChange}
                />
                <button disabled={loading} type='submit' className='btn btn-primary'>התחבר</button>
            </form>
        </div>
    )
}

export default Login
