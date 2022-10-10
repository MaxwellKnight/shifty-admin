
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

export { formattedDate, getShiftType, getFacility, getBtnClass }