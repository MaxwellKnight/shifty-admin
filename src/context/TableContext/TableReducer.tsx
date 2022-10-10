import React from 'react'
import axios from 'axios'

const INITIAL_STATE = {
    currentTable: new Map<string, any>(),
    currentDay: '',
    currentShift: '',
    currentAgents: [],
    activeDay: '',
}

type TableAction = {
    type: string,
    payload: string | any[]
    error: string,
}

const initialize = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/tables/new')
        if (data) {
            return {
                currentTable: new Map(data[0]?.table),
                currentDay: [...data[0]?.table?.SUN],
                currentShift: data[0]?.table?.SUN?._id,
                activeDay: 'SUN'
            }
        }
        else {
            return { ...INITIAL_STATE, error: 'data is not available' }
        }
    } catch (error) {
        return { ...INITIAL_STATE, error: 'failed to fetch data from server' }
    }
}

const fetchAgents = async (agentsId: string[]) => {
    try {
        const agents = await Promise.all(agentsId.map(async (id: string) => {
            try {
                const { data } = await axios.get(`http://localhost:8000/agents/${id}`)
                return data._doc
            } catch (error) {
                return 'could not fetch agents from server'
            }
        }))
        return { ...agents }
    } catch (error) {
        return {
            ...INITIAL_STATE,
            error: 'could not fetch agents from server'
        }
    }
}

const TableReducer = (state: typeof INITIAL_STATE, action: TableAction) => {
    switch (action.type) {
        // case 'INITIALIZE': {
        //     const newState = initialize()
        //     // const agents = fetchAgents()
        // }
        case 'CHANGE_SHIFT': {
            return {
                ...INITIAL_STATE,
                currentShift: action.payload
            }
        }
        default:
            return {
                ...INITIAL_STATE
            }
    }
}

export default TableReducer