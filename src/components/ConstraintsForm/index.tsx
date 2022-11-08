import { useState } from 'react'
import './_index.scss'

const INITIAL_STATE = new Map<string, any>([
    ['SUN', { morning: true, noon: true, night: true, notes: '' }],
    ['MON', { morning: true, noon: true, night: true, notes: '' }],
    ['TUE', { morning: true, noon: true, night: true, notes: '' }],
    ['WED', { morning: true, noon: true, night: true, notes: '' }],
    ['THU', { morning: true, noon: true, night: true, notes: '' }],
    ['FRI', { morning: true, noon: true, night: true, notes: '' }],
    ['SAT', { morning: true, noon: true, night: true, notes: '' }],
])

const ConstraintsForm = ({ handleSubmit, constraints }: { handleSubmit: any, constraints: Map<string, any> | null }) => {
    const [formData, setFormData] = useState<Map<string, any> | null>(null)

    const handleConsClick = (e: any, day: string) => {
        const { name, checked } = e.target
        if (name) {
            const updated = new Map(formData)
            updated.set(day, { ...formData?.get(day), [name]: !checked })
            setFormData(new Map(updated))
        }
    }
    const handleNotes = (e: any, day: string) => {
        const { name, value } = e.target
        if (name) {
            const updated = new Map(formData)
            updated.set(day, { ...formData?.get(day), [name]: value })
            setFormData(new Map(updated))
        }
    }

    const getShiftClass = (shift: boolean) => {
        return shift ? '' : 'rejected-shift'
    }


    return (
        <form className="constraints-form" dir='rtl' onSubmit={(e) => handleSubmit(e, formData)}>
            {constraints ?
                <>
                    <div className="constraints-form__wrapper" dir='rtl'>

                        <div className='constraints-form__shifts'>
                            <p></p>
                            <p>בוקר</p>
                            <p>צהריים</p>
                            <p>לילה</p>
                            <p>הערות</p>
                        </div>
                        {Array.from(formData!.keys()).map((key: any) => {
                            return (
                                <div key={key} className='constraints-form__day'>
                                    <p>{key}</p>
                                    <label className={getShiftClass(formData?.get(key).morning)} onClick={(e) => handleConsClick(e, key)}>
                                        <span>{formData?.get(key).morning ? 'פנוי' : 'לא פנוי'}</span>
                                        <input type="checkbox" name="morning" id="morning" />
                                    </label>
                                    <label className={getShiftClass(formData?.get(key).noon)} onClick={(e) => handleConsClick(e, key)}>
                                        <span>{formData?.get(key).noon ? 'פנוי' : 'לא פנוי'}</span>
                                        <input type="checkbox" name="noon" id="noon" />
                                    </label>
                                    <label className={getShiftClass(formData?.get(key).night)} onClick={(e) => handleConsClick(e, key)}>
                                        <span>{formData?.get(key).night ? 'פנוי' : 'לא פנוי'}</span>
                                        <input type="checkbox" name="night" id="night" />
                                    </label>
                                    <input
                                        onChange={(e) => handleNotes(e, key)}
                                        type="text"
                                        placeholder='הערות כאן...'
                                        name="notes"
                                        id="notes"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <button className='btn-form'>הגש</button>
                </> :
                <div>
                    <h1>Missing endpoint</h1>
                </div>
            }
        </form>
    )
}

export default ConstraintsForm