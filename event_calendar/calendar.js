document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(
        calendarEl,
        {
            height: 'parent',
            timeZone: 'UTC',
            themeSystem: 'bootstrap5',
            headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        multiMonthMaxColumns: 2,
        timeZone: "local",
        weekNumbers: true,
        dayMaxEvents: true,
        events: function (fetchInfo, successCallback, failureCallback) {
            var generatedEvents = generateEvents(fetchInfo.start, fetchInfo.end);
            successCallback(generatedEvents);
        },
        dayCellDidMount: function (event) {
            var elementMonth = ((((event.date.getYear()*12+event.date.getMonth()))%5)+1)
            var monthClass = 'knd-event-month-' + elementMonth;
            event.el.classList.add(monthClass)
        },
    });
    calendar.render();
});

// month calc - (((year*12+month)-1))%5)+1)
// fire, spirit, earth, air, water
// 1   , 2     , 3    , 4  , 5

function generateEvents(startDate, endDate) {
    var events = [];

    // Raid: every other friday starting at 19:00 UTC, goes for 51 hours
    var raidEvents = generateRaidDates(startDate, endDate);
    for (const event in raidEvents) {
        events.push(raidEvents[event]);
    }

    // War: every non-raid friday starting at 19:00 UTC, goes for 51 hours
    var warEvents = generateWarDates(startDate, endDate);
    for (const event in warEvents) {
        events.push(warEvents[event]);
    }

    // BRaid: Every monday after a War, starting at 19:00 UTC, goes for 27 hours
    var blitzRaidEvents = generateBlitzRaidDates(startDate, endDate);
    for (const event in blitzRaidEvents) {
        events.push(blitzRaidEvents[event]);
    }

    // BWar: Every monday after a Raid, starting at 19:00 UTC, goes for 27 hours
    var blitzWarEvents = generateBlitzWarDates(startDate, endDate);
    for (const event in blitzWarEvents) {
        events.push(blitzWarEvents[event]);
    }

    // Heroic: Every Tuesday after a Raid, starting at 19:00 UTC, goes for 96 hours
    var heroicEvents = generateHeroicDates(startDate, endDate);
    for (const event in heroicEvents) {
        events.push(heroicEvents[event]);
    }

    return events;
}

function generateElementMonths(startDate, endDate) {
    const raidEvents = [];
    console.log(startDate, endDate)
//    if (startDate.getMonth() == endDate.getMonth() && startDate.getYear() == endDate.getYear()) {
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
        console.log(raidEvents);
        return raidEvents;
//    }
}

function generateRaidDates(startDate, endDate) {
    let raidDate = new Date("2024-01-12");

    const raidEvents = [];

    // Move into the correct date range
    while (raidDate > startDate) {
        raidDate.setDate(raidDate.getDate() - 14);
    }
    while (raidDate < startDate) {
        raidDate.setDate(raidDate.getDate() + 14);
    }

    // Loop to generate every other Friday within the date range
    while (raidDate >= startDate && raidDate <= endDate) {
        raidEvents.push({
            title: 'Raid',
            start: new Date(raidDate.setUTCHours(19, 0, 0)),
            end: new Date(addDays(raidDate, 2).setUTCHours(22, 0, 0)),
            color: "#001219",
            url: "../events/raid"
        });
        raidDate.setDate(raidDate.getDate() + 14);
    }

    return raidEvents;
}

function generateWarDates(startDate, endDate) {
    let warDate = new Date("2024-01-05");

    const warEvents = [];

    // Move into the correct date range
    while (warDate > startDate) {
        warDate.setDate(warDate.getDate() - 14);
    }
    while (warDate < startDate) {
        warDate.setDate(warDate.getDate() + 14);
    }

    // Loop to generate every other Friday within the date range
    while (warDate >= startDate && warDate <= endDate) {
        warEvents.push({
            title: 'War',
            start: new Date(warDate.setUTCHours(19, 0, 0)),
            end: new Date(addDays(warDate, 2).setUTCHours(22, 0, 0)),
            color: "#9b2226",
            url: "../events/war"
        });
        warDate.setDate(warDate.getDate() + 14);
    }

    return warEvents;
}

function generateBlitzRaidDates(startDate, endDate) {
    let blitzRaidDate = new Date("2024-01-08");

    const blitzRaidEvents = [];

    // Move into the correct date range
    while (blitzRaidDate > startDate) {
        blitzRaidDate.setDate(blitzRaidDate.getDate() - 14);
    }
    while (blitzRaidDate < startDate) {
        blitzRaidDate.setDate(blitzRaidDate.getDate() + 14);
    }

    // Loop to generate every other Friday within the date range
    while (blitzRaidDate >= startDate && blitzRaidDate <= endDate) {
        blitzRaidEvents.push({
            title: 'Blitz Raid',
            start: new Date(blitzRaidDate.setUTCHours(19, 0, 0)),
            end: new Date(addDays(blitzRaidDate, 1).setUTCHours(22, 0, 0)),
            color: "#0a9396",
            url: "../events/blitz_raid"
        });
        blitzRaidDate.setDate(blitzRaidDate.getDate() + 14);
    }

    return blitzRaidEvents;
}


function generateBlitzWarDates(startDate, endDate) {
    let blitzWarDate = new Date("2024-01-15");

    const blitzWarEvents = [];

    // Move into the correct date range
    while (blitzWarDate > startDate) {
        blitzWarDate.setDate(blitzWarDate.getDate() - 14);
    }
    while (blitzWarDate < startDate) {
        blitzWarDate.setDate(blitzWarDate.getDate() + 14);
    }

    // Loop to generate every other Friday within the date range
    while (blitzWarDate >= startDate && blitzWarDate <= endDate) {
        blitzWarEvents.push({
            title: 'Blitz War',
            start: new Date(blitzWarDate.setUTCHours(19, 0, 0)),
            end: new Date(addDays(blitzWarDate, 1).setUTCHours(22, 0, 0)),
            color: "#bb3e03",
            url: "../events/blitz_war"
        });
        blitzWarDate.setDate(blitzWarDate.getDate() + 14);
    }

    return blitzWarEvents;
}

function generateHeroicDates(startDate, endDate) {
    let heroicDate = new Date("2024-01-9");

    const heroicEvents = [];

    // Move into the correct date range
    while (heroicDate > startDate) {
        heroicDate.setDate(heroicDate.getDate() - 14);
    }
    while (heroicDate < startDate) {
        heroicDate.setDate(heroicDate.getDate() + 14);
    }

    // Loop to generate every other Friday within the date range
    while (heroicDate >= startDate && heroicDate <= endDate) {
        heroicEvents.push({
            title: 'Heroic',
            start: new Date(heroicDate.setUTCHours(19, 0, 0)),
            end: new Date(addDays(heroicDate, 7).setUTCHours(19, 0, 0)),
            color: "#e9c46a",
            url: "../events/heroic"
        });
        heroicDate.setDate(heroicDate.getDate() + 14);
    }

    return heroicEvents;
}

function addDays(date, days) {
  var newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
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