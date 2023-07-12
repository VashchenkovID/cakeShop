import { $authHost } from 'src/api/requests/index';
export default {
    getCalendar: (date) => $authHost.get(`${"/calendar/dates" /* EnpointsEnum.GET_CALENDAR */}/${date}`),
};
//# sourceMappingURL=calendarApi.js.map