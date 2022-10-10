import { ReactNode } from "react"
import './_list.scss'

export interface Props<ListItem, Headers> {
    headers?: Headers[],
    data: ListItem[],
    keyExtractor: (item: ListItem) => string,
    renderItem: (item: ListItem) => ReactNode
}

const List = <ListItem extends unknown, Headers extends ReactNode>({
    headers,
    data,
    keyExtractor,
    renderItem
}: Props<ListItem, Headers>) => {
    return (
        <div className='list' dir="rtl">
            <table className="table">
                <thead>
                    <tr>
                        {headers?.map(header => (
                            <th key={header?.toString()} className="table__header">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => (
                        <tr key={keyExtractor(item)} className="table__row">
                            {renderItem(item)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
