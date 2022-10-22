import { IBaseShift } from "./IBaseShift";

export type ShiftsTable = Map<string, IBaseShift[]>

export interface ITable {
    _id?: string,
    table: ShiftsTable,
    startDate: Date,
    endDate: Date,
    __v: number,
}