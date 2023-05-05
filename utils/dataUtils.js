export function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}


export function average(data) {
    if (data.length == 0) {
        return 0;
    } else {
        return data.reduce((a, b) => a + b, 0) / data.length;
    }
}


export function dataCal(data, today) {
    if (data.length > 0) {
        let result = [];
        let latest;
        if (today) {
            latest = new Date(data[data.length - 1][0]);
        } else {
            latest = new Date(data[data.length - 1][0]);
            latest.setHours(23);
        }
        let arr = new Array(24).fill([]);
        data.map((e) => {
            const d = new Date(e[0]);
            let t = d.getHours();
            arr[t] = [...arr[t], parseFloat(e[1])];
        });
        let eArr = new Array(24).fill(0);
        arr.map((e, i) => {
            eArr[i] = average(e);
        });
        for (let i = latest.getHours(), count = 23; count >= 0; count--) {
            result[count] = { hour: i, value: eArr[i] };
            if (i == 0) {
                i = 23;
            } else {
                i--;
            }
        }
        return result;
    } else {
        return [];
    }
}


