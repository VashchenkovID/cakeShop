import { getDaysInMonth } from 'date-fns';
const DAYS_IN_WEEK = 7;
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];
const Month = {
    January: { count: 0, name: 'Январь' },
    February: { count: 1, name: 'Февраль' },
    March: { count: 2, name: 'Март' },
    April: { count: 3, name: 'Апрель' },
    May: { count: 4, name: 'Май' },
    June: { count: 5, name: 'Июнь' },
    July: { count: 6, name: 'Июль' },
    August: { count: 7, name: 'Август' },
    September: { count: 8, name: 'Сентябрь' },
    October: { count: 9, name: 'Октябрь' },
    Novermber: { count: 10, name: 'Ноябрь' },
    December: { count: 11, name: 'Декабрь' },
};
export const getMonthName = (month) => {
    return Object.values(Month).find((obj) => obj.count === month)?.name;
};
export function isLeapYear(year) {
    return !(year % 4 || (!(year % 100) && year % 400));
}
export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();
    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}
export function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;
    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];
        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            }
            else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }
    return result;
}
//# sourceMappingURL=useAdministrationCalendar.js.map