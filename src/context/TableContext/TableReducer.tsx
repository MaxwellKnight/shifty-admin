import { Dispatch } from 'react'
import { ShiftsTable } from '../../interfaces/ITable'

export const TABLE_ACTIONS = {
    INITIALIZE: "INITIALIZE",
    LOADING: "LOADING",
    CHANGE_DAY: "CHANGE_DAY",
    CHANGE_SHIFT: "CHANGE_SHIFT",
    ABORT: 'ABORT'
}
export type TableState = {
    id: string,
    currentTable: ShiftsTable | null,
    startDate: string,
    endDate: string,
    currentDay: string,
    currentShift: string | undefined,
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
    type: typeof TABLE_ACTIONS.LOADING
    | typeof TABLE_ACTIONS.INITIALIZE
    | typeof TABLE_ACTIONS.CHANGE_DAY
    | typeof TABLE_ACTIONS.CHANGE_SHIFT
    | typeof TABLE_ACTIONS.ABORT

    payload: { startDate: string, endDate: string, table: any } | { shift: string } | { day: string } | any
    error?: string,
    loading?: boolean,
}


const INITIAL_TABLE_STATE: TableState = {
    id: '',
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
        const shift = state.currentTable?.get(state.currentDay)?.find((shift: any) => shift._id === id)
        return shift?.agents
    }

    switch (action.type) {
        case 'LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        case 'INITIALIZE': {
            if (action.payload.table) {
                const table: ShiftsTable = new Map(Object.entries(action.payload.table))
                const day = table.entries().next().value
                const shift = day[1]
                return {
                    ...state,
                    id: action.payload?._id,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                    currentTable: new Map(table),
                    currentDay: day[0],
                    currentShift: shift[0]._id,
                    currentAgents: shift[0].agents
                }
            }
            else return { ...state, error: 'could not fetch table', loading: false }
        }
        case 'CHANGE_SHIFT': {
            return {
                ...state,
                currentShift: action.payload.shift,
                currentAgents: getAgentsFromShift(action.payload.shift)
            }
        }
        case 'CHANGE_DAY': {
            if (state.currentTable) {
                return {
                    ...state,
                    currentDay: action.payload.day,
                    currentShift: state.currentTable.get(action.payload.day)?.[0]._id,
                    currentAgents: state.currentTable.get(action.payload.day)?.[0].agents
                }
            }
            return { ...INITIAL_TABLE_STATE }
        }
        case 'ABORT': {
            return {
                ...INITIAL_TABLE_STATE
            }
        }
        default:
            return {
                ...INITIAL_TABLE_STATE
            }
    }
}

export { TableReducer, INITIAL_TABLE_STATE }