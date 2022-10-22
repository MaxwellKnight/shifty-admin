import { TableNavReducer, INITIAL_STATE } from './reducer'
import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal } from '..'
import './_index.scss'
import { TableAction, TABLE_ACTIONS } from '../../context/TableContext/TableReducer'
import { formattedDate } from '../../utils/functions'
import List from '../List'
import { ITable } from '../../interfaces/ITable'

type TableNavigationProps = { setTable: React.Dispatch<TableAction> | undefined, table: any }

interface ITableMinimal {
    id: string,
    startDate: Date,
    endDate: Date
}

const TableNavigation: React.FC<TableNavigationProps> = ({ setTable, table }) => {

    const [{ isCreate, isPrev, isHold, isConfirm }, dispatch] = useReducer(TableNavReducer, INITIAL_STATE)
    const [formError, setFormError] = useState<string>()
    const [tablesList, setTablesList] = useState<ITableMinimal[] | null>(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
    })

    useEffect(() => {
        const fetchTables = async () => {
            const { data }: { data: ITable[] } = await axios.get("http://localhost:8000/tables/")
            const allTables = await Promise.all(data.map((table: any) => {
                const { startDate, endDate, _id } = table
                return {
                    id: _id,
                    startDate,
                    endDate
                }
            }))
            setTablesList(allTables)
        }
        if (isPrev) fetchTables()
        else setTablesList(null)
    }, [isPrev])

    const setForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }


    const abortTable = async (id: string) => {
        try {
            console.log(id)
            const response = await axios.post(`http://localhost:8000/tables/new/confirm/${id}`)
            if (response.data) {
                alert('סידור בוטל')
                setTable?.({ type: TABLE_ACTIONS.ABORT, payload: null })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/tables/new', formData)
            if (res.data) {
                navigate(0)
                dispatch({ type: 'CONFIRM_TABLE', payload: true })
            }

            console.log(res.data)
        } catch (error) {
            setFormError('בחר תאריכים בטווח עד 7 ימים')
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
                    חדש
                </button>
                <button
                    className={isPrev ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'PREV_TABLE', payload: true, table: null })}
                >
                    היסטוריה
                </button>
                <button
                    className={isHold ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'HOLD_TABLE', payload: true })}
                >
                    בהמתנה
                </button>
            </div>
            {table.startDate && <><h1 className='dates-heading'>{formattedDate(new Date(table.startDate))} ---  {formattedDate(new Date(table.endDate))}</h1></>}

            {/* Modal group conditional rendering depending on user action */}
            {isCreate &&
                <Modal closeModal={() => dispatch({ type: 'CREATE_TABLE', payload: false })}>
                    <div className="create-table-container">
                        {!isConfirm ?
                            <>
                                <h4>בחר תאריכים</h4>
                                {formError && <span className='form-error'>{formError}</span>}
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
                            </>
                            :
                            <>
                                <div className='table-summary'>

                                </div>
                                <div className='btn-flex-container'>
                                    <button className='btn btn-failure' onClick={() => abortTable(table.id)}>בטל</button>
                                    <button className='btn btn-warning'>צור חדש</button>
                                    <button className='btn btn-success'>אישור</button>
                                </div>
                            </>
                        }
                    </div>
                </Modal>
            }
            {isPrev &&
                <Modal closeModal={() => dispatch({ type: 'PREV_TABLE', payload: false })}>
                    {tablesList &&
                        <div className='previous-tables-container'>
                            <List
                                headers={['סידורים קודמים']}
                                keyExtractor={(table: any) => String(table.id)}
                                data={tablesList}
                                renderItem={(table) => (
                                    <>
                                        <td className=''>
                                            {formattedDate(new Date(table.endDate))} --- {formattedDate(new Date(table.startDate))}
                                            <div>
                                                <button className='btn btn-primary'>צפה</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            />
                        </div>
                    }
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
