import { useEffect, useState } from "react";
import sunImage from '../assets/sun.jpg';
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/mine/${user.id}`,
      );

      const data = await response.json();
      setAppointments(data.upcoming);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const cancelAppointment = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/appointments/${selectedAppointment.id}`,
        {
          method: "DELETE",
        },
      );

      setSelectedAppointment(null);
      loadAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h2>My Appointments</h2>
      </div>

      <div className="appointments-content">
        <div className="tabs">
          <button className="active-tab">Upcoming</button>
          <button>Past</button>
        </div>

        {appointments.length === 0 && (
          <div className="empty-appointments">
            <img src={sunImage} alt="No appointments" className="empty-image" />
            <h3>No upcoming appointments yet</h3>
          </div>
        )}

        {appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h3>{appointment.dentist_name}</h3>
            <p>{appointment.appointment_date}</p>
            <p>{appointment.appointment_time}</p>
            <p>{appointment.appointment_type}</p>

            <button
              className="cancel-button"
              onClick={() => setSelectedAppointment(appointment)}
            >
              Cancel appointment
            </button>
          </div>
        ))}
        {selectedAppointment && (
          <div className="modal-background">
            <div className="cancel-modal">
              <h3>Cancel appointment?</h3>

              <p>{selectedAppointment.dentist_name}</p>
              <p>{selectedAppointment.appointment_date}</p>
              <p>{selectedAppointment.appointment_time}</p>
              <p>{selectedAppointment.appointment_type}</p>

              <div className="modal-buttons">
                <button onClick={() => setSelectedAppointment(null)}>
                  Keep
                </button>

                <button onClick={cancelAppointment}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
