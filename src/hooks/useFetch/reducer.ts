import { IFetchState, IAction } from "./interface"

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null,
}

const FetchReducer = (state: IFetchState, action: IAction): IFetchState => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...INITIAL_STATE,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                data: action.data,
                loading: false,
                error: null
            }
        case 'FETCH_FAILURE':
            return {
                ...INITIAL_STATE,
                error: action.error
            }
        default:
            return {
                ...INITIAL_STATE
            }
    }
}



export { FetchReducer, INITIAL_STATE }