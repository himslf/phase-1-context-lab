/* Your Code Here */

function createEmployeeRecord(arrayList) {
    return {
        firstName: arrayList[0],
        familyName: arrayList[1],
        title: arrayList[2],
        payPerHour: arrayList[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(arrayList) {
    return arrayList.map(employee => createEmployeeRecord(employee));
};

function createTimeInEvent(timeStamp) {
    const dateStamp = timeStamp.slice(0, 10);
    const hourStamp = timeStamp.slice(11);
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hourStamp),
        date: dateStamp
    });
    return this;
};

function createTimeOutEvent(timeStamp) {
    const dateStamp = timeStamp.slice(0, 10);
    const hourStamp = timeStamp.slice(11);
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hourStamp),
        date: dateStamp
    });
    return this;
};

function hoursWorkedOnDate(date) {
    let clockedIn;
    let clockedOut;

    this.timeInEvents.forEach(rec => {
        if(rec.date === date) {
            clockedIn = rec.hour;
        };
    });

    this.timeOutEvents.forEach(rec => {
        if(rec.date === date) {
            clockedOut = rec.hour;
        };
    });

    if(clockedIn.toString().length === 3) {
        clockedIn = `0${clockedIn.toString()}`;
    };

    const hoursWorked = clockedOut.toString().slice(0, 2) - clockedIn.toString().slice(0, 2);
 

    return parseInt(hoursWorked);
};

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(records) {
    let totalOwed = 0;
    for(let employee of records) {
        totalOwed += allWagesFor.call(employee);
    }
    return totalOwed;
}

function findEmployeeByFirstName(records, name) {
    return records.find(emp => emp.firstName === name);
}