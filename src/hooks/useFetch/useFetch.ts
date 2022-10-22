import { useEffect, useReducer } from "react"
import { FetchReducer, INITIAL_STATE } from './reducer'
import axios from 'axios'



const useFetch = (url: string) => {
    const [{ data, loading, error }, dispatch] = useReducer(FetchReducer, INITIAL_STATE)

    useEffect(() => {
        const fetchData = async (url: string) => {
            try {
                dispatch({ type: 'FETCH_START' })
                const response = await axios.get(url)
                const data = response?.data
                if (data) dispatch({ type: 'FETCH_SUCCESS', data })
            } catch (error) {
                console.log(error)
                dispatch({ type: 'FETCH_FAILURE', error: 'Failed to fetch data' })
            }
        }
        fetchData(url)
    }, [url])
    const reFetch = async () => {
        try {
            dispatch({ type: 'FETCH_START' })
            const response = await axios.get(url)
            const data = response?.data
            if (data) dispatch({ type: 'FETCH_SUCCESS', data })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'FETCH_FAILURE', error: 'Failed to fetch data' })
        }
    }

    return { data, loading, error, reFetch }
}

export default useFetch