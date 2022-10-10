import { useReducer } from 'react'
import { Dispatch } from 'react'
import { DateRangePicker, Stack } from 'rsuite'
import './_table.scss'
import './_modal.scss'
import { PastTables } from '../../components'
import { useFetch } from '../../hooks'

type IState = {
    isCreate: boolean,
    isPrev: boolean,
    isHold: boolean,
    table?: any,
    error?: any,
    dispatch?: Dispatch<IAction>
}
const INITIAL_STATE = {
    isCreate: true,
    isPrev: false,
    isHold: false,
}
type IAction = {
    type: string,
    payload: boolean,
    table?: any,
    error?: any
}



const TableNavReducer = (state: IState, action: IAction): IState => {

    switch (action.type) {
        case 'CREATE_TABLE':
            return {
                isCreate: action.payload,
                isPrev: false,
                isHold: false,
            }
        case 'HOLD_TABLE':
            return {
                isCreate: false,
                isPrev: false,
                isHold: action.payload,
            }
        case 'PREV_TABLE': {
            console.log(action.table)
            if (action.error) return { ...INITIAL_STATE }
            return {
                isCreate: false,
                isPrev: action.payload,
                isHold: false,
                table: { ...action.table }
            }
        }
        default:
            return { ...state }
    }
}

const TableNav = ({ setTable }: any) => {
    const { data, loading, error } = useFetch('http://localhost:8000/tables')
    const [{ isCreate, isPrev, isHold }, dispatch] = useReducer(TableNavReducer, INITIAL_STATE)

    return (
        <header>
            <div className="btn-group">
                <button
                    className={isCreate ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'CREATE_TABLE', payload: true })}
                >
                    צור סידור חדש
                </button>
                <button
                    className={isPrev ? 'btn-group--active' : ''}
                    onClick={() => dispatch({ type: 'PREV_TABLE', payload: true, table: data, error: error })}
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
            <div className={isCreate || isPrev || isHold ? 'modal' : 'hidden'}>
                {/* {isCreate &&
                        <>
                            <Stack direction="column" spacing={8} alignItems="flex-start" dir='rtl'>

                                <DateRangePicker
                                    placeholder="בחר תאריכים"
                                    appearance='default'
                                    showOneCalendar
                                    style={{ width: 300 }}
                                />
                            </Stack>
                            <button
                                onClick={() => dispatch({ type: 'CREATE_TABLE', payload: false })}
                            >
                                סגור
                            </button>
                        </>
                    } */}
                {isPrev && <PastTables table={data} setTable={setTable} />}

            </div>


        </header>
    )
}

export default TableNav
