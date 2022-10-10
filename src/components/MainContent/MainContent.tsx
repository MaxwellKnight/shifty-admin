import { ReactNode } from 'react'
import './_main-content.scss'
import Sidebar from '../Sidebar/Sidebar'

const MainContent =
    ({ children
    }: {
        children: ReactNode
    }) => {
        return (
            <div className="main">
                <div className="content">
                    {children}
                </div>
                <Sidebar />
            </div>
        )
    }

export default MainContent