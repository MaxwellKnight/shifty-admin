import { useReducer, createContext, useEffect } from 'react'
import { INITIAL_STATE, AuthReducer } from './AuthReducer'
import { IProps } from './interface'


const AuthContext = createContext(INITIAL_STATE)

const AuthContextProvider: React.FC<IProps> = ({ children }) => {

    const [{ user, error, loading }, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        if (user?.role === 'admin') {
            localStorage.setItem('agent', JSON.stringify(user))
        }
        else dispatch({ type: 'LOGIN_FAILURE', error: 'את/ה לא מנהל!', user: null })
    }, [user])

    return (
        <AuthContext.Provider value={{ loading, error, user, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }