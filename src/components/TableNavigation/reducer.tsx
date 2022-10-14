import { Dispatch } from "react"

export const TABLE_NAV_ACTIONS = {
    CREATE_TABLE: 'CREATE_TABLE',
    HOLD_TABLE: 'HOLD_TABLE',
    PREV_TABLE: 'PREV_TABLE',
    CONFIRM_TABLE: 'CONFIRM_TABLE'
}

type IState = {
    isCreate: boolean,
    isPrev: boolean,
    isHold: boolean,
    isConfirm: boolean
    table?: any,
    error?: any,
    dispatch?: Dispatch<IAction>
}
const INITIAL_STATE = {
    isCreate: false,
    isPrev: false,
    isHold: false,
    isConfirm: false,
}
type IAction = {
    type: typeof TABLE_NAV_ACTIONS.CREATE_TABLE
    | typeof TABLE_NAV_ACTIONS.HOLD_TABLE
    | typeof TABLE_NAV_ACTIONS.PREV_TABLE
    | typeof TABLE_NAV_ACTIONS.CONFIRM_TABLE,
    payload: boolean,
    table?: any,
    error?: any
}



const TableNavReducer = (state: IState, action: IAction): IState => {

    switch (action.type) {
        case 'CREATE_TABLE':
            return {
                ...state,
                isCreate: action.payload,
                isPrev: false,
                isHold: false,
            }
        case 'HOLD_TABLE':
            return {
                ...state,
                isCreate: false,
                isPrev: false,
                isHold: action.payload,
            }
        case 'PREV_TABLE': {
            if (action.error) return { ...INITIAL_STATE }
            return {
                ...state,
                isCreate: false,
                isPrev: action.payload,
                isHold: false,
                table: { ...action.table }
            }
        }
        case 'CONFIRM_TABLE': {
            return {
                ...state,
                isConfirm: action.payload,
            }
        }
        default:
            return { ...state }
    }
}

export { TableNavReducer, INITIAL_STATE }