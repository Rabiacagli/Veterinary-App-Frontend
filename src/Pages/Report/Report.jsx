import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getReports,
  deleteReports,
  createReports,
  updateReportsAPI,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";

function Report() {
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);

  const [newReport, setNewReport] = useState({
    diagnosis: "",
    price: "",
    appointmentId: "",
  });
  const [updateReport, setUpdateReport] = useState({
    id: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getReports().then((response) => {
      setReport(response.data.items);
    });
    getAppointments().then((response) => {
      setAppointment(response.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteReports(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const results = report.filter((reports) =>
        reports.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleUpdateBtn = (rep) => {
    setUpdateReport({
      id: rep.id,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointmentId: rep.appointment.appointmentId,
    });
  };

  const handleNewReport = (event) => {
    if (event.target.name === "appointmentId") {
      setNewReport({
        ...newReport,
        appointmentId: event.target.value,
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createReports(newReport)
      .then(() => {
        setReload(true);
        setNewReport({
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "appointmentId") {
      setUpdateReport({
        ...updateReport,
        appointmentId: event.target.value,
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateReportsAPI(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          id: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleOperationError = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return (
    <div>
      <div className="report-search">
        <h1>Rapor Yönetimi</h1>
        <div className="repsearch-container">
          <input
            type="text"
            placeholder="Rapor tanısı arayın"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Filtrele
          </button>
          <button onClick={handleShowAll}>Tümünü Göster</button>
        </div>
      </div>
      <h2>Rapor Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Tanı</th>
              <th>Fiyat</th>
              <th>Randevu</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0
              ? searchResults.map((reports) => (
                  <tr key={reports.id}>
                    <td>{reports.diagnosis}</td>
                    <td>{reports.price}</td>
                    <td>{reports.appointment.appointmentDate}</td>
                    <td>
                      <div className="icon-container">
                        <DeleteIcon
                          onClick={() => handleDelete(reports.id)}
                          style={{ color: "#7469B6", marginRight: "8px" }}
                        />
                        <UpdateIcon
                          onClick={() => handleUpdateBtn(reports)}
                          style={{ color: "#7469B6" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              : report.map((reports) => (
                  <tr key={reports.id}>
                    <td>{reports.diagnosis}</td>
                    <td>{reports.price}</td>
                    <td>{reports.appointment.appointmentDate}</td>
                    <td>
                      <div className="icon-container">
                        <DeleteIcon
                          onClick={() => handleDelete(reports.id)}
                          style={{ color: "#3aa6b9", marginRight: "8px" }}
                        />
                        <UpdateIcon
                          onClick={() => handleUpdateBtn(reports)}
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
        <div className="addreport">
          <h2>Rapor Ekleme</h2>
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            value={newReport.diagnosis}
            onChange={handleNewReport}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Fiyat"
            name="price"
            value={newReport.price}
            onChange={handleNewReport}
          />
          <select
            value={newReport.appointmentId}
            name="appointmentId"
            onChange={handleNewReport}
          >
            <option value="" disabled={true}>
              Randevu Seçiniz
            </option>
            {appointment.map((appointments) => {
              return (
                <option
                  key={appointments.appointmentId}
                  value={appointments.appointmentId}
                >
                  {appointments.appointmentDate}
                </option>
              );
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updatereport">
          <h2>Rapor Güncelleme</h2>
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            onChange={handleUpdateChange}
            value={updateReport.diagnosis}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Fiyat"
            name="price"
            value={updateReport.price}
            onChange={handleUpdateChange}
          />
          <select
            value={updateReport.appointmentId}
            name="appointmentId"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true}>
              Randevu Seçiniz
            </option>
            {appointment.map((appointments) => {
              return (
                <option
                  key={appointments.appointmentId}
                  value={appointments.appointmentId}
                >
                  {appointments.appointmentDate}
                </option>
              );
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

export default Report;
