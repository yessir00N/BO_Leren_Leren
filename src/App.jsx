import './index.css';
import { useState } from 'react';


function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const prevMonthDays = daysInMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentYear);

    // Leading empty days for the first row
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="empty" key={`empty-${i}`}>{prevMonthDays - firstDayOfMonth + i + 1}</div>);
    }

    // Actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div className="day" key={i}>
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={previousMonth}>Vorige</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button onClick={nextMonth}>Volgende</button>
      </div>
      <div className="weekdays">
        {['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'].map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
}

export default Calendar;
