import { ReactNode } from 'react'
import './_index.scss'
import Sidebar from '../Sidebar'

const MainContent =
    ({ children,
        shrink = false
    }: {
        shrink?: boolean,
        children: ReactNode
    }) => {
        return (
            <div className="main">
                <div className="content">
                    {children}
                </div>
                <Sidebar shrink={shrink} />
            </div>
        )
    }

export default MainContent