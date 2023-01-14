interface YieldData {
    time: number;
    yield: number;
}

export const randomYieldDataGenerator = (days: number): YieldData[] => {
    return Array(days).fill(undefined).map((value, index) => ({
        time: 1669852800 + 86400 * (index - 1),
        yield: Math.round(Math.random() * 10)
    }));
};
