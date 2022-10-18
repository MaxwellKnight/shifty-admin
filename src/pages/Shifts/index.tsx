import { useEffect, useState } from 'react'
import { MainContent, Shift } from '../../components'
import { useFetch } from '../../hooks'
import './_index.scss'


const Shifts = () => {
    const [shift, setShifts] = useState<any[]>()
    const { data, error, loading } = useFetch('http://localhost:8000/shifts')

    useEffect(() => {
        if (!error && data && !loading) {
            setShifts(data)
        }
    }, [data])

    return (
        <MainContent>
            <div className='shifts-page'>
                {shift && shift.map((shift: any) => <Shift key={shift._id} shift={shift} />)}
            </div>
        </MainContent>
    )
}

export default Shifts