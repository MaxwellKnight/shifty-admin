import { Dispatch } from "react"
import { IUser } from "../../interfaces/IUser"

export type IAgent = {
    _id: string,
    username: string,
    email: string,
    role: string
}

export type IAction = {
    type: string,
    error?: string,
    user: IAgent | null,
}

export type IAuthState = {
    loading: boolean,
    user: IUser | null,
    error?: string | null,
    dispatch?: Dispatch<IAction>
}

export type IProps = {
    children: JSX.Element
}