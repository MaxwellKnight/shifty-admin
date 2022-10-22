import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { MainContent, Shift } from '../../components'
import { useFetch } from '../../hooks'
import { IBaseShift } from '../../interfaces/IBaseShift'
import './_index.scss'


const Shifts = () => {
    const [shifts, setShifts] = useState<IBaseShift[] | null>(null)
    const { data, error, loading, reFetch } = useFetch('http://localhost:8000/shifts')

    useEffect(() => {
        if (!error && data) {
            setShifts(data)
        }
    }, [data, reFetch])

    const fetchShifts = useCallback(reFetch, [data])

    return (
        <MainContent shrink={true}>
            <div className='shifts-page'>
                <div className="shifts-page__all">
                    {shifts && shifts.map((shift: IBaseShift) =>
                        <Shift
                            key={shift._id}
                            shift={{ ...shift }}
                            fetch={fetchShifts}
                            disabled={false}
                        />
                    )}
                </div>
                <div className="shifts-page__form">
                    <Shift flow={true} createable={true} />
                </div>
            </div>
        </MainContent>
    )
}

export default Shifts