import { Droppable, Draggable, DraggableProvided, DroppableStateSnapshot, DroppableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { formattedDate, getShiftType, getDay } from '../../utils/functions'
import { ReactNode, useEffect } from 'react'
import { useFetch } from '../../hooks'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './_index.scss'

export interface PlaygroundProps<PlaygroundData, Headers> {
    headers?: Headers[],
    data: PlaygroundData[] | undefined,
    agents: any
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
    agents
}: PlaygroundProps<PlaygroundData, Headers>) => {
    const allShifts = sortByShift(data)
    return (
        <div className='playground-sheet' dir='rtl'>

            {agents && headers?.map?.((header, index) => (

                <div key={index} className='playground-sheet__col'>

                    <h4>{header}</h4>
                    <div className='playground-sheet__col__shifts'>

                        {allShifts.filter((shift: any) => formattedDate(new Date(shift?.date)) === header)?.map((shift: any) => {
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
                                                        <h5 className={shift.type}>{getDay(shift.date)} {getShiftType(shift.type)}</h5>

                                                        {shift?.agents?.length > 0 && agents.filter((agent: any) => shift?.agents?.includes(agent._id))?.map((agent: any, index: number) => (
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

                                                                    >
                                                                        <span>
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