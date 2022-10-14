import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import './_sidebar.scss'

const Sidebar: React.FC = () => {

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 'inherit',

    }

    return (
        <div className='sidebar'>
            <Link to='/agents' style={linkStyles} className='sidebar__item'>
                <span>צפה בעובדים</span>
                <FontAwesomeIcon className='icon' icon={solid('user-secret')} />
            </Link >
            <Link to='/tables' style={linkStyles} className='sidebar__item'>
                <span> צפה בסידורים</span>
                <FontAwesomeIcon className='icon' icon={solid('table')} />
            </Link>
            <Link to='/shifts' style={linkStyles} className='sidebar__item'>
                <span>צפה במשמרות</span>
                <FontAwesomeIcon className='icon' icon={solid('network-wired')} />
            </Link>
        </div >
    )
}

export default Sidebar