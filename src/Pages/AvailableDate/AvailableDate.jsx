import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getAvailableDates,
  deleteAvailableDates,
  createAvailableDates,
  updateAvailableDatesAPI,
} from "../../API/availabledate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDate, setAvailableDate] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctorId: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctorId: "",
    availableDateId: "",

  });

  const [error, setError] = useState(null); 
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getAvailableDates().then((response) => {
      setAvailableDate(response.data.items);
    });
    getDoctors().then((response) => {
      setDoctor(response.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAvailableDates(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "" && searchDate.trim() === "") {
      setSearchResults([]);
    } else {
      const results = availableDate.filter(
        (availableDates) =>
          getDoctorName(availableDates.doctorId)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) 
            && availableDates.availableDate.includes(searchDate)
      );
      setSearchResults(results);
    }
  };

  const handleUpdateBtn = (ava) => {
    setUpdateAvailableDate({
      availableDate: ava.availableDate,
      doctorId: ava.doctorId,
      availableDateId: ava.availableDateId,
    });
  };

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctorId") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctorId: event.target.value,
        
        
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAvailableDates(newAvailableDate)
      .then(() => {
        setReload(true);
        setNewAvailableDate({
          availableDate: "",
          doctorId: "",
        });
        
      })
      .catch((err) => handleOperationError(err.message));
      console.log(newAvailableDate);
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "doctorId") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctorId: event.target.value,
        
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAvailableDatesAPI(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          availableDate: "",
          doctorId:"0",
        });
      })
      .catch((err) => handleOperationError(err.message));
      console.log(updateAvailableDate);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleOperationError = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const getDoctorName = (doctorId) => {
  const doctorObj = doctor.find(doc => doc.doctorId === doctorId);
  return doctorObj ? doctorObj.name : "Bilinmiyor";
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return ( 
    <div>
      <div className="available-search">
        <h1>Uygun Günler Yönetimi</h1>
        <div className="avasearch-container">
          <input
            type="text"
            placeholder="Doktor Ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
          <button onClick={handleShowAll}>Tümünü Göster</button>

        </div>
      </div>
      <h2>Uygun Günler Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Uygun Günlerin Tarihi</th>
              <th>Doktor</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0
              ? searchResults.map((availableDates) => (
                  <tr key={availableDates.availableDateId}>
                    <td>{availableDates.availableDate}</td>
                    <td>{getDoctorName(availableDates.doctorId)}</td>
                    <td>
                      <div className="icon-container">
                        <DeleteIcon
                          onClick={() => handleDelete(availableDates.availableDateId)}
                          style={{ color: "#7469B6", marginRight: "8px" }}
                        />
                        <UpdateIcon
                          onClick={() => handleUpdateBtn(availableDates)}
                          style={{ color: "#7469B6" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              : availableDate.map((availableDates) => (
                
                  <tr key={availableDates.availableDateId}>
                  <td>{availableDates.availableDate}</td>
                  <td>{getDoctorName(availableDates.doctorId)}</td>
                    <td>
                      <div className="icon-container">
                        <DeleteIcon
                          onClick={() => handleDelete(availableDates.availableDateId)}
                          style={{ color: "#7469B6", marginRight: "8px" }}
                        />
                        <UpdateIcon
                          onClick={() => handleUpdateBtn(availableDates)}
                          style={{ color: "#7469B6" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addavailabledate">
          <h2>Uygun Gün Ekleme</h2>
          <input
            type="date"
            name="availableDate"
            value={newAvailableDate.availableDate}
            onChange={handleNewAvailableDate}
          />
          <select
            value={newAvailableDate.doctorId}
            name="doctorId"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true}>
              Doktor Seçiniz
            </option>
            {doctor.map((doctors) => {
              return <option key={doctors.doctorId} value={doctors.doctorId}>{doctors.name}</option>; })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updateavailabledate">
          <h2>Uygun Gün Güncelleme</h2>
          <input
            type="date"
            name="availableDate"
            onChange={handleUpdateChange}
            value={updateAvailableDate.availableDate}
          />
          <select
            value={updateAvailableDate.doctorId}
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
          <button onClick={handleUpdate}>Güncelle</button>
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

export default AvailableDate;
