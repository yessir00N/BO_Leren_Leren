import React, { useState } from "react";
import "./App.css";

function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [agenda, setAgenda] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAgendaItem, setNewAgendaItem] = useState("");

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setNewAgendaItem(agenda[`${currentYear}-${currentMonth}-${day}`] || "");
  };

  const handleAgendaSave = () => {
    setAgenda({
      ...agenda,
      [`${currentYear}-${currentMonth}-${selectedDate}`]: newAgendaItem,
    });
    setSelectedDate(null);
    setNewAgendaItem("");
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);

    // Empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="empty" key={`empty-${i}`}></div>);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const agendaItem = agenda[`${currentYear}-${currentMonth}-${day}`];
      days.push(
        <div
          key={day}
          className="day"
          onClick={() => handleDateClick(day)}
          style={{ backgroundColor: agendaItem ? "#ffefc2" : "" }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container">
      {/* Kalender Sectie */}
      <div className="calendar-section">
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={handlePreviousMonth}>{"<"}</button>
            <h4>
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </h4>
            <button onClick={handleNextMonth}>{">"}</button>
          </div>
          <div className="calendar-grid">
            {["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"].map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>
        </div>
      </div>

      {/* Zoekbalk Sectie */}
      <div className="search-section">
        <input type="text" placeholder="Zoeken" className="search-bar" />
        <button className="search-button">🔍</button>
      </div>

      {/* Knoppen Sectie */}
      <div className="buttons-section">
        <button>Nieuw</button>
        <button>Trending/ populair</button>
        <button>Pasgebruik</button>
        <button>Favorieten</button>
        <button>Voor jou</button>
      </div>

      {/* Quote Sectie */}
      <div className="quote-section">
        <h3>Quote van de dag</h3>
        <p>Grote geesten hebben altijd hevige tegenstand ondervonden van middelmatige geesten.</p>
        <p>- Albert Einstein -</p>
      </div>

      {/* Agenda-popup */}
      {selectedDate && (
        <div className="agenda-popup">
          <h4>
            Agenda voor: {selectedDate}{" "}
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}
          </h4>
          <textarea
            value={newAgendaItem}
            onChange={(e) => setNewAgendaItem(e.target.value)}
            placeholder="Voeg een agenda-item toe"
          ></textarea>
          <button onClick={handleAgendaSave}>Opslaan</button>
          <button onClick={() => setSelectedDate(null)}>Annuleren</button>
        </div>
      )}
    </div>
  );
}

export default App;