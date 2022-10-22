import React, { useRef, useState, useEffect, ReactNode } from 'react'
import { IBaseShift } from '../../interfaces/IBaseShift'
import axios from 'axios'
import './_index.scss'
import { formattedDate } from '../../utils/functions'
import { useMemo } from 'react'

const INITIAL_STATE: IBaseShift = {
    title: '',
    facility: '',
    type: 'morning',
    limit: 1,
    isTeamLeader: false,
    isStudentPreferred: false,
    agents: [],
    date: new Date(),
    length: 8,
    isFull: false,
    isWeekendActive: true,
    updatedAt: new Date(),
    createdAt: new Date(),
}

const Shift = ({
    shift,
    fetch,
    flow = false,
    disabled = false,
    createable = false
}: {
    shift?: IBaseShift
    fetch?: () => any,
    flow?: boolean,
    disabled?: boolean,
    createable?: boolean
}) => {

    const [localShift, setLocalShift] = useState<IBaseShift>(useMemo(() => shift || INITIAL_STATE, [shift]))
    const [msg, setMsg] = useState<ReactNode | null>(null)
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)
    const deleteRef = useRef<HTMLButtonElement>(null)


    useEffect(() => {
        !shift && JSON.stringify(localShift) === JSON.stringify(INITIAL_STATE) ? setIsChanged(false) : setIsChanged(true)
        shift && JSON.stringify(localShift) === JSON.stringify(shift) ? setIsChanged(false) : setIsChanged(true)
    }, [localShift, shift, fetch])

    const onSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault()
        submitRef.current?.setAttribute("disabled", "true")
        if (!createable) {
            try {
                const response = await axios.patch(`http://localhost:8000/shifts/${localShift._id}`, { ...localShift })
                if (response.data) {
                    setMsg(<span className='shift__title-saved'>&#10003;</span>)
                    fetch?.()
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (createable) {
            try {
                const response = await axios.post('http://localhost:8000/shifts/new', { ...localShift })
                if (response.data) {
                    console.log(response.data)
                    setMsg(<span className='shift__title-saved'>&#10003;</span>)
                    fetch?.()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deleteShift = async (id: string | undefined) => {
        deleteRef.current?.setAttribute("disabled", "true")
        try {
            const response = await axios.delete(`http://localhost:8000/shifts/${id}`)
            if (response.data)
                fetch?.()
        } catch (error) {
            console.log(error)
        }
    }

    const styles = {
        display: flow ? 'grid' : 'flex',
        padding: flow ? '0 0 2em 0' : ''
    }

    return (
        <div className='shift'>
            {createable ? <h2 className='shift__title'>צור משמרת חדשה</h2> : <h2 className='shift__title'>{msg && msg} {localShift.title}</h2>}
            <form onSubmit={onSubmit} ref={formRef} className='shift__form'>
                <div className='shift__form__wrapper' style={styles}>
                    <div className="shift__form__input">
                        <label htmlFor="title" dir='rtl'>שם המשמרת</label>
                        <input
                            type="text"
                            id='title'
                            name='title'
                            value={localShift.title}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, [evt.target.name]: evt.target.value }))}
                            disabled={disabled}
                            required
                        />
                    </div>
                    {createable &&
                        <div className="shift__form__input">
                            <label htmlFor="facility" dir='rtl'>מיקום</label>
                            <input
                                type="text"
                                id='facility'
                                name='facility'
                                value={localShift.facility}
                                onChange={evt => setLocalShift(prevShift => ({ ...prevShift, [evt.target.name]: evt.target.value }))}
                                disabled={disabled}
                                required
                            />
                        </div>
                    }
                    <div className='shift__form__group'>
                        <label htmlFor="limit">תקן מלא</label>
                        <select
                            id='limit'
                            name='limit'
                            value={localShift.limit}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, [evt.target.name]: evt.target.value }))}
                            disabled={disabled}
                            required
                            dir='rtl'
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                        </select>
                    </div>
                    <div className="shift__form__group">
                        <label htmlFor="length">אורך המשמרת</label>
                        <input
                            type="number"
                            min={4}
                            max={12.5}
                            step={0.5}
                            name="length"
                            id="length"
                            value={localShift.length}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, [evt.target.name]: evt.target.value }))}
                            disabled={disabled}
                            dir='rtl'
                            required
                        />
                    </div>
                    <div className="shift__form__input">
                        <label htmlFor="isWeekendActive">פעיל בסופי שבוע</label>
                        <input
                            type="checkbox"
                            name='isWeekendActive'
                            id='isWeekendActive'
                            checked={localShift.isWeekendActive}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, isWeekendActive: !prevShift.isWeekendActive }))}
                            disabled={disabled}
                        />
                        <br />
                        <label htmlFor="isTeamLeader">אחראי משמרת</label>
                        <input
                            type="checkbox"
                            name='isTeamLeader'
                            id='isTeamLeader'
                            checked={localShift.isTeamLeader}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, isTeamLeader: !prevShift.isTeamLeader }))}
                            disabled={disabled}
                        />
                    </div>
                    <div className="shift__form__input">
                        <label htmlFor="type">סוג משמרת</label>
                        <select
                            name="type"
                            id="type"
                            value={localShift.type}
                            onChange={evt => setLocalShift(prevShift => ({ ...prevShift, [evt.target.name]: evt.target.value }))}
                            disabled={disabled}
                            dir='rtl'
                            required
                        >
                            <option value="morning">בוקר</option>
                            <option value="noon">צהריים</option>
                            <option value="night">לילה</option>
                        </select>
                    </div>
                </div>
                <div className='shift__form__buttons-dates'>
                    {!createable &&
                        <div className='shift__form__dates'>
                            <p>נוצר  <span>{formattedDate(new Date(localShift.updatedAt))}</span></p>
                            <p>עודכן  <span>{formattedDate(new Date(localShift.updatedAt))}</span></p>
                        </div>
                    }
                    <div className='shift__form__buttons'>
                        {isChanged && !disabled &&
                            <>
                                <button className='btn btn-primary' onClick={(e) => {
                                    e.preventDefault()
                                    if (shift) setLocalShift({ ...shift })
                                    else setLocalShift({ ...INITIAL_STATE })
                                }}
                                >
                                    נקה
                                </button>
                                <button type='submit' className='btn btn-success' ref={submitRef}>שמור</button>
                            </>
                        }
                        {!disabled && shift && <button type='submit' className='btn btn-danger' onClick={() => deleteShift(shift?._id)} ref={deleteRef}>מחק</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Shift