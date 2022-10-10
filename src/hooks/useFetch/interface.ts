export type IAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS', data: any }
    | { type: 'FETCH_FAILURE', error: string }

export type IFetchState = {
    loading?: boolean,
    data: any,
    error?: string | null,
}