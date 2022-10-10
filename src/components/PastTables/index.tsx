import { useFetch } from '../../hooks'
import './_index.scss'

const PastTables = ({ table, setTable }: any) => {

    const handleDateClick = (e: any) => {
        const { name, value } = e.target
        setTable(value)
    }

    console.log(table)

    return (
        <div>
            <select onChange={(e: any) => handleDateClick(e)}>
                {table && table?.map(({ table, startDate, endDate, _id }: any) => (
                    <option key={_id} value={_id}>{new Date(startDate).toLocaleDateString()}</option>
                ))}
            </select>
        </div>
    )
}

export default PastTables