import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const days = [
    { date: "2026-02-20", label: "20" },
    { date: "2026-02-21", label: "21" },
    { date: "2026-02-22", label: "22" },
    { date: "2026-02-23", label: "23" },
    { date: "2026-02-24", label: "24" },
    { date: "2026-02-25", label: "25" },
    { date: "2026-02-26", label: "26" },
  ];

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
  ];

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
      </div>

      <div className="dashboard-layout">
        <div className="sidebar">
          <h3>February</h3>

          <button className="lee-button">Dr. Lee</button>
          <button className="kaur-button">Dr. Kaur</button>

          <button className="add-button">+ Add New</button>

          <button className="logout-button">Logout</button>
        </div>

        <div className="calendar">
          <div className="calendar-row">
            <div className="time-cell"></div>

            {days.map((day) => (
              <div className="day-header" key={day.date}>
                {day.label}
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
                    item.appointment_time.slice(0, 5) === time,
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
      </div>
    </div>
  );
}

export default Dashboard;
