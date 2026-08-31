import { useState } from "react";
import "./PatientBooking.css";

function PatientBooking({ setPage }) {
  const [dentist, setDentist] = useState("1");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const leeTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];

  const kaurTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];

  const times = dentist === "1" ? leeTimes : kaurTimes;

  const bookAppointment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const appointment = {
      patient_id: user.id,
      dentist_id: dentist,
      appointment_date: date,
      appointment_time: time,
      reason: reason,
      notes: notes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      const data = await response.json();
      console.log(data);
      setPage('success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h2>Book appointment</h2>
      </div>

      <div className="booking-content">
        <h3>Select dentist</h3>

        <div className="dentist-options">
          <button
            className="dentist-lee"
            onClick={() => {
              setDentist("1");
              setTime("");
            }}
          >
            Dr. Lee
          </button>

          <button
            className="dentist-kaur"
            onClick={() => {
              setDentist("2");
              setTime("");
            }}
          >
            Dr. Kaur
          </button>
        </div>

        <h3>Select date</h3>

        <div className="date-grid">
          <button onClick={() => setDate("2026-02-20")}>20</button>
          <button onClick={() => setDate("2026-02-21")}>21</button>
          <button onClick={() => setDate("2026-02-22")}>22</button>
          <button onClick={() => setDate("2026-02-23")}>23</button>
          <button onClick={() => setDate("2026-02-24")}>24</button>
          <button onClick={() => setDate("2026-02-25")}>25</button>
          <button onClick={() => setDate("2026-02-26")}>26</button>
        </div>

        <h3>Select time</h3>

        <div className="time-grid">
          {times.map((item) => (
            <button key={item} onClick={() => setTime(item)}>
              {item}
            </button>
          ))}
        </div>

        <h3>Reason for appointment</h3>

        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">Select reason</option>
          <option value="Check-up and clean">Check-up and clean</option>
          <option value="Emergency">Emergency</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="book-button" onClick={bookAppointment}>
          Book appointment
        </button>
      </div>
    </div>
  );
}

export default PatientBooking;
