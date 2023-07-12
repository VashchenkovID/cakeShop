import { isValid } from 'date-fns';
export const converterUrl = (url, data) => {
    // Метод для передачи параметров GET запросом
    const params = Object.entries(data)
        .map((arr) => {
        const result = arr.filter((str) => str !== undefined && str.length !== 0);
        if (result.length > 1) {
            if (Array.isArray(result[1])) {
                return result[1].map((item) => `&${arr[0]}=${item}`).join('');
            }
            return `&${arr.join('=')}`;
        }
        return '';
    })
        .filter((str) => str !== undefined);
    return `${url}?${params.join('')}`;
};
export const convertDateWithTime = (dateString) => {
    if (isValid(new Date(dateString))) {
        return `${new Date(dateString).toLocaleDateString()} ${new Date(dateString)
            .toLocaleTimeString()
            .slice(0, -3)}`;
    }
    else
        return 'Invalid Date';
};
//# sourceMappingURL=functions.js.map