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
    Loader,
    MainContent,
    TableNavigation,
    List
} from '../../components'

import {
    getBtnClass,
    getFacility,
    getShiftType,
    formattedDate
} from '../../utils/functions'

const { LOADING, INITIALIZE, CHANGE_DAY, CHANGE_SHIFT } = TABLE_ACTIONS

const Table = () => {
    const { dispatch, ...state } = useContext(TableContext)
    const [agents, setAgents] = useState<any>()

    useEffect(() => {
        dispatch?.({ type: LOADING, payload: true })
        const init = async () => {
            const table = await axios.get('http://localhost:8000/tables/new')
            dispatch?.({ type: 'INITIALIZE', payload: table.data[0] })
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



    return (
        <MainContent>
            <TableNavigation setTable={dispatch} table={state} />
            {state.currentTable ?
                <>
                    <div className='table__container__wrap'>

                        <div className='table__container__wrap__days-list'>
                            <ul>
                                <li
                                    className={state.currentDay === 'SUN' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'SUN' } })}
                                >
                                    ראשון
                                </li>
                                <li
                                    className={state.currentDay === 'MON' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'MON' } })}
                                >
                                    שני
                                </li>
                                <li
                                    className={state.currentDay === 'TUE' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'TUE' } })}
                                >
                                    שלישי
                                </li>
                                <li
                                    className={state.currentDay === 'WED' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'WED' } })}
                                >
                                    רביעי
                                </li>
                                <li
                                    className={state.currentDay === 'THU' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'THU' } })}
                                >
                                    חמישי
                                </li>
                                <li
                                    className={state.currentDay === 'FRI' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'FRI' } })}
                                >
                                    שישי
                                </li>
                                <li
                                    className={state.currentDay === 'SAT' ? 'active-day' : ''}
                                    onClick={() => dispatch?.({ type: CHANGE_DAY, payload: { day: 'SAT' } })}
                                >
                                    שבת
                                </li>
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
                                headers={['מיקום', 'סוג משמרת', 'תאריך', 'כמות עובדים', 'תקינות',]}
                                data={state.currentTable[state.currentDay]}
                                keyExtractor={(shift: any) => String(shift._id)}
                                renderItem={(shift => (
                                    <>
                                        <td>
                                            <button
                                                className={getBtnClass(shift?._id, state.currentShift) ? 'btn-table active' : 'btn-table'}
                                                onClick={() => dispatch?.({ type: CHANGE_SHIFT, payload: { shift: shift?._id } })}
                                            >
                                                {getFacility(shift?.facility)}
                                            </button>
                                        </td>
                                        <td>
                                            {getShiftType(shift?.type)}
                                        </td>
                                        <td>
                                            {formattedDate(new Date(shift?.date))}
                                        </td>
                                        <td>
                                            {shift?.limit} / {shift?.agents.length}
                                        </td>
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
            {state.loading && <Loader />}
        </MainContent >
    )
}

export default Table