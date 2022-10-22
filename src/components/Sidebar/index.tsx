import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import './_index.scss'

const Sidebar = ({ shrink = false }: { shrink?: boolean }) => {

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 'inherit',

    }

    return (
        <div className={`sidebar ${String(shrink)}`}>
            <Link to='/agents' style={linkStyles} className={`sidebar__item ${String(shrink)}`} >
                {!shrink && <span>עובדים</span>}
                <FontAwesomeIcon className={`icon ${String(shrink)}`} icon={solid('user-secret')} />
            </Link >
            <Link to='/tables' style={linkStyles} className={`sidebar__item ${String(shrink)}`}>
                {!shrink && <span>סידורים</span>}
                <FontAwesomeIcon className={`icon ${String(shrink)}`} icon={solid('table')} />
            </Link>
            <Link to='/tables/edit' style={linkStyles} className={`sidebar__item ${String(shrink)}`}>
                {!shrink && <span>טבלה</span>}
                <FontAwesomeIcon className={`icon ${String(shrink)}`} icon={solid('edit')} />
            </Link>
            <Link to='/shifts' style={linkStyles} className={`sidebar__item ${String(shrink)}`}>
                {!shrink && <span>משמרות</span>}
                <FontAwesomeIcon className={`icon ${String(shrink)}`} icon={solid('network-wired')} />
            </Link>
        </div >
    )
}

export default Sidebar