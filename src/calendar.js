import React from "react";
import "datejs";
import { useState, useEffect } from "react";
import "./App.css";

function Calendar() {
  //creating states for seting the month selector so you can go in the future and past
  const [monthView, setMonthView] = useState();

  //get curent month as a number 0-11
  function getCurrentMonth() {
    const CurrentMonth = Date.today().getMonth();
    return CurrentMonth;
  }

  //using state to set the main view starting on current month
  const TheCurrentMonth = getCurrentMonth();
  useEffect(() => {
    setMonthView(TheCurrentMonth);
  }, []);

  const todayDate = Date.today();
  const firstDayOfSetMonth = new Date(todayDate.getFullYear(), monthView);

  //next and last month
  const nextSetMonth = new Date(firstDayOfSetMonth);
  nextSetMonth.addMonths(1);
  const lastSetMonth = new Date(firstDayOfSetMonth);
  lastSetMonth.addMonths(-1);

  //find the days from last month to fill the start of the calendar this month
  var allLastSetMonth = [];
  for (var i = 1; i <= lastSetMonth.getDaysInMonth(); i++) {
    allLastSetMonth.push(i);
  }
  // building array to show the a few of the last days from the last month
  var showLastDaysOfLastSetMonth = [];
  allLastSetMonth.reverse();
  
  
  //get the type of day the set month is (i.e. monday === 0, sunday === 6)
  const weekDayOfSetMonth = firstDayOfSetMonth.getDay();

  for (i = 0; i < weekDayOfSetMonth; i++) {
    showLastDaysOfLastSetMonth.push(allLastSetMonth[i]);
  }
  showLastDaysOfLastSetMonth.reverse();

  //showing days in curent month
  //find how many days in current month
  var daysInMonthSet = firstDayOfSetMonth.getDaysInMonth();
  
  var monthArray = [];
  for (var i = 1; i <= daysInMonthSet; i++) {
    monthArray.push(i);
  }

  //adding next months days
  let nextMonthDays = [];
  var preAndCurrentDays = showLastDaysOfLastSetMonth.length + monthArray.length;
  const totalDaysOnCal = 42;
  const daysOfNextMonth = totalDaysOnCal-preAndCurrentDays;
  let x = 1;
  while (x<=daysOfNextMonth) {
    nextMonthDays.push(x);
    x++;
  }
  

  //turning numbers into months
  var nextMonthSpelled = new Date(0, monthView + 1).toLocaleString("en-US", {
    month: "long",
  });
  var currentMonthSpelled = new Date(0, monthView).toLocaleString("en-US", {
    month: "long",
  });
  var previousMonthSpelled = new Date(0, monthView - 1).toLocaleString(
    "en-US",
    { month: "long" }
  );

  //const formattedDate = todayDate.toLocaleDateString();

  //returns an array of Dates given how many days and the first day of the month
  const datesOfMonth = (daylist, firstDayOfgivenMonth) => (
    daylist.map((day) =>
          new Date(firstDayOfgivenMonth.getFullYear(),firstDayOfgivenMonth.getMonth(), day
          )
      )
  );
  
  const currentDates = datesOfMonth(monthArray, firstDayOfSetMonth);
  const DaysOfLastSetMonth = datesOfMonth(showLastDaysOfLastSetMonth, lastSetMonth);
  const DatesOfNextSetMonth = datesOfMonth(nextMonthDays, nextSetMonth);
  // console.log(DaysOfLastSetMonth, currentDates, DatesOfNextSetMonth);
  // console.log(nextSetMonth);
  //nextMonthDays.map((day, index) => (
  //  console.log(DatesOfNextSetMonth[index], day)
    
  
  return (
    <div className="Calendar">
      <div className="selector">
        <div>{currentMonthSpelled}</div>
        <button
          className="nextMonth"
          onClick={() => setMonthView(monthView + 1)}
        >
          {nextMonthSpelled}
        </button>
        <button
          className="lastMonth"
          onClick={() => setMonthView(monthView - 1)}
        >
          {previousMonthSpelled}
        </button>
      </div>

      <div className="Calendar-grid">
            
            {showLastDaysOfLastSetMonth.map((day, index) => (
            <div className={DaysOfLastSetMonth[index]} key={DaysOfLastSetMonth[index]}>{day}</div>
            ))}

            {monthArray.map((day, index) => (
            <div className={currentDates[index]} key={currentDates[index]}>{day}</div>
            ))}

            {nextMonthDays.map((day, index) => (
            <div className={DatesOfNextSetMonth[index]} key={DatesOfNextSetMonth[index]}>{day}</div>
            ))}


      </div>

      <br />
    </div>
  );
}

export default Calendar;
