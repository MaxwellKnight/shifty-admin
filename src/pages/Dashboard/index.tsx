import { useContext, useEffect } from 'react'
import { AuthContext, IAgent } from '../../context'
import { useNavigate } from 'react-router-dom'
import { MainContent, Agents, Sidebar, Loader } from './../../components'
import './index.scss'


const Dashboard: React.FC = () => {
    const { user }: { user: IAgent | null } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (user!.role === 'admin') {
                navigate('/agents')
            }
            else navigate('/login')
        }
    }, [user])

    return (
        <MainContent>
            {user ? <Agents /> : <Loader />}
        </MainContent>
    )
}

export default Dashboard