import "./BookingSuccess.css";
import checkIcon from "../assets/check-square-fill.svg";

function BookingSuccess({ setPage }) {
    return (
    <div className="success-page">
        <div className="success-box">
        <img
        src={checkIcon}
        alt="Booking successful"
        className="success-icon"
        />

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
