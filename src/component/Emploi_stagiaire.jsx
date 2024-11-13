import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './emploi_stagiaire.css';
import { useParams } from 'react-router-dom';

function Emploi_stagiaire() {
  const { filiere, groupe } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formateurName, setFormateurName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sale, setSale] = useState('');
  const [schedule, setSchedule] = useState({
    Lundi: {},
    Mardi: {},
    Mercredi: {},
    Jeudi: {},
    Vendredi: {},
    Samedi: {}
  });
  const [editingSession, setEditingSession] = useState(null);

  const handleOpenModal = (row, col) => {
    const session = schedule[row] && schedule[row][col];
    if (session) {
      setFormateurName(session.formateurName || '');
      setSessionName(session.sessionName || '');
      setStartTime(col);
      setEndTime(session.endTime || '');
      setSale(session.sale || '');  
      setEditingSession(session);
    } else {
      setFormateurName('');
      setSessionName('');
      setStartTime('');
      setEndTime('');
      setSale('');
      setEditingSession(null);
    }
    setSelectedDay(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormateurName('');
    setSessionName('');
    setStartTime('');
    setEndTime('');
    setSale('');
    setEditingSession(null);
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
        [startTime]: { formateurName, sessionName, endTime, sale }
      }
    }));
    handleCloseModal();
  };

  const handleEditSession = () => {
    if (!startTime || !endTime || startTime >= endTime) {
      alert('Please select a valid start and end time.');
      return;
    }

    setSchedule((prev) => {
      const updatedSchedule = { ...prev };
      updatedSchedule[selectedDay] = {
        ...updatedSchedule[selectedDay],
        [startTime]: { formateurName, sessionName, endTime, sale }
      };
      return updatedSchedule;
    });
    handleCloseModal();
  };

  const handleDeleteSession = () => {
    const updatedSchedule = { ...schedule };
    delete updatedSchedule[selectedDay][startTime]; 
    setSchedule(updatedSchedule);
    handleCloseModal();
  };

  const renderTableCell = (day, time) => {
    const session = schedule[day][time];
    return session ? (
      <td
        key={`${day}-${time}`}  
        colSpan={calculateSpan(time, session.endTime)}
        className="session-cell"
        onClick={() => handleOpenModal(day, time)} 
      >
        <strong>{session.sessionName}</strong> <br />
        {session.formateurName} <br />
        <p>{session.sale}</p> 
      </td>
    ) : (
      <td
        key={`${day}-${time}`} 
        onClick={() => handleOpenModal(day, time)}
      ></td>
    );
  };
  

  const cleanUpSchedule = () => {
    setSchedule((prevSchedule) => {
      const cleanedSchedule = { ...prevSchedule };
  
      Object.keys(cleanedSchedule).forEach((day) => {
        if (Object.keys(cleanedSchedule[day]).length === 0) {
          delete cleanedSchedule[day];
        }
      });
  
      return cleanedSchedule;
    });
  };

  const calculateSpan = (start, end) => {
    const startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);
    return endHour - startHour;
  };

  return (
    <div>
      <div className="table-responsive">
        <h2>Emploi du Temps</h2><br />
        <h2>2024/2025</h2>
        <h4><b>Filière:</b>{filiere} </h4>
        <h5><b>Groupe</b>{groupe}</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Day / Time</th>
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
              <tr key={day}>
                <td>{day}</td>
                {['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30'].map(
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
                <h5 className="modal-title">{editingSession ? `Modifier la Séance de ${selectedDay}` : `Ajouter une Séance Pour le ${selectedDay}`}</h5>
              </div>
              <div className="modal-body">

              <div className="form-group">
                  <label>Nom de la Seance</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Nom du Formateur</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formateurName}
                    onChange={(e) => setFormateurName(e.target.value)}
                  />
                </div>
              
                <div className="form-group">
                  <label>La Sale</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Heure de départ</label>
                  <select
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    <option value="" disabled>Sélectionnez L'Heure de Départ</option>
                    <option value="08:30">08:30</option>
                    <option value="09:30">09:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    <option value="13:30">13:30</option>
                    <option value="14:30">14:30</option>
                    <option value="15:30">15:30</option>
                    <option value="16:30">16:30</option>
                    <option value="17:30">17:30</option>
                    <option value="18:30">18:30</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Heure de Fin</label>
                  <select
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    <option value="">Sélectionnez L'Heure de Fin</option>
                    <option value="09:30">09:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    <option value="13:30">13:30</option>
                    <option value="14:30">14:30</option>
                    <option value="15:30">15:30</option>
                    <option value="16:30">16:30</option>
                    <option value="17:30">17:30</option>
                    <option value="18:30">18:30</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Fermer
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editingSession ? handleEditSession : handleAddSession}
                >
                  {editingSession ? 'Enregistrer' : 'Ajouter la Séance'}
                </button>
                {editingSession && (
                  <button type="button" className="btn btn-danger" onClick={handleDeleteSession}>
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emploi_stagiaire;
