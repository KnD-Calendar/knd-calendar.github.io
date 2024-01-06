document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(
        calendarEl,
        {
            height: 'parent',
            timeZone: 'UTC',
            themeSystem: 'bootstrap5',
            headerToolbar: {
                left: 'prev,today,next',
                center: 'title',
                right: 'multiMonthYear,dayGridMonth,timeGridWeek,listMonth'
            },
            buttonText: {
                year: "Y",
                month: "M",
                week: "W",
                list: "list",
            },
            multiMonthMaxColumns: 2,
            timeZone: "local",
            weekNumbers: true,
            dayMaxEvents: true,
            events: function (fetchInfo, successCallback, failureCallback) {
                var generatedEvents = generateEvents(fetchInfo.start, fetchInfo.end);
                successCallback(generatedEvents);
            },
            dayCellClassNames: function (cellInfo) {
                var elementMonth = ((((cellInfo.date.getYear()*12+cellInfo.date.getMonth()))%5)+1)
                var monthClass = 'knd-event-month-' + elementMonth;
                return [ monthClass ]
            },
        }
    );
    calendar.render();
});

function generateEvents(startDate, endDate) {
    var events = [];

    var raidEvents = generateRaidDates(startDate, endDate);
    for (const event in raidEvents) {
        events.push(raidEvents[event]);
    }

    var warEvents = generateWarDates(startDate, endDate);
    for (const event in warEvents) {
        events.push(warEvents[event]);
    }

    var blitzRaidEvents = generateBlitzRaidDates(startDate, endDate);
    for (const event in blitzRaidEvents) {
        events.push(blitzRaidEvents[event]);
    }

    var blitzWarEvents = generateBlitzWarDates(startDate, endDate);
    for (const event in blitzWarEvents) {
        events.push(blitzWarEvents[event]);
    }

    var heroicEvents = generateHeroicDates(startDate, endDate);
    for (const event in heroicEvents) {
        events.push(heroicEvents[event]);
    }

    return events;
}

function generateElementMonths(startDate, endDate) {
    const raidEvents = [];
    const monthElementData = dateToElementMonth(startDate);
    raidEvents.push(
        {
            title: monthElementData.name,
            start: startDate,
            end: endDate,
            color: monthElementData.color,
            display: 'background'
        }
    )
    return raidEvents;
}

function generateRaidDates(startDate, endDate) {
    var raidEvents = [];
    var possibleDate = new Date(startDate);

    while (possibleDate >= startDate && possibleDate <= endDate) {
        if (!(possibleDate.getDay() == 5)) {
            possibleDate = addDays(possibleDate, 1);
            continue
        }
        if (isRaidDate(possibleDate)) {
            raidEvents.push({
                title: 'Raid',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 2).setUTCHours(22, 0, 0)),
                color: "#001219",
                url: "../events/raid"
            });
        }
        possibleDate = addDays(possibleDate, 1);
    }

    return raidEvents;
}

function isRaidDate(date) {
    dateSeconds = date.getTime() / 1000;
    dateMinutes = dateSeconds / 60;
    dateHours = Math.floor(dateMinutes / 60);
    dateDays = (dateHours - (dateHours % 24)) / 24;
    dateDaysSinceFirstFriday = dateDays - 1;
    dateDaysSinceFirstRaid = dateDaysSinceFirstFriday - 7;
    return dateDaysSinceFirstRaid % 14 == 0;
}

function generateWarDates(startDate, endDate) {
    var warEvents = [];
    var possibleDate = new Date(startDate);

    while (possibleDate >= startDate && possibleDate <= endDate) {
        if (!(possibleDate.getDay() == 5)) {
            possibleDate = addDays(possibleDate, 1);
            continue
        }
        if (isWarDate(possibleDate)) {
            warEvents.push({
                title: 'War',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 2).setUTCHours(22, 0, 0)),
                color: "#9b2226",
                url: "../events/war"
            });
        }
        possibleDate = addDays(possibleDate, 1);
    }

    return warEvents;
}

function isWarDate(date) {
    dateSeconds = date.getTime() / 1000;
    dateMinutes = dateSeconds / 60;
    dateHours = Math.floor(dateMinutes / 60);
    dateDays = (dateHours - (dateHours % 24)) / 24;
    dateDaysSinceFirstFriday = dateDays - 1;
    dateDaysSinceFirstWar = dateDaysSinceFirstFriday;
    return dateDaysSinceFirstWar % 14 == 0;
}


function generateBlitzRaidDates(startDate, endDate) {
    var blitzRaidEvents = [];
    var possibleDate = new Date(startDate);

    while (possibleDate >= startDate && possibleDate <= endDate) {
        if (!(possibleDate.getDay() == 1)) {
            possibleDate = addDays(possibleDate, 1);
            continue
        }
        if (isBlitzRaidDate(possibleDate)) {
            blitzRaidEvents.push({
                title: 'Blitz Raid',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 1).setUTCHours(22, 0, 0)),
                color: "#0a9396",
                url: "../events/blitz_raid"
            });
        }
        possibleDate = addDays(possibleDate, 1);
    }
    return blitzRaidEvents
}

function isBlitzRaidDate(date) {
    dateSeconds = date.getTime() / 1000;
    dateMinutes = dateSeconds / 60;
    dateHours = Math.floor(dateMinutes / 60);
    dateDays = (dateHours - (dateHours % 24)) / 24;
    dateDaysSinceFirstMonday = dateDays - 4;
    dateDaysSinceFirstBlitzRaid = dateDaysSinceFirstMonday;
    return dateDaysSinceFirstBlitzRaid % 14 == 0;
}


function generateBlitzWarDates(startDate, endDate) {
    var blitzWarEvents = [];
    var possibleDate = new Date(startDate);

    while (possibleDate >= startDate && possibleDate <= endDate) {
        if (!(possibleDate.getDay() == 1)) {
            possibleDate = addDays(possibleDate, 1);
            continue
        }
        if (isSetBlitzDate(possibleDate)) {
            blitzWarEvents.push({
                title: 'Set Blitz',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 1).setUTCHours(22, 0, 0)),
                color: "#bb3e03",
                borderColor: "#1F51FF",
                url: "../events/set_blitz"
            });
            possibleDate = addDays(possibleDate, 1);
        }
        if (isBlitzWarDate(possibleDate)) {
            blitzWarEvents.push({
                title: 'Blitz War',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 1).setUTCHours(22, 0, 0)),
                color: "#bb3e03",
                url: "../events/blitz_war"
            });
        }
        possibleDate = addDays(possibleDate, 1);
    }
    return blitzWarEvents
}

function isBlitzWarDate(date) {
    dateSeconds = date.getTime() / 1000;
    dateMinutes = dateSeconds / 60;
    dateHours = Math.floor(dateMinutes / 60);
    dateDays = (dateHours - (dateHours % 24)) / 24;
    dateDaysSinceFirstMonday = dateDays - 4;
    dateDaysSinceFirstBlitzWar = dateDaysSinceFirstMonday - 7;
    return dateDaysSinceFirstBlitzWar % 14 == 0;
}

function isSetBlitzDate(date) {
    if (!(isBlitzWarDate(date))) {
        return false
    }
    return date.getDate() < 14
}


function generateHeroicDates(startDate, endDate) {
    var heroicEvents = [];
    var possibleDate = new Date(startDate);

    while (possibleDate >= startDate && possibleDate <= endDate) {
        if (!(possibleDate.getDay() == 2)) {
            possibleDate = addDays(possibleDate, 1);
            continue
        }
        if (isHeroicDate(possibleDate)) {
            heroicEvents.push({
                title: 'Heroic',
                start: new Date(possibleDate.setUTCHours(19, 0, 0)),
                end: new Date(addDays(possibleDate, 7).setUTCHours(19, 0, 0)),
                color: "#e9c46a",
                url: "../events/heroic"
            });
        }
        possibleDate = addDays(possibleDate, 1);
    }
    return heroicEvents
}

function isHeroicDate(date) {
    dateSeconds = date.getTime() / 1000;
    dateMinutes = dateSeconds / 60;
    dateHours = Math.floor(dateMinutes / 60);
    dateDays = (dateHours - (dateHours % 24)) / 24;
    dateDaysSinceFirstTuesday = dateDays - 5;
    dateDaysSinceFirstHeroic = dateDaysSinceFirstTuesday;
    return dateDaysSinceFirstHeroic % 14 == 0;
}


function addDays(date, days) {
  var newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function dateToElementMonth(date) {
    const month = date.getMonth();
    const year = date.getYear();

    const monthNum = (((year*12+month)-1)%5)+1

    switch (monthNum) {
        case 1:
            return { name: 'Fire', color: 'red' };
        case 2:
            return { name: 'Spirit', color: 'purple' };
        case 3:
            return { name: 'Earth', color: 'brown' };
        case 4:
            return { name: 'Air', color: 'grey' };
        case 5:
            return { name: 'Water', color: 'blue' };
        default:
            return { name: 'Unknown', color: 'black' }; // Default case for unknown numbers
    }
}