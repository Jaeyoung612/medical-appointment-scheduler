import { useEffect, useState } from "react";
import "./Dashboard.css";
import ReceptionistAdd from "./ReceptionistAdd";

function Dashboard({ setPage }) {
  const [appointments, setAppointments] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [dentistFilter, setDentistFilter] = useState("all");

  const days = [
    { date: "2026-02-16", day: "Mon", label: "16" },
    { date: "2026-02-17", day: "Tue", label: "17" },
    { date: "2026-02-18", day: "Wed", label: "18" },
    { date: "2026-02-19", day: "Thu", label: "19" },
    { date: "2026-02-20", day: "Fri", label: "20" },
    { date: "2026-02-21", day: "Sat", label: "21" },
    { date: "2026-02-22", day: "Sun", label: "22" },
  ];

  const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  const loadAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Calendar</h2>
        <button className="add-button" onClick={() => setShowAdd(true)}>
          + Add New
        </button>
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <h3>February</h3>

          <button
            className={`filter-lee ${
              dentistFilter === "Dr. Lee" ? "selected" : ""
            }`}
            onClick={() => setDentistFilter("Dr. Lee")}
          >
            Dr. Lee
          </button>

          <button
            className={`filter-kaur ${
              dentistFilter === "Dr. Kaur" ? "selected" : ""
            }`}
            onClick={() => setDentistFilter("Dr. Kaur")}
          >
            Dr. Kaur
          </button>

          <button
            className={`filter-all ${
              dentistFilter === "all" ? "selected" : ""
            }`}
            onClick={() => setDentistFilter("all")}
          >
            All Dentists
          </button>
        </div>

        <div className="calendar">
          <div className="calendar-row">
            <div className="time-cell"></div>

            {days.map((day) => (
              <div className="day-header" key={day.date}>
                <span>{day.day}</span>
                <strong>{day.label}</strong>
              </div>
            ))}
          </div>

          {times.map((time) => (
            <div className="calendar-row" key={time}>
              <div className="time-cell">{time}</div>

              {days.map((day) => {
                const appointment = appointments.find(
                  (item) =>
                    item.appointment_date.slice(0, 10) === day.date &&
                    item.appointment_time.slice(0, 5) === time &&
                    (dentistFilter === "all" ||
                      item.dentist_name === dentistFilter),
                );

                return (
                  <div className="calendar-cell" key={day.date + time}>
                    {appointment && (
                      <div
                        className={
                          appointment.dentist_name === "Dr. Lee"
                            ? "appointment lee"
                            : "appointment kaur"
                        }
                      >
                        <strong>{appointment.dentist_name}</strong>
                        <p>{appointment.appointment_time.slice(0, 5)}</p>
                        <p>{appointment.appointment_type}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {showAdd && (
          <div className="add-panel">
            <ReceptionistAdd
              closeAdd={() => setShowAdd(false)}
              refreshAppointments={loadAppointments}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
