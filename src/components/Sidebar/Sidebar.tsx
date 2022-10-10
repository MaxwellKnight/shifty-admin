import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import './_sidebar.scss'

const Sidebar: React.FC = () => {

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 'inherit'
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__item">
                <Link to='/dashboard' style={linkStyles}>
                    <span>צפה בעובדים</span>
                </Link>
                <FontAwesomeIcon className='icon' icon={solid('user-secret')} />
            </div>
            <div className="sidebar__item">
                <Link to='/tables' style={linkStyles}>
                    <span> צפה בסידורים</span>
                </Link>
                <FontAwesomeIcon className='icon' icon={solid('table')} />
            </div>
            <div className="sidebar__item">
                <span>צפה במשמרות</span>
                <FontAwesomeIcon className='icon' icon={solid('network-wired')} />
            </div>
        </div >
    )
}

export default Sidebar