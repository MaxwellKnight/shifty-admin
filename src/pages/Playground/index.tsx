import { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { MainContent, PlaygroundGrid } from '../../components'
import { useFetch } from '../../hooks'
import { IBaseShift } from '../../interfaces/IBaseShift'
import { ITable } from '../../interfaces/ITable'
import { DragDropContext } from 'react-beautiful-dnd'
import { formattedDate, getDatesArray } from '../../utils/functions'
import './_index.scss'

const onDragEnd = (result: any, graph: any, setGraph: React.Dispatch<any>) => {
    if (result.destination === null) return

    const { source, destination, draggableId: current } = result
    const [agentId] = current.split(',')
    const [sourceId, sourceFacility] = source.droppableId.split(',')
    const [destinationId, destinationFacility] = destination.droppableId.split(',')

    if (sourceId === destinationId) {
        // const sourceArray = [...graph[sourceFacility]]
        // let shift: any = sourceArray.find((shift: IBaseShift) => shift._id === sourceId)
        // let agents = [...shift.agents]

        // for (let i = 0; i < agents.length; i++) {
        //     if (agents[i] === agentId) {
        //         const [removed] = agents.splice(i - 1, 1)
        //         agents.splice(destinationIndex, 0, removed)
        //         console.log(sourceIndex, destinationIndex)
        //         shift.agents = agents
        //         for (let i = 0; i < sourceArray.length; i++) {
        //             if (sourceArray[i]?._id === sourceId) {
        //                 const [removed] = sourceArray.splice(i, 1)
        //                 sourceArray.push(removed)
        //                 setGraph((prevGraph: any) => ({ ...prevGraph, [sourceFacility]: sourceArray }))
        //                 return
        //             }
        //         }
        //         return
        //     }
        // }
    }
    else {
        const sourceArray = graph[sourceFacility]
        const destinationArray = graph[destinationFacility]
        let sourceShift = sourceArray.find((shift: IBaseShift) => shift._id === sourceId)
        let destinationShift = destinationArray.find((shift: IBaseShift) => shift._id === destinationId)

        if (destinationShift.agents.includes(agentId)) return
        if (destinationShift.isFull) return

        const filteredSource = sourceArray.filter((shift: IBaseShift) => shift._id !== sourceId)
        const filteredDestination = destinationArray.filter((shift: IBaseShift) => shift._id !== destinationId)
        const removedSourceAgents = sourceShift.agents.filter((id: string) => id !== agentId)
        const removedDestinationAgents = [...destinationShift.agents]
        removedDestinationAgents.push(agentId)

        sourceShift.agents = removedSourceAgents
        if (sourceShift.agents.length < sourceShift.limit) sourceShift.isFull = false
        filteredSource.push(sourceShift)
        destinationShift.agents = removedDestinationAgents
        if (destinationShift.agents.length >= destinationShift.limit) destinationShift.isFull = true
        filteredDestination.push(destinationShift)
        console.log(agentId, removedSourceAgents)

        setGraph((prevGraph: any) => ({ ...prevGraph, [sourceFacility]: [...filteredSource], [destinationFacility]: [...filteredDestination] }))

    }
}

const Playground = () => {
    const [table, setTable] = useState<ITable | null>(null)
    const [graph, setGraph] = useState<any>(null)
    const [currentAgent, setCurrentAgent] = useState<string | null>(null)
    const { data, loading, error } = useFetch('http://localhost:8000/tables/new')
    const { data: agents } = useFetch('http://localhost:8000/agents')

    useEffect(() => {
        if (!error && data) {
            setTable({ ...data?.data })

            const buildGraph: any = {}
            const t = new Map<string, IBaseShift[]>(Object.entries(data.data.table))
            for (const [k, v] of t) {
                for (const shift of v) {
                    if (!(shift.facility in buildGraph)) buildGraph[shift.facility] = []
                    buildGraph[shift.facility].push(shift)
                }
            }
            setGraph(buildGraph)
        }
    }, [data])


    return (
        <MainContent shrink={true}>
            {!loading && table && graph ?
                <DragDropContext onDragEnd={(result) => onDragEnd(result, graph, setGraph)}>
                    <div className='playground'>
                        <div>
                            <PlaygroundGrid
                                agents={agents}
                                setCurrentAgent={setCurrentAgent}
                                currentAgent={currentAgent}
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['EYES']}
                            />
                        </div>
                        <div>
                            <h2>תקשוב</h2>
                            <PlaygroundGrid
                                agents={agents}
                                setCurrentAgent={setCurrentAgent}
                                currentAgent={currentAgent}
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['TIKSHOV']}
                            />
                        </div>
                        <div>
                            <h2>בינוי</h2>
                            <PlaygroundGrid
                                agents={agents}
                                setCurrentAgent={setCurrentAgent}
                                currentAgent={currentAgent}
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['BINUY']}
                            />
                        </div>
                        <div>
                            <h2>משפחות</h2>
                            <PlaygroundGrid
                                agents={agents}
                                setCurrentAgent={setCurrentAgent}
                                currentAgent={currentAgent}
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['MISHPAHOT']}
                            />
                        </div>

                        <div>
                            <h2>שיקום</h2>
                            <PlaygroundGrid
                                agents={agents}
                                setCurrentAgent={setCurrentAgent}
                                currentAgent={currentAgent}
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['SHIKUM']}
                            />
                        </div>
                    </div>
                </DragDropContext>
                :
                <Loader />
            }
        </MainContent>
    )
}

export default Playground