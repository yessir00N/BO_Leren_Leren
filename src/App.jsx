import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [agenda, setAgenda] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newAgendaItem, setNewAgendaItem] = useState("");
  const [isEnglish, setIsEnglish] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoroPaused, setIsPomodoroPaused] = useState(false);

  const audioRef = useRef(null);

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

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePomodoroClick = () => {
    if (isPomodoroActive) {
      setIsPomodoroActive(false);
      setPomodoroTime(25 * 60);
      setIsPomodoroPaused(false);
    } else {
      setIsPomodoroActive(true);
    }
  };

  useEffect(() => {
    let interval;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      if (!isPomodoroPaused) {
        setPomodoroTime(5 * 60); // 5 minutes for pause
        setIsPomodoroPaused(true);
      } else {
        setPomodoroTime(25 * 60);
        setIsPomodoroActive(false);
        setIsPomodoroPaused(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroTime, isPomodoroPaused]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="empty" key={`empty-${i}`}></div>);
    }

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

      <div className="search-section">
        <input type="text" placeholder="Zoeken" className="search-bar" />
        <button className="search-button">🔍</button>
      </div>

      <div className="buttons-section">
        <button>Nieuw</button>
        <button>Trending/ populair</button>
        <button>Pasgebruik</button>
        <button>Favorieten</button>
        <button>Voor jou</button>
        <button
          onClick={handleMusicToggle}
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: isPlaying ? "#d9534f" : "#A35C7A",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          🎵
        </button>
        <button
          onClick={handlePomodoroClick}
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: isPomodoroActive ? "#d9534f" : "#A35C7A",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          ⏰
        </button>
        {isPomodoroActive && (
          <div
            style={{
              marginLeft: "10px",
              padding: "10px",
              backgroundColor: "#A35C7A",
              borderRadius: "5px",
              fontSize: "18px",
              color: "white",
              animation: "popOut 0.3s ease",
            }}
          >
            {isPomodoroPaused ? "Pauze: " : "Timer: "}
            {formatTime(pomodoroTime)}
          </div>
        )}
      </div>

      <div className="quote-section">
        <div className="quote-header">
          <h3>Quote van de dag</h3>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "white",
            }}
          >
            🚩
          </button>
        </div>
        <p>
          {isEnglish
            ? "Great spirits have always encountered violent opposition from mediocre minds."
            : "Grote geesten hebben altijd hevige tegenstand ondervonden van middelmatige geesten."}
        </p>
        <p>- Albert Einstein -</p>
      </div>

      {selectedDate && (
        <>
          <div className="agenda-popup-overlay" onClick={() => setSelectedDate(null)}></div>
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
        </>
      )}

      <audio ref={audioRef} src="src/music/jazz-lounge-138115.mp3"></audio>
    </div>
  );
}

export default App;
