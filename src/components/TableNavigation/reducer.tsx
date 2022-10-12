import { Dispatch } from "react"

type IState = {
    isCreate: boolean,
    isPrev: boolean,
    isHold: boolean,
    table?: any,
    error?: any,
    dispatch?: Dispatch<IAction>
}
const INITIAL_STATE = {
    isCreate: false,
    isPrev: false,
    isHold: false,
}
type IAction = {
    type: string,
    payload: boolean,
    table?: any,
    error?: any
}



const TableNavReducer = (state: IState, action: IAction): IState => {

    switch (action.type) {
        case 'CREATE_TABLE':
            return {
                isCreate: action.payload,
                isPrev: false,
                isHold: false,
            }
        case 'HOLD_TABLE':
            return {
                isCreate: false,
                isPrev: false,
                isHold: action.payload,
            }
        case 'PREV_TABLE': {
            console.log(action.table)
            if (action.error) return { ...INITIAL_STATE }
            return {
                isCreate: false,
                isPrev: action.payload,
                isHold: false,
                table: { ...action.table }
            }
        }
        default:
            return { ...state }
    }
}

export { TableNavReducer, INITIAL_STATE }