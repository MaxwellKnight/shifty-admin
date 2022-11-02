import { Droppable, Draggable, DraggableProvided, DroppableStateSnapshot, DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { formattedDate, getShiftType, getDay, getDayFromDate } from '../../utils/functions'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './_index.scss'
import { useNavigate } from 'react-router-dom'

export interface PlaygroundProps<PlaygroundData, Headers> {
    headers?: Headers[],
    data: PlaygroundData[] | undefined,
    agents: any,
    currentAgent: string | null,
    setCurrentAgent: Dispatch<SetStateAction<string | null>>
}

const sortByShift = (shifts: any) => {
    return shifts?.sort((a: any, b: any) => {
        if (a.type === 'morning' && b.type === 'morning') return 0
        if (a.type === 'noon' && b.type === 'night') return -1
        if (a.type === 'morning' && (b.type === 'noon' || b.type === 'night')) return -1
        return 1
    })
}

const PlaygroundGrid = <PlaygroundData extends unknown, Headers extends ReactNode>({
    headers,
    data,
    agents,
    currentAgent,
    setCurrentAgent
}: PlaygroundProps<PlaygroundData, Headers>) => {
    const allShifts = sortByShift(data)
    const navigate = useNavigate()

    const handleCurrentAgent = (event: React.MouseEvent, agentId: string, setCurrentAgent: Dispatch<SetStateAction<string | null>>) => {
        switch (event.detail) {
            case 1: {
                if (currentAgent === agentId) setCurrentAgent(null)
                else setCurrentAgent(agentId)
                break
            }
            case 2: {
                return currentAgent && navigate(`/agents/${currentAgent}`)
            }

        }

    }

    return (
        <div className='playground-sheet' dir='rtl'>

            {data && agents && allShifts && headers?.map?.((header, index) => (

                <div key={index} className='playground-sheet__col'>

                    <h4>{header}</h4>
                    <div className='playground-sheet__col__shifts'>

                        {allShifts.filter?.((shift: any) => formattedDate(new Date(shift?.date)) === header)?.map((shift: any) => {

                            return (
                                <div
                                    className={`playground-sheet__col__shifts__agents ${String(shift.isFull)}`}
                                    key={uuidv4()}
                                >
                                    <Droppable droppableId={`${shift._id},${shift.facility},${shift.date}`} mode='virtual'
                                        renderClone={(provided, snapshot, rubric) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <span className='tag'>
                                                    {agents.find((agent: any) => agent._id == rubric.draggableId.split(',')[0]).name}
                                                </span>
                                            </div>
                                        )}
                                    >

                                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                                            return (
                                                <>
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        key={uuidv4()}
                                                        className={snapshot.isDraggingOver ? 'draggin' : ''}
                                                    >
                                                        <h5 className={shift?.type}>{getDayFromDate(new Date(shift?.date))} {getShiftType(shift?.type)}</h5>

                                                        {allShifts && shift?.agents?.length > 0 && agents.filter?.((agent: any) => shift?.agents?.includes?.(agent._id))?.map?.((agent: any, index: number) => (
                                                            <Draggable
                                                                draggableId={`${agent._id},${shift.facility},${shift.date}`}
                                                                index={index}
                                                                key={index}
                                                            >
                                                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                                    <div

                                                                        key={`${agent._id},${uuidv4()}`}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        onClick={(event) => handleCurrentAgent(event, agent._id, setCurrentAgent)}
                                                                    >
                                                                        <span className={currentAgent === agent._id ? 'current' : ''}>
                                                                            {agent.name}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}

                                                    </div>
                                                </>
                                            )
                                        }}

                                    </Droppable>
                                </div>
                            )
                        })}

                    </div>
                </div>
            ))}
        </div>
    )
}

export default PlaygroundGrid