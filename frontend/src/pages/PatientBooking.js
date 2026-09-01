import { useState } from "react";
import "./PatientBooking.css";

function PatientBooking({ setPage }) {
  const [dentist, setDentist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const [times, setTimes] = useState([]);

  const loadTimes = async (dentistId, selectedDate) => {
    const response = await fetch(
      `http://localhost:5000/api/dentists/${dentistId}/slots?date=${selectedDate}`,
    );

    const data = await response.json();
    setTimes(data);
  };

  const selectDate = (selectedDate) => {
    setDate(selectedDate);
    setTime("");
    loadTimes(dentist, selectedDate);
  };

  const bookAppointment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const appointment = {
      patient_id: user.id,
      dentist_id: dentist,
      appointment_date: date,
      appointment_time: time,
      appointment_type: reason,
      reason: notes,
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
      setPage("success");
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
            className={`dentist-lee ${dentist === "1" ? "selected" : ""}`}
            onClick={() => {
              setDentist("1");
              setDate("");
              setTime("");
              setTimes([]);
            }}
          >
            Dr. Lee
          </button>

          <button
            className={`dentist-kaur ${dentist === "2" ? "selected" : ""}`}
            onClick={() => {
              setDentist("2");
              setDate("");
              setTime("");
              setTimes([]);
            }}
          >
            Dr. Kaur
          </button>
        </div>

        <h3>Select date</h3>

        {!dentist && (
          <p className="date-message">
            Select a dentist to view available dates.
          </p>
        )}
        {dentist && (
          <>
            <p className="booking-month">February 2026</p>

            <div className="date-grid">
              <button 
              className={date === "2026-02-16" ? "selected" : ""}
              onClick={() => selectDate("2026-02-16")}
              >
                <span>Mon</span>
                <strong>16</strong>
              </button>

              <button 
              className={date === "2026-02-17" ? "selected" : ""}
              onClick={() => selectDate("2026-02-17")}
              >
                <span>Tue</span>
                <strong>17</strong>
              </button>

              <button 
              className={date === "2026-02-18" ? "selected" : ""}
              onClick={() => selectDate("2026-02-18")}
              >
                <span>Wed</span>
                <strong>18</strong>
              </button>

              <button 
              className={date === "2026-02-19" ? "selected" : ""}
              onClick={() => selectDate("2026-02-19")}
              >
                <span>Thu</span>
                <strong>19</strong>
              </button>

              <button 
              className={date === "2026-02-20" ? "selected" : ""}
              onClick={() => selectDate("2026-02-20")}
              >
                <span>Fri</span>
                <strong>20</strong>
              </button>

              <button 
              className={date === "2026-02-21" ? "selected" : ""}
              onClick={() => selectDate("2026-02-21")}
              >
                <span>Sat</span>
                <strong>21</strong>
              </button>

              <button 
              className={date === "2026-02-22" ? "selected" : ""}
              onClick={() => selectDate("2026-02-22")}
              >
                <span>Sun</span>
                <strong>22</strong>
              </button>
            </div>
          </>
        )}

        <h3>Select time</h3>

        {!date && (
          <p className="time-message">Select a date to view available times.</p>
        )}

        <div className="time-grid">
          {times.map((item) => (
            <button key={item} 
            className={time === item ? "selected" : ""}
            onClick={() => setTime(item)}>
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
