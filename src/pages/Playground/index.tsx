import { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { MainContent, PlaygroundGrid } from '../../components'
import { useFetch } from '../../hooks'
import { IBaseShift } from '../../interfaces/IBaseShift'
import { ITable } from '../../interfaces/ITable'
import { DragDropContext } from 'react-beautiful-dnd'
import { formattedDate, getDatesArray } from '../../utils/functions'
import './_index.scss'

const onDragEnd = (result: any, graph: any) => {
    if (result.destination === null) return
    const { source, destination, draggableId: current } = result
    const sourceIndex = source.index
    const destinationIndex = destination.index
    const [agentId, facility, date] = current.split(',')
    const [sourceId, sourceFacility, sourceDate] = source.droppableId.split(',')
    const [destinationId, destinationFacility, destinationDate] = destination.droppableId.split(',')

    console.log(sourceId, destinationId)
}

const Playground = () => {
    const [table, setTable] = useState<ITable | null>(null)
    const [graph, setGraph] = useState<any>(null)
    const { data, loading, error } = useFetch('http://localhost:8000/tables/new')
    useEffect(() => {
        if (!error && data) {
            setTable({ ...data })

            const buildGraph: any = {}
            const t = new Map<string, IBaseShift[]>(Object.entries(data.table))
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
                <DragDropContext onDragEnd={(result) => onDragEnd(result, { ...graph })}>
                    <div className='playground'>
                        <div>
                            <PlaygroundGrid
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['EYES']}
                            />
                        </div>
                        <div>
                            <h2>תקשוב</h2>
                            <PlaygroundGrid
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['TIKSHOV']}
                            />
                        </div>
                        <div>
                            <h2>בינוי</h2>
                            <PlaygroundGrid
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['BINUY']}
                            />
                        </div>
                        <div>
                            <h2>משפחות</h2>
                            <PlaygroundGrid
                                headers={getDatesArray(new Date(table.startDate), new Date(table.endDate)).map(date => formattedDate(date))}
                                data={graph['MISHPAHOT']}
                            />
                        </div>

                        <div>
                            <h2>שיקום</h2>
                            <PlaygroundGrid
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