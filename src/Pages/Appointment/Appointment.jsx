import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getAppointments,
  deleteAppointments,
  createAppointments,
  updateAppointmentsAPI,
} from "../../API/appointment";
import "./Appointment.css";
import { getAnimals } from "../../API/animal";
import { getDoctors } from "../../API/doctor";
import { filterByDateAndAnimal } from "../../API/appointment";
import { filterByDateAndDoctor } from "../../API/appointment";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [initialAppointmentList, setInitialAppointmentList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    animalId: "",
    doctorId: "",
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentId: "",
    appointmentDate: "",
    animalId: "",
    doctorId: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getAppointments().then((response) => {
      setAppointment(response.data.items);
      setInitialAppointmentList(response.data.items);
    });
    getAnimals().then((response) => {
      setAnimal(response.data.items);
    });
    getDoctors().then((response) => {
      setDoctor(response.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAppointments(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleAnimalSearch = () => {
    filterByDateAndAnimal(startDate.split("T")[0], endDate.split("T")[0], getAnimalId(animalName))
    .then((response) => {
      console.log(response.data);
      setAppointment(response.data);
    });
    
  };
  const handleDoctorSearch = () => {
    filterByDateAndDoctor(startDate.split("T")[0], endDate.split("T")[0], getDoctorId(doctorName))
    .then((response) => {
      console.log(response.data);
      setAppointment(response.data);
    });
  };

  const handleUpdateBtn = (app) => {
    setUpdateAppointment({
      appointmentId: app.appointmentId,
      appointmentDate: app.appointmentDate,
      animalId: app.animalId,
      doctorId: app.doctorId,
    });
  };

  const handleNewAppointment = (event) => {
    if (event.target.name === "animalId") {
      setNewAppointment({
        ...newAppointment,
        animalId :event.target.value,
       
      });
    } else if (event.target.name === "doctorId") {
      setNewAppointment({
        ...newAppointment,
        doctorId: event.target.value,
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAppointments(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          animalId: "",
          doctorId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "animalId") {
      setUpdateAppointment({
        ...updateAppointment,
        animalId:event.target.value,
      });
    } else if (event.target.name === "doctorId") {
      setUpdateAppointment({
        ...updateAppointment,
        doctorId: event.target.value,
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAppointmentsAPI(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentId: "",
          appointmentDate: "",
          animalId: "",
          doctorId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setAppointment(initialAppointmentList);
    setAnimalName("");
    setDoctorName("");
    setStartDate("");
    setEndDate("");
  };

  const handleOperationError = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  const getAnimalName = (animalId) => {
    let animalName = animal.find((animal) => animal.animalId === animalId);
    return animalName ? animalName.name : 'Unknown Animal'; // Eğer animalName undefined ise 'Unknown Animal' döndür
  }

  const getDoctorName = (doctorId) => {
    let doctorName = doctor.find((doctor) => doctor.doctorId === doctorId);
    return doctorName ? doctorName.name : 'Unknown Doctor'; // Eğer doctorName undefined ise 'Unknown Doctor' döndür
}


  const getAnimalId = (animalName) => {
    let animalId = animal.find((animal) => animal.name === animalName);
    return animalId ? animalId.animalId : 'Unknown Animal'; // Eğer animalId undefined ise 'Unknown Animal' döndür
  }

  const getDoctorId = (doctorName) => {
    let doctorId = doctor.find((doctor) => doctor.name === doctorName);
    return doctorId ? doctorId.doctorId : 'Unknown Doctor'; // Eğer doctorId undefined ise 'Unknown Doctor' döndür
  }

  
  return (
    <div>
      <div className="appointment-search">
        <div className="show-all-button">
          <button onClick={handleShowAll}>Tümünü Göster</button>
          <h1>Randevu</h1>
        </div>
        <div className="appsearch-container">
          <input
            type="text"
            placeholder="Hayvan Ara..."
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            className="animal-appointment"
          />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleAnimalSearch} className="search-button">
            Filtrele
          </button>
        </div>
      </div>
      <div className="app-search">
        <h2>Randevu Listesi</h2>
        <div className="appsearch-container">
          <input
            type="text"
            placeholder="Doktor Ara..."
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="doctor-appointment"
          />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleDoctorSearch} className="search-button">
            Filtrele
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Randevu Zamanı</th>
              <th>Hayvan</th>
              <th>Hayvan ID</th>
              <th>Doktor</th>
              <th>Doktor ID</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {appointment.map((appointments) => (
              <tr key={appointments.appointmentId}>
                <td>{appointments.appointmentDate}</td>
                <td>{getAnimalName(appointments.animalId)}</td>
                <td>{appointments.animalId}</td>
                <td>{getDoctorName(appointments.doctorId)}</td>
                <td>{appointments.doctorId}</td>
                <td>
                  <div className="icon-container">
                    <DeleteIcon
                      onClick={() => handleDelete(appointments.appointmentId)}
                      style={{ color: "#3aa6b9", marginRight: "8px" }}
                    />
                    <UpdateIcon
                      onClick={() => handleUpdateBtn(appointments)}
                      style={{ color: "#3aa6b9" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addappointment">
          <h2>Randevu Ekleme</h2>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={newAppointment.appointmentDate}
            onChange={handleNewAppointment}
          />
          <select
            value={newAppointment.animalId}
            name="animalId"
            onChange={handleNewAppointment}
          >
            <option value="" disabled={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return <option key={animals.animalId} value={animals.animalId}>{animals.name}</option>;
            })}
          </select>
          <select
            value={newAppointment.doctorId}
            name="doctorId"
            onChange={handleNewAppointment}
          >
            <option value="" disabled={true}>
              Doktor Seçiniz
            </option>
            {doctor.map((doctors) => {
              return <option key={doctors.doctorId} value={doctors.doctorId}>{doctors.name}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updateappointment">
          <h2>Randevu Güncelleme</h2>
          <input
            type="datetime-local"
            name="appointmentDate"
            onChange={handleUpdateChange}
            value={updateAppointment.appointmentDate}
          />
          <select
            value={updateAppointment.animalId}
            name="animalId"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return <option key={animals.animalId} value={animals.animalId}>{animals.name}</option>;
            })}
          </select>
          <select
            value={updateAppointment.doctorId}
            name="doctorId"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true}>
              Doktor Seçiniz
            </option>
            {doctor.map((doctors) => {
              return <option key={doctors.doctorId} value={doctors.doctorId}>{doctors.name}</option>;
            })}
          </select>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
      <Modal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        title="Error"
      >
        <p>{error}</p>
      </Modal>
    </div>
  );
}

export default Appointment;
