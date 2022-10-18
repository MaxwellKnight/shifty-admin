import { useEffect, useMemo } from 'react'
import List from '../List'
import './_index.scss'

const Shifts = ({ shifts }: { shifts: any }) => {

    const getArr: any = useMemo(() => {
        if (shifts) {
            return Array.from(shifts?.entries())
        }
        return []
    }, [shifts])

    const getDay = (day: string) => {
        return new Map([
            ['SUN', 'ראשון'],
            ['MON', 'שני'],
            ['TUE', 'שלישי'],
            ['WED', 'רביעי'],
            ['THU', 'חמישי'],
            ['FRI', 'שישי'],
            ['SAT', 'שבת'],
        ]).get(day)
    }

    const getShiftClass = (shift: boolean) => {
        return !shift ? '' : 'rejected-shift'
    }

    return (
        <div className="shifts" dir='rtl'>
            <div className="shifts__shifts">
                <p></p>
                <p>בוקר</p>
                <p>צהריים</p>
                <p>לילה</p>
                <p>מיקום</p>
            </div>
            {getArr && getArr.map((day: any, index: number) => {
                return (
                    <div key={index} className="shifts__day">
                        <p>{getDay(day[0])}</p>
                        <p className={getShiftClass(day[1].morning)}>{day[1]?.morning ? 'עובד' : '-'}</p>
                        <p className={getShiftClass(day[1].noon)}>{day[1]?.noon ? 'עובד' : '-'}</p>
                        <p className={getShiftClass(day[1].night)}>{day[1]?.night ? 'עובד' : '-'}</p>
                        <p className={day[1]?.notes?.length > 0 ? '' : 'notes'}>{day[1]?.notes?.length > 0 ? day[1]?.notes : '-'}</p>
                    </div>
                )
            })}
        </div>

    )
}


export default Shifts