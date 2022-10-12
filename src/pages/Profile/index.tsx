import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MainContent, ConstraintsForm, Constraints, Loader } from '../../components'
import Shifts from '../../components/Shifts'
import { useFetch } from '../../hooks'
import './index.scss'

const Profile = () => {
    const params = useParams()
    const [agent, setAgent] = useState<any>(null)
    const [currCons, setCurrCons] = useState<Map<string, any> | null>(null)
    const [currShifts, setCurrShifts] = useState<Map<string, any> | null>(null)
    const [isFormShown, setIsFormShown] = useState<boolean>(false)
    const { data, error, reFetch } = useFetch(`http://localhost:8000/agents/${params.id}`)
    const getAgentRole = (role: string) => {
        return role === 'agent' ? 'מאבטח' : 'אחמש';
    }

    const handleFormSubmit = async (e: any, formData: any) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:8000/agents/${agent._id}`, { weeklyConstraints: Object.fromEntries(formData) })
            reFetch()
            setIsFormShown(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data && !error) {
            setAgent({ ...data._doc })
            if (data._doc.weeklyConstraints) {
                const consMap = new Map(Object.entries(data._doc.weeklyConstraints))
                setCurrCons(new Map(consMap))
            }
            if (data._doc.weeklyShifts) {
                const shiftsMap = new Map(Object.entries(data._doc.weeklyShifts))
                setCurrShifts(new Map(shiftsMap))
            }
        }
    }, [params.id, data])

    return (
        <MainContent>
            <>
                <div className='profile'>
                    {agent && currCons ?
                        <>
                            <div className='profile__info'>
                                <div className="profile__info__personal" dir='rtl'>
                                    {/* <img src="" alt="agents profile portrait" /> */}
                                    <h1>{agent?.name}</h1>
                                    <p>תפקיד <span>{getAgentRole(agent?.role)}</span></p>
                                    <p>פרופיל משרה <span>{agent?.isStudent ? 'סטודנט' : 'מלאה'}</span></p>
                                    <p>רכב בבעלות <span>{agent?.isMobile ? 'קיים' : 'לא קיים'}</span></p>
                                </div>
                                <div className="profile__info__contact" dir='rtl'>
                                    <p>כתובת <span>{agent?.contact?.addr?.street}, {agent?.contact?.addr?.city}</span></p>
                                    <p>מספר נייד <span>{agent?.contact?.phone}</span></p>
                                    <p>מספר חירום <span>{agent?.contact?.emergency}</span></p>
                                    <p>כתובת מייל <span>{agent?.contact?.email}</span></p>
                                </div>
                                <div className="profile__info__table-settings" dir='rtl'>
                                    <p>הגבלה <span>{agent?.weeklyLimit?.limit}</span></p>
                                    <p>כמות לילות לשבוע <span>{agent?.weeklyLimit?.nightCount}</span></p>
                                    <p>כמות משמרות לשבוע <span>{agent?.weeklyLimit?.totalCount}</span></p>
                                </div>
                            </div>
                        </>
                        :
                        <Loader />
                    }
                </div>
                <div className='btn-container'>
                    <button
                        className={isFormShown ? 'active' : ''}
                        onClick={() => setIsFormShown(true)}
                    >
                        טופס
                    </button>
                    <button
                        className={isFormShown ? '' : 'active'}
                        onClick={() => setIsFormShown(false)}
                    >
                        אילוצים
                    </button>
                </div>

                <div className='split'>
                    {isFormShown && currCons ? <ConstraintsForm handleSubmit={handleFormSubmit} /> : <Constraints constraints={currCons} />}
                    <Shifts shifts={currShifts} />
                </div>
            </>
        </MainContent>
    )
}

export default Profile