
const formattedDate = (d: Date | undefined = new Date) => {
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

const getDatesArray = function (start: Date, end: Date) {
    const arr: Date[] = []
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

const getDatesRange = function (start: Date, end: Date) {
    const arr: Date[] = []
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr.length;
};
const getDayFromDate = (date: Date) => {
    return new Map([
        [0, 'ראשון'],
        [1, 'שני'],
        [2, 'שלישי'],
        [3, 'רביעי'],
        [4, 'חמישי'],
        [5, 'שישי'],
        [6, 'שבת']
    ]).get(date.getDay())
}

const getDay = (date: string) => {
    const [day, month, year] = date.split('/')
    const newDate = new Date()
    newDate.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day))
    console.log(newDate)
    return new Map([
        [0, 'ראשון'],
        [1, 'שני'],
        [2, 'שלישי'],
        [3, 'רביעי'],
        [4, 'חמישי'],
        [5, 'שישי'],
        [6, 'שבת']
    ]).get(newDate.getDay())
}
const translateDate = (date: string) => {
    const toDate = date.split("-")
    return `${toDate[1]}/${toDate[0]}/${toDate[2]}`
}

const getShiftText = (type: string) => {
    switch (type) {
        case 'morning':
            return 'בוקר'
        case 'noon':
            return 'צהריים'
        case 'night':
            return 'לילה'
        default:
            return
    }
}

export { formattedDate, getShiftType, getFacility, getBtnClass, getDay, translateDate, getDatesArray, getShiftText, getDatesRange, getDayFromDate }