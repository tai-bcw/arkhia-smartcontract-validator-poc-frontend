
const tinybarsToHbars = (val: number) => val / 1e9;

const timestampToDatetime = (val: string | number | null | undefined) => {
    if (val == null) return ``;

    const [seconds, nanos] = val.toString().split(`.`);

    return [
        new Date(parseInt(seconds) * 1000 + Math.floor(parseInt(nanos) / 1000000)).toLocaleDateString(),
        new Date(parseInt(seconds) * 1000 + Math.floor(parseInt(nanos) / 1000000)).toLocaleTimeString()
    ];
};

export {
    tinybarsToHbars,
    timestampToDatetime
};
