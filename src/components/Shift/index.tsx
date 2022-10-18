import './_index.scss'

interface IShift {
    _id: string,
    title: string,
    facility: string,
    type: string,
    limit: number,
    agents: any[],
    date: Date,
    length: number,
    isFull: number,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

const Shift = ({ shift }: { shift: IShift }) => {
    return (
        <div className='shift'>
            <h1>{shift.title}</h1>
            <p>{shift.facility}</p>
            <p>{shift.type}</p>
            <p>{shift.limit}</p>
        </div>
    )
}

export default Shift