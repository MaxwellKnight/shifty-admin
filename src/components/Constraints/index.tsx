import { useEffect, useMemo } from 'react'
import List from '../List'
import './_index.scss'

const Constraints = ({ constraints }: { constraints: any }) => {

    const getArr: any = useMemo(() => {
        if (constraints) {
            return Array.from(constraints?.entries())
        }
        return []
    }, [constraints])

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
        return shift ? '' : 'rejected-shift'
    }

    return (
        <div className="constraints" dir='rtl'>
            <div className="constraints__shifts">
                <p></p>
                <p>בוקר</p>
                <p>צהריים</p>
                <p>לילה</p>
                <p>הערות</p>
            </div>
            {getArr && getArr.map((day: any, index: number) => {
                return (
                    <div key={index} className="constraints__day">
                        <p>{getDay(day[0])}</p>
                        <p className={getShiftClass(day[1].morning)}>{day[1]?.morning ? 'פנוי' : 'לא פנוי'}</p>
                        <p className={getShiftClass(day[1].noon)}>{day[1]?.noon ? 'פנוי' : 'לא פנוי'}</p>
                        <p className={getShiftClass(day[1].night)}>{day[1]?.night ? 'פנוי' : 'לא פנוי'}</p>
                        <p className={day[1]?.notes?.length > 0 ? '' : 'notes'}>{day[1]?.notes?.length > 0 ? day[1]?.notes : 'אין הערות ...'}</p>
                    </div>
                )
            })}
        </div>

    )
}


export default Constraints