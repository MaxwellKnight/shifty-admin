import { useEffect, useState } from 'react'
import { getDatesArray } from '../../utils/functions'
import './_index.scss'

const getArr: any = (constraints: any) => {
    if (constraints) {
        return Array.from(constraints?.entries())
    }
    return []
}



const getShiftClass = (shift: boolean, isShift: boolean) => {
    if (!shift && isShift) return 'rejected-shift'
    else if (shift && !isShift) return 'rejected-shift'
}

const ProfileTable = ({
    constraints,
    mode,
    isShift,
    dates
}: {
    constraints: any,
    mode: | 'פנוי' | 'עובד',
    isShift: boolean,
    dates: { startDate: Date, endDate: Date }
}) => {

    const [datesArr, setDatesArr] = useState<Date[] | null>(null)
    useEffect(() => {
        setDatesArr(() => getDatesArray(dates.startDate, dates.endDate))
    }, [dates, setDatesArr])

    return (
        <div className="personal-table" dir='rtl'>
            <div className="personal-table__shifts">
                <p></p>
                <p>בוקר</p>
                <p>צהריים</p>
                <p>לילה</p>
                <p>הערות</p>
            </div>
            {getArr && getArr(constraints).map((day: any, index: number) => {
                return (
                    <div key={index} className="personal-table__day">
                        <p></p>
                        <p
                            className={getShiftClass(day[1].morning, isShift)}
                        >
                            {day[1]?.morning ? mode : '-'}
                        </p>
                        <p
                            className={getShiftClass(day[1].noon, isShift)}
                        >
                            {day[1]?.noon ? mode : '-'}
                        </p>
                        <p
                            className={getShiftClass(day[1].night, isShift)}
                        >
                            {day[1]?.night ? mode : '-'}
                        </p>
                        <p
                            className={day[1]?.notes?.length > 0 && isShift ? '' : 'notes'}
                        >
                            {day[1]?.notes?.length > 0 ? day[1]?.notes : 'אין הערות ...'}
                        </p>
                    </div>
                )
            })}
        </div>

    )
}


export default ProfileTable