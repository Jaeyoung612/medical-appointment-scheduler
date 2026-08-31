import "./BookingSuccess.css";

function BookingSuccess({ setPage }) {
    return (
    <div className="success-page">
        <div className="success-box">
        <div className="check-icon">✓</div>

        <h2>Appointment confirmed!</h2>

        <button 
        className="appointments-button"
        onClick={() => setPage('appointments')}
        >View my Appointments
        </button>

        </div>
    </div>
    );
}

export default BookingSuccess;
