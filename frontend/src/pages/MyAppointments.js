import "./MyAppointments.css";

function MyAppointments() {
    return (
    <div className="appointments-page">
        <div className="appointments-header">
        <h2>My Appointments</h2>
        </div>

    <div className="appointments-content">
        <div className="tabs">
            <button>Upcoming</button>
            <button>Past</button>
        </div>

        <div className="appointment-card">
            <h3>Dr. Lee</h3>
            <p>24 February 2026</p>
            <p>09:00</p>
            <p>Emergency</p>

            <button className="cancel-button">Cancel appointment</button>
        </div>
        </div>
    </div>
    );
}

export default MyAppointments;
