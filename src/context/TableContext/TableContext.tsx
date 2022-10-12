import { createContext, ReactNode, useReducer } from 'react'
import { TableReducer, INITIAL_TABLE_STATE } from './TableReducer'


const TableContext = createContext(INITIAL_TABLE_STATE)

const TableContextProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(TableReducer, INITIAL_TABLE_STATE)


    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TableContext.Provider>
    )
}

export { TableContext, TableContextProvider }