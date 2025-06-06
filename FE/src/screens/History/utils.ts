import moment from 'moment';

function getTimeData(time: string) {
    const date = moment(time);
    const formattedDate = date.format('hh:mm A, DD MMM YYYY');
    return formattedDate;
}

export {getTimeData};