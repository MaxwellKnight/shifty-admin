
const formattedDate = (d = new Date) => {
    let month = String(d?.getMonth() + 1);
    let day = String(d?.getDate());
    const year = String(d?.getFullYear());

    if (month?.length < 2) month = '0' + month;
    if (day?.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
}

const getShiftType = (type: string) => {
    const shiftTypeMap = new Map([
        ['morning', 'בוקר'],
        ['noon', 'צהריים'],
        ['night', 'לילה']
    ])

    return shiftTypeMap.get(type)
}
const getFacility = (facility: string) => {
    const shiftTypeMap = new Map([
        ['EYES', 'עיניים'],
        ['MISHPAHOT', 'משפחות'],
        ['TIKSHOV', 'תקשוב'],
        ['BINUY', 'בינוי'],
        ['SHIKUM', 'שיקום']
    ])

    return shiftTypeMap.get(facility)
}

const getBtnClass = (id: string, currShift: string) => {
    return id === currShift
}


const getDay = (date: string) => {
    return new Map([
        [0, 'ראשון'],
        [1, 'שני'],
        [2, 'שלישי'],
        [3, 'רביעי'],
        [4, 'חמישי'],
        [5, 'שישי'],
        [6, 'שבת']
    ]).get(new Date(date).getDay())
}
const translateDate = (date: string) => {
    const toDate = date.split("-")
    return `${toDate[1]}/${toDate[0]}/${toDate[2]}`
}

export { formattedDate, getShiftType, getFacility, getBtnClass, getDay, translateDate }