// make monday first day of week
function getNormalizeWeekDay(date) {
    let result = date.getDay();
    return result === 0 ? 6 : result - 1
}

function getMonthDaysCount(date) {
    const currentMonth = date.getMonth();
    const dateDraft = new Date(date);

    dateDraft.setMonth(currentMonth+1);
    dateDraft.setDate(0);

    return dateDraft.getDate();
}

export function getFreshDays(date) {
    const currentMonth = date.getMonth();
    const dateDraft = new Date(date.setDate(1));
    dateDraft.setMonth(currentMonth);

    const lastMonthDaysCount = getNormalizeWeekDay(dateDraft);
    dateDraft.setDate(-lastMonthDaysCount + 1);

    const currentMonthDaysCount = getMonthDaysCount(date);
    const futureMonthDaysCount = (lastMonthDaysCount + currentMonthDaysCount) % 7 === 0 ? 0 : 7 - (lastMonthDaysCount + currentMonthDaysCount) % 7 

    const countShowedDays = lastMonthDaysCount + currentMonthDaysCount + futureMonthDaysCount;
    
    // dateDraft must be on start position
    const emptyArr = [];
    emptyArr.length = countShowedDays;
    emptyArr.fill(null);

    return emptyArr.map(day => {
        const isActive = dateDraft.getMonth() === currentMonth;
        let result = {
            dateDay: dateDraft.getDate(),
            date: new Date(dateDraft),
            isActive,
        };
        dateDraft.setDate(dateDraft.getDate() + 1);

        return result
    })
}