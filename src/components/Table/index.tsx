import './index.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PublicTable = () => {

    const [table, setTable] = useState<Map<string, []>>()
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()

    const fetchTable = async () => {
        try {
            const res: any = await fetch('http://localhost:8000/tables/new')
            const data = await res.json()
            const t = { ...data.table }
            setTable(new Map(Object.entries(t)))
        } catch (err) {
            console.log(err)
        }
    }

    const fetchCurrentTable = async () => {
        try {
            const res: any = await fetch('http://localhost:8000/tables/new', { method: 'POST' })
            const Table = await res.json()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTable()
    }, [])

    const printTable = (table: Map<string, []> | undefined) => {

        const days = new Map([
            ['SUN', 'ראשון'],
            ['MON', 'שני'],
            ['TUE', 'שלישי'],
            ['WED', 'רביעי'],
            ['THU', 'חמישי'],
            ['FRI', 'שישי'],
            ['SAT', 'שבת'],
        ])

        const comps: any = []
        if (!table) return null
        table.forEach((value, key) => {
            comps.push(
                <div key={key} className='day'>
                    <h1>{days.get(key)}</h1>
                    <div className="day__container">
                        {printShifts(value)}
                    </div>
                </div>
            )
        })


        return comps
    }

    const printShifts = (shifts: any) => (
        shifts?.map((shift: any) => (
            <div key={shift._id} className='shift'>
                <p className={shift.isFull ? 'full' : 'missing'}>{shift.title}</p>
                {shift.agents?.map((agent: any) => {
                    return <Link key={agent} to={`/agents/${agent}`}>{agent}</Link>
                })}
            </div>
        ))
    )

    const handleCreateTableClick = async (e: any) => {
        try {
            await fetchCurrentTable()
            navigate(0)
            setClicked(true)
        } catch (err) {
            console.log(err)
        }

    }

    const components = printTable(table)

    return (
        <div className='public-table'>
            <button disabled={clicked} className={clicked ? 'btn btn-disabled' : 'btn'} onClick={handleCreateTableClick}>צור סידור</button>
            <Link to='/agents' className='btn'>כל העובדים</Link>
            {components?.map((comp: any) => comp)}
        </div>
    )
}

export default PublicTable