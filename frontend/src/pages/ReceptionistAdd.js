import { useState } from "react";
import "./ReceptionistAdd.css";

function ReceptionistAdd({ closeAdd, refreshAppointments }) {
  const [patient, setPatient] = useState("");
  const [dentist, setDentist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [times, setTimes] = useState([]);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

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

  const createAppointment = async () => {
    const appointment = {
      patient_id: patient,
      dentist_id: dentist,
      appointment_date: date,
      appointment_time: time,
      appointment_type: type,
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

      if (response.ok) {
        refreshAppointments();
        closeAdd();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="receptionist-add-page">
      <div className="add-header">
        <button className="close-button" onClick={closeAdd}>
          ×
        </button>
        <h2>Add Appointment</h2>
      </div>

      <div className="receptionist-add-content">
        <h3>Select patient</h3>

        <select value={patient} onChange={(e) => setPatient(e.target.value)}>
          <option value="">Select patient</option>
          <option value="9">Kevin Shin</option>
          <option value="10">Jonathan Yong Kim</option>
        </select>

        <h3>Select dentist</h3>

        <div className="add-dentists">
          <button
            className="add-lee"
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
            className="add-kaur"
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

        <p className="booking-month">February 2026</p>

        {!dentist && (
          <p className="date-message">
            Select a dentist to view available dates.
          </p>
        )}

        {dentist && (
          <>

        <div className="add-dates">
          <button onClick={() => selectDate("2026-02-16")}>
            <span>Mon</span>
            <strong>16</strong>
          </button>

          <button onClick={() => selectDate("2026-02-17")}>
            <span>Tue</span>
            <strong>17</strong>
          </button>

          <button onClick={() => selectDate("2026-02-18")}>
            <span>Wed</span>
            <strong>18</strong>
          </button>

          <button onClick={() => selectDate("2026-02-19")}>
            <span>Thu</span>
            <strong>19</strong>
          </button>

          <button onClick={() => selectDate("2026-02-20")}>
            <span>Fri</span>
            <strong>20</strong>
          </button>

          <button onClick={() => selectDate("2026-02-21")}>
            <span>Sat</span>
            <strong>21</strong>
          </button>

          <button onClick={() => selectDate("2026-02-22")}>
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

        <div className="add-times">
          {times.map((item) => (
            <button key={item} onClick={() => setTime(item)}>
              {item}
            </button>
          ))}
        </div>

        <h3>Reason for appointment</h3>

        <select value={type} onChange={(e) => setType(e.target.value)}>
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

        <button className="create-button" onClick={createAppointment}>
          Create appointment
        </button>
      </div>
    </div>
  );
}

export default ReceptionistAdd;
