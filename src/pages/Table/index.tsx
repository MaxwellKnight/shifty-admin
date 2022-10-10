import { useEffect, useState } from 'react'
import { Loader, MainContent } from '../../components'
import { useFetch } from '../../hooks'
import { Link } from 'react-router-dom'
import TableNav from './TableNav'
import List from '../../components/List'
import axios from 'axios'
import './_table.scss'
import { getBtnClass, getFacility, getShiftType, formattedDate } from '../../utils/functions'

const Table = () => {
    const [currShift, setCurrShift] = useState<string>('')
    const [currAgents, setCurrAgents] = useState<any>([])
    const [table, setTable] = useState<any>(null)
    const [currTable, setCurrTable] = useState<any>('')
    const [day, setCurrDay] = useState<any>(null)
    const [activeDay, setActiveDay] = useState<string>('')
    const { data, loading } = useFetch('http://localhost:8000/tables/new')

    useEffect(() => {
        if (data) {
            const t = { ...data[0]?.table }
            setTable(t)
            setCurrTable(data[0]?._id)
            setCurrDay(t?.SUN)
            setCurrShift(t?.SUN[0]?._id)
            setActiveDay('SUN')
            handleShiftClick(t?.SUN[0]?.agents, t?.SUN[0]?._id)
        }
    }, [data])


    const handleShiftClick = async (shiftAgents: string[], shiftId: string) => {
        try {
            const agents = await Promise.all(shiftAgents.map(async id => {
                const respnose = await axios.get(`http://localhost:8000/agents/${id}`)
                return respnose.data._doc
            }))
            setCurrAgents(Array.from(agents))
            setCurrShift(shiftId)
        } catch (error) {
            console.log('could not fetch data')
        }
    }

    const handleDayClick = (day: any, active: string) => {
        setCurrDay(day)
        setCurrShift(day[0]?._id)
        setActiveDay(active)
        handleShiftClick(day[0]?.agents, day[0]?._id)
    }
    return (
        <MainContent>
            <TableNav setTable={setCurrTable} />
            {table ?
                <>
                    <div className='table__container__wrap'>

                        <div className='table__container__wrap__days-list'>
                            <ul>
                                <li
                                    className={activeDay === 'SUN' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.SUN, 'SUN')}
                                >
                                    ראשון
                                </li>
                                <li
                                    className={activeDay === 'MON' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.MON, 'MON')}
                                >
                                    שני
                                </li>
                                <li
                                    className={activeDay === 'TUE' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.TUE, 'TUE')}
                                >
                                    שלישי
                                </li>
                                <li
                                    className={activeDay === 'WED' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.WED, 'WED')}
                                >
                                    רביעי
                                </li>
                                <li
                                    className={activeDay === 'THU' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.THU, 'THU')}
                                >
                                    חמישי
                                </li>
                                <li
                                    className={activeDay === 'FRI' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.FRI, 'FRI')}
                                >
                                    שישי
                                </li>
                                <li
                                    className={activeDay === 'SAT' ? 'active-day' : ''}
                                    onClick={() => handleDayClick(table?.SAT, 'SAT')}
                                >
                                    שבת
                                </li>
                            </ul>
                        </div>
                        <div>
                            <List
                                headers={['עובדים']}
                                data={Array.from(currAgents)}
                                keyExtractor={(agent: any) => String(agent?._id)}
                                renderItem={(agent: any) => (
                                    <td className='agents-list'>
                                        <Link to={`/dashboard/${agent._id}`} className='profile-link'>
                                            {agent.name}
                                        </Link>
                                    </td>
                                )}
                            />
                        </div>
                        <div>
                            <List
                                headers={['מיקום', 'סוג משמרת', 'תאריך', 'כמות עובדים', 'תקינות',]}
                                data={day}
                                keyExtractor={(shift: any) => String(shift._id)}
                                renderItem={(shift => (
                                    <>
                                        <td>
                                            <button
                                                className={getBtnClass(shift?._id, currShift) ? 'btn-table active' : 'btn-table'}
                                                onClick={() => handleShiftClick(shift?.agents, shift?._id)}
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
                                            {shift?.agents.length}
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
                <Loader />
            }
        </MainContent >
    )
}

export default Table