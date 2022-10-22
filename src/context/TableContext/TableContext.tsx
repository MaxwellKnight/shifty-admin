import { createContext, useReducer } from 'react'
import { TableReducer, INITIAL_TABLE_STATE, TABLE_ACTIONS } from './TableReducer'


const TableContext = createContext(INITIAL_TABLE_STATE)

const TableContextProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(TableReducer, INITIAL_TABLE_STATE)


    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TableContext.Provider>
    )
}

export { TableContext, TableContextProvider, TABLE_ACTIONS }