import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './emploi_stagiaire.css'

function Emploi_stagiaire() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formateurName, setFormateurName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schedule, setSchedule] = useState({
    Lundi: {},
    Mardi: {},
    Mercredi: {},
    Jeudi: {},
    Vendredi: {},
    Samedi: {}
  });

  const handleOpenModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormateurName('');
    setSessionName('');
    setStartTime('');
    setEndTime('');
  };

  const handleAddSession = () => {
    if (!startTime || !endTime || startTime >= endTime) {
      alert('Please select a valid start and end time.');
      return;
    }

    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [startTime]: { formateurName, sessionName, endTime }
      }
    }));
    handleCloseModal();
  };

  const renderTableCell = (day, time) => {
    const session = schedule[day][time];
    return session ? (
      <td colSpan={calculateSpan(time, session.endTime)} className="session-cell">
        <strong>{session.sessionName}</strong> <br />
        {session.formateurName} <br />
        {time} - {session.endTime}
      </td>
    ) : (
      <td></td>
    );
  };
  

  const calculateSpan = (start, end) => {
    const startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);
    return endHour - startHour;
  };
  

  return (
    <div>
      <div className="table-responsive">
        <h2>Emploi du Temps</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                <img
                  src="https://img.icons8.com/?size=100&id=82767&format=png&color=000000"
                  alt="Time"
                />
              </th>
              <th>08:30-09:30</th>
              <th>09:30-10:30</th>
              <th>10:30-11:30</th>
              <th>11:30-12:30</th>
              <th>12:30-13:30</th>
              <th>13:30-14:30</th>
              <th>14:30-15:30</th>
              <th>15:30-16:30</th>
              <th>16:30-17:30</th>
              <th>17:30-18:30</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(schedule).map((day) => (
              <tr key={day} onClick={() => handleOpenModal(day)}>
                <td>{day}</td>
                {['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'].map(
                  (time) => renderTableCell(day, time)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Session for {selectedDay}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Formateur Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formateurName}
                    onChange={(e) => setFormateurName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Session Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  <select
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    <option value="">Select Start Time</option>
                    <option value="08:30">08:30</option>
                    <option value="09:30">09:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    <option value="13:30">13:30</option>
                    <option value="14:30">14:30</option>
                    <option value="15:30">15:30</option>
                    <option value="16:30">16:30</option>
                    <option value="14:30">17:30</option>
                    <option value="15:30">18:30</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <select
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    <option value="">Select End Time</option>
                    <option value="09:30">09:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    <option value="13:30">13:30</option>
                    <option value="14:30">14:30</option>
                    <option value="15:30">15:30</option>
                    <option value="16:30">16:30</option>
                    <option value="17:30">17:30</option>
                    <option value="17:30">18:30</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddSession}>
                  Save Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emploi_stagiaire;
