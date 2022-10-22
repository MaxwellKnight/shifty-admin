import { TableContext, TABLE_ACTIONS } from '../../context/TableContext/TableContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './_table.scss'
import {
    useEffect,
    useState,
    useContext
} from 'react'

import {
    MainContent,
    TableNavigation,
    List
} from '../../components'

import {
    getBtnClass,
    getFacility,
    getShiftType,
    formattedDate,
    getDay,
    translateDate
} from '../../utils/functions'
import { ITable, ShiftsTable } from '../../interfaces/ITable'

const { LOADING, INITIALIZE, CHANGE_DAY, CHANGE_SHIFT } = TABLE_ACTIONS

const Table = () => {
    const { dispatch, ...state } = useContext(TableContext)
    const [agents, setAgents] = useState<any>()

    useEffect(() => {
        dispatch?.({ type: LOADING, payload: true })
        const init = async () => {
            const table = await axios.get('http://localhost:8000/tables/new')
            const payload: ITable = table.data
            dispatch?.({ type: INITIALIZE, payload })
        }
        init()
    }, [])


    useEffect(() => {
        const fetchAgents = async () => {
            const agents = await Promise.all(state.currentAgents.map(async (id: string) => {
                const response = await axios.get(`http://localhost:8000/agents/${id}`)
                if (response.data) {
                    const { name, _id } = response.data._doc
                    return { name, _id }
                }
            }))
            setAgents(agents)
        }
        fetchAgents()
    }, [state.currentAgents])

    const dayNavigation = (table: ShiftsTable) => {
        const dayNavigationComponents: JSX.Element[] = []
        for (const [key, value] of table) {
            dayNavigationComponents.push(
                <li
                    key={key}
                    className={state.currentDay === key ? 'active-day' : ''}
                    onClick={() => {
                        dispatch?.({ type: CHANGE_DAY, payload: { day: key } })
                    }}
                >
                    <span>{translateDate(key)}</span>
                    {getDay(key)}
                </li>
            )
        }
        return dayNavigationComponents
    }

    return (
        <MainContent>
            <TableNavigation setTable={dispatch} table={state} />
            {state.currentTable ?
                <>
                    <div className='table__container__wrap'>
                        <div className='table__container__wrap__days-list'>
                            <ul>
                                {dayNavigation(state.currentTable).map((li: JSX.Element) => li)}
                            </ul>
                        </div>
                        <div>
                            <List
                                headers={['עובדים']}
                                data={agents}
                                keyExtractor={(agent: any) => agent._id}
                                renderItem={(agent: any) => (
                                    <td className='agents-list'>
                                        <Link to={`/agents/${agent._id}`} className='profile-link'>
                                            {agent.name}
                                        </Link>
                                    </td>
                                )}
                            />
                        </div>
                        <div>
                            <List
                                headers={['מיקום', 'סוג משמרת', 'תאריך', 'כמות עובדים', 'תקינות']}
                                data={state.currentTable.get(state.currentDay) || []}
                                keyExtractor={(shift: any) => String(shift._id)}
                                renderItem={(shift => (
                                    <>
                                        <td>
                                            <button
                                                className={shift._id && getBtnClass(shift?._id, state.currentShift || '') ? 'btn-table active' : 'btn-table'}
                                                onClick={() => dispatch?.({ type: CHANGE_SHIFT, payload: { shift: shift?._id } })}
                                            >
                                                {getFacility(shift?.facility)}
                                            </button>
                                        </td>
                                        <td>{getShiftType(shift?.type)}</td>
                                        <td>{formattedDate(new Date(shift?.date))}</td>
                                        <td>{shift?.limit} / {shift?.agents.length}</td>
                                        <td
                                            className={shift?.isFull ? 'full' : 'partial'}
                                        >
                                            {shift?.isFull ? 'מלאה' : 'חסר עובדים'}
                                        </td>
                                    </>
                                ))}
                            />
                        </div>
                    </div>
                </>
                :
                <h1 style={{ textAlign: 'center', paddingTop: '5rem' }}>לא נמצאו נתונים בשלב זה</h1>
            }
        </MainContent >
    )
}

export default Table