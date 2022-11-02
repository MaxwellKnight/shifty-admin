import { TableNavReducer, INITIAL_STATE } from './reducer'
import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal } from '..'
import './_index.scss'
import { TableAction, TABLE_ACTIONS } from '../../context/TableContext/TableReducer'
import { formattedDate, getDatesRange } from '../../utils/functions'
import List from '../List'
import { ITable } from '../../interfaces/ITable'
import { type } from 'os'

type TableNavigationProps = { setTable: React.Dispatch<TableAction> | undefined, table: any }

interface ITableMinimal {
    id: string,
    startDate: Date,
    endDate: Date
}

const TableNavigation: React.FC<TableNavigationProps> = ({ setTable, table }) => {

    const [{ isCreate, isPrev, isHold }, dispatch] = useReducer(TableNavReducer, INITIAL_STATE)
    const [formError, setFormError] = useState<string>()
    const [tablesList, setTablesList] = useState<ITable[] | null>(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        startDate: new Date,
        endDate: new Date,
    })

    useEffect(() => {
        const fetchTables = async () => {
            const { data }: { data: any } = await axios.get("http://localhost:8000/dates/")
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/dates/', { ...formData, limit: getDatesRange(formData.startDate, formData.endDate) })
            if (res.data) {
                navigate(0)
                dispatch({ type: 'CONFIRM_TABLE', payload: true })
            }

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchTablesHistory = async () => {
            try {
                const data: any = await axios.get('http://localhost:8000/tables')
                if (data.data) {
                    setTablesList(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (isHold) {
            fetchTablesHistory()
        } else setTablesList(null)
    }, [isHold])

    const createTable = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, startDate: Date, endDate: Date) => {
        event.preventDefault()

        try {
            const response = await axios.post("http://localhost:8000/tables/new", { startDate, endDate })
            if (response.data) {
                setTable?.({ type: 'INITIALIZE', payload: response.data })
            }
        } catch (error) {
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
                    אילוצים
                </button>
                <button
                    className={isPrev ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'PREV_TABLE', payload: true, table: null })}
                >
                    בהמתנה
                </button>
                <button
                    className={isHold ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'HOLD_TABLE', payload: true })}
                >
                    היסטוריה
                </button>
            </div>
            {table.startDate && <><h1 className='dates-heading'>{formattedDate(new Date(table.startDate))} ---  {formattedDate(new Date(table.endDate))}</h1></>}

            {/* Modal group conditional rendering depending on user action */}
            {isCreate &&
                <Modal closeModal={() => dispatch({ type: 'CREATE_TABLE', payload: false })}>
                    <div className="create-table-container">
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
                            <button className='btn'>צור תאריכים</button>
                        </form>
                    </div>
                </Modal>
            }
            {isPrev &&
                <Modal closeModal={() => dispatch({ type: 'PREV_TABLE', payload: false })}>
                    {tablesList &&
                        <div className='previous-tables-container'>
                            <List
                                headers={['תאריכים עתידיים']}
                                keyExtractor={(table: any) => String(table.id)}
                                data={tablesList}
                                renderItem={(table) => (
                                    <>
                                        <td className=''>
                                            {formattedDate(new Date(table.endDate))} --- {formattedDate(new Date(table.startDate))}
                                            <div>
                                                <button className='btn btn-primary' onClick={(event) => {
                                                    createTable(event, table.startDate, table.endDate)
                                                    dispatch({ type: 'PREV_TABLE', payload: false })
                                                }}>צור סידור</button>
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
                    {tablesList &&
                        <div className='previous-tables-container'>
                            <List
                                headers={['היסטוריה']}
                                keyExtractor={(table: any) => String(table.id)}
                                data={tablesList}
                                renderItem={(table) => (
                                    <>
                                        <td className=''>
                                            {formattedDate(new Date(table.endDate))} --- {formattedDate(new Date(table.startDate))}
                                            <div>
                                                <button className='btn btn-primary' onClick={(event) => {
                                                    setTable?.({ type: 'INITIALIZE', payload: table })
                                                    dispatch({ type: 'HOLD_TABLE', payload: false })
                                                }}>צפה</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            />
                        </div>
                    }
                </Modal>
            }


        </header>
    )
}

export default TableNavigation
