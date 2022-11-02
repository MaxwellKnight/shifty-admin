import { ReactNode, useEffect, useState } from 'react'
import { formattedDate, getDatesArray, getDay } from '../../utils/functions'
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


const printTable = (constraints: Map<string, any>, isShift: boolean) => {
    let table: JSX.Element[] = []
    for (const [day, shift] of constraints) {
        table?.push(
            <div key={day}>
                <div className='personal-table__row'>
                    <h5>{day}</h5>
                    <p className={getShiftClass(shift.morning, isShift)}>{shift.morning ? '' : '.'}</p>
                    <p className={getShiftClass(shift.noon, isShift)}>{shift.noon ? '' : '.'}</p>
                    <p className={getShiftClass(shift.night, isShift)}>{shift.night ? '' : '.'}</p>
                    <p className={shift?.notes?.length > 0 && isShift ? '' : 'notes'}>{shift?.notes?.length > 0 ? shift?.notes : '-'}</p>
                </div>
            </div>
        )

    }

    return table
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
        <>
            <div className='profile-table' dir='rtl'>
                <h2>{!isShift ? 'משמרות' : 'אילוצים'}</h2>
                <div className="profile-table__header">
                    <p></p>
                    <p>בוקר</p>
                    <p>צהריים</p>
                    <p>לילה</p>
                    <p>הערות</p>
                </div>
                {constraints && printTable(constraints, isShift).map(day => day)}
            </div>
            {/* <div className="personal-table" dir='rtl'>
                {getArr && getArr(constraints).map((day: any, index: number) => {
                    return (
                        <div key={index} className="personal-table__day">
                            {datesArr && <p>{getDay(formattedDate(datesArr[2]))}</p>}
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
            </div> */}
        </>
    )
}


export default ProfileTable