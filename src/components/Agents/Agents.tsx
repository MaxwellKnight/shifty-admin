import { useFetch } from "../../hooks"
import { Link } from 'react-router-dom'
import List from "../List"
import './_agents.scss'
import { useEffect, useState } from "react"
import Loader from "../Loader"

const Agents: React.FC = () => {
    const [agents, setAgents] = useState<any>(null)
    const { data, loading, error } = useFetch('http://localhost:8000/agents')

    const handleSearch = (e: any) => {
        const { name, value } = e.target
        if (value.length >= 2) {
            setAgents(data?.filter((agent: any) => (agent?.name.includes(value) || agent?.contact?.email?.includes(value) || agent?.contact?.phone.includes(value))))
        } else if (value.length <= 2) setAgents(data)
    }

    useEffect(() => {
        setAgents(data)
    }, [data])
    return (
        <>
            <input
                onChange={handleSearch}
                className="search"
                placeholder="חפש עובדים"
                type='text'
                name="name"
                id="name"
                dir="rtl"
            />
            {agents ?
                <List
                    headers={['שם עובד', 'מספר נייד', 'כתובת מייל', 'מספר משמרות לילה', 'מספר משמרות לשבוע', 'הגבלה', 'משרה']}
                    data={agents}
                    keyExtractor={(agent => String(agent._id))}
                    renderItem={((agent: any) => (
                        <>
                            <td>
                                <Link to={`${agent._id}`} className='profile-link'>
                                    {agent.name}
                                </Link>
                            </td>
                            <td>{agent.contact?.phone}</td>
                            <td>{agent.contact?.email}</td>
                            <td>{agent.weeklyLimit?.nightCount}</td>
                            <td>{agent.weeklyLimit?.totalCount}</td>
                            <td>{agent.weeklyLimit?.limit}</td>
                            <td className={agent.isStudent ? 'part-time' : 'full-time'}>{agent.isStudent ? 'משרת סטודנט' : 'משרה מלאה'}</td>
                        </>
                    ))} />
                : <Loader />}
        </>
    )
}

export default Agents