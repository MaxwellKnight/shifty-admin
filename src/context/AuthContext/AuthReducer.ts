import { IAction, IAuthState } from "./interface"


const INITIAL_STATE: IAuthState = {
    loading: false,
    user: JSON.parse(String(localStorage.getItem('agent'))) || null,
    error: null
}

const AuthReducer = (state: IAuthState, action: IAction): IAuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...INITIAL_STATE,
                loading: true
            }
        case 'LOGIN_SUCCESS':
            return {
                loading: false,
                user: action.user
            }
        case 'LOGIN_FAILURE':
            return {
                ...INITIAL_STATE,
                error: action.error
            }
        case 'LOGOUT':
            return {
                ...INITIAL_STATE
            }
        default:
            return {
                ...INITIAL_STATE
            }
    }
}

export { AuthReducer, INITIAL_STATE }