import e from "cors";

export function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}

export function getLast7DaysOfWeeksNames(today) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuday"];
    let result = [];
    const options = { weekday: 'long'};
    let lastDay = new Date(today);
    lastDay.setDate(today.getDate() - 1);
    // let lastDay_day = lastDay.getDate();
    for (let i = 0; i < 7; i++) {
        const date = new Date(lastDay.getTime() - (i * 24 * 60 * 60 * 1000)); // subtract i days from current date
        const dayOfWeekString = date.toLocaleDateString('en-US', options);
        // daysOfWeek.push(dayOfWeekString);
        result.push(dayOfWeekString);
    }
    result[0] = "Yesterday";
    return result;
}

export function average(data) {
    if (data.length == 0) {
        return 0;
    } else {
        return data.reduce((a, b) => a + b, 0) / data.length;
    }
}

const extractLast7DaysData = (data) => {
    data.map((e) => {
        e[0] = new Date(e[0]);
    })
    let today = new Date();
    // let today_day = today.getDate();
    let lastDay = new Date(today);
    lastDay.setDate(today.getDate() - 1)
    let lastDay_day = lastDay.getDate();
    let arr = new Array(7).fill([]);
    data.map((e) => {
        const d = new Date(e[0]) ;
        // console.log(d);
        // console.log(d.getDate());
        let daydiff = lastDay_day - d.getDate();
        // console.log(daydiff);
        arr[daydiff] = [...arr[daydiff], parseFloat(e[1])];
    });
    return arr;
} 


const extractLast7DaysAverageData = (data) => {
    let arr = extractLast7DaysData(data);
    let eArr = new Array(7).fill(0);
    arr.map((e, i) => {
        eArr[i] = average(e);
    });
    return eArr;
}

export function dataCal(data, today) {
    let result = [];
    let latest;
    let averageData = extractLast7DaysAverageData(data); 
    // console.log(averageData);

    let last7DaysOfWeeksNames = getLast7DaysOfWeeksNames(new Date());
    for (let count = 6; count >= 0; count--) {
        result.push({ dow: last7DaysOfWeeksNames[count], value: averageData[count] });
    }
    return result;
}




export const retrieveNumberOfHighTemp = (data) => {
    // console.log(data);
    const highTemp = 40;
    if (data.length > 0) {
        let count = 0;
        for(let i = 0; i < data.length; i++) {
            if (parseFloat(data[i][1]) >= highTemp) {
                count++;
            }
        }
        return count;
    }
    else {
        return 0;
    }

}