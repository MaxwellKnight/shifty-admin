import { Dispatch } from 'react'

export type TableState = {
    currentTable: any,
    startDate: string,
    endDate: string,
    currentDay: string,
    currentShift: string,
    currentAgents: any,
    error?: string | undefined,
    loading: boolean,
    dispatch?: Dispatch<TableAction>
}

export type ActionPayload =
    | { startDate: string, endDate: string, table: any }
    | { shift: string }
    | { day: string }
    | boolean

export type TableAction = {
    type: string,
    payload: { startDate: string, endDate: string, table: any } | { shift: string } | { day: string } | any
    error?: string,
    loading?: boolean,
}


const INITIAL_TABLE_STATE: TableState = {
    currentTable: null,
    startDate: '',
    endDate: '',
    currentDay: '',
    currentShift: '',
    currentAgents: [],
    loading: false,
}

const TableReducer = (state: TableState, action: TableAction): TableState => {

    const getAgentsFromShift = (id: string) => {
        const shift = state.currentTable[state.currentDay].find((shift: any) => shift._id === id)
        return shift.agents
    }

    switch (action.type) {
        case 'LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        case 'INITIALIZE': {
            if (action.payload.table.SUN[0])
                return {
                    ...state,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                    currentTable: action.payload.table,
                    currentDay: 'SUN',
                    currentShift: action.payload.table.SUN[0]._id,
                    currentAgents: action.payload.table.SUN[0].agents,
                    loading: false
                }
            else return { ...state, error: 'could not fetch table', loading: false }
        }
        case 'CHANGE_SHIFT': {
            console.log(state.currentAgents)
            return {
                ...state,
                currentShift: action.payload.shift,
                currentAgents: getAgentsFromShift(action.payload.shift)
            }
        }
        case 'CHANGE_DAY': {
            return {
                ...state,
                currentDay: action.payload.day,
                currentShift: state.currentTable[action.payload.day][0]._id,
                currentAgents: state.currentTable[action.payload.day][0].agents
            }
        }
        default:
            return {
                ...INITIAL_TABLE_STATE
            }
    }
}

export { TableReducer, INITIAL_TABLE_STATE }