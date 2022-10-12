import { TableNavReducer, INITIAL_STATE } from './reducer'
import React, { FormEvent, useReducer, useState } from 'react'
import { useFetch } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal } from '..'
import './_index.scss'

const TableNavigation = ({ setTable }: any) => {
    const [{ isCreate, isPrev, isHold }, dispatch] = useReducer(TableNavReducer, INITIAL_STATE)
    const [formError, setFormError] = useState<any>(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
    })

    const setForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/tables/new', formData)
            if (res.data) navigate(0)
            console.log(res.data)
        } catch (error) {
            setFormError(error)
            console.log(error)
        }
    }
    return (
        <header>
            {/**button group */}
            <div className="btn-group">
                <button
                    className={isCreate ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'CREATE_TABLE', payload: true })}
                >
                    צור סידור חדש
                </button>
                <button
                    className={isPrev ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'PREV_TABLE', payload: true, table: null })}
                >
                    סידורים קודמים
                </button>
                <button
                    className={isHold ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'HOLD_TABLE', payload: true })}
                >
                    סידורים בהמתנה
                </button>
            </div>

            {/* Modal group conditional rendering depending on user action */}
            {isCreate &&
                <Modal closeModal={() => dispatch({ type: 'CREATE_TABLE', payload: false })}>
                    <div className="create-table-container">
                        <h4>בחר תאריכים</h4>
                        {formError && <span className='form-error'>בחר תאריכים בטווח עד 7 ימים</span>}
                        <form className='create-table-container__form' onSubmit={(e) => onSubmit(e)}>
                            <div>
                                <label htmlFor='startDate'>תאריך התחלה</label>
                                <input type="date" id='startDate' name='startDate' onChange={(e) => setForm(e)} />
                            </div>
                            <div>
                                <label htmlFor='endDate'>תאריך סוף</label>
                                <input type="date" id='endDate' name='endDate' onChange={(e) => setForm(e)} />
                            </div>
                            <button className='btn'>צור סידור</button>
                        </form>
                    </div>
                </Modal>
            }
            {isPrev &&
                <Modal closeModal={() => dispatch({ type: 'PREV_TABLE', payload: false })}>
                </Modal>
            }
            {isHold &&
                <Modal closeModal={() => dispatch({ type: 'HOLD_TABLE', payload: false })}>

                </Modal>
            }


        </header>
    )
}

export default TableNavigation
