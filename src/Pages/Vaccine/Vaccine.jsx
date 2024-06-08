import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getVaccines,
  deleteVaccines,
  createVaccines,
  updateVaccinesAPI,
} from "../../API/vaccine";
import "./Vaccine.css";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import { getFinishDate } from "../../API/vaccine";
import { getAnimalId } from "../../API/vaccine";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [report, setReport] = useState([]);
  const [reload, setReload] = useState(true);
  const [initialVaccineList, setInitialVaccineList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [animalId, setAnimalId] = useState("");

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    vaccineCode: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalId: "",
    reportId: "",
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    vaccineCode: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalId: "",
    reportId: "",
  });

  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getVaccines().then((response) => {
      setVaccine(response.data.items);
      setInitialVaccineList(response.data.items);
    });
    getAnimals().then((response) => {
      setAnimal(response.data.items);
    });
    getReports().then((response) => {
      setReport(response.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteVaccines(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleIdSearch = () => {
    const animalId2 = animal.find(
      (animal) => animal.name === animalId
    )?.animalId;

    getAnimalId(animalId2)
      .then((response) => {
        setVaccine(response.data);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleDateSearch = () => {
    getFinishDate(startDate, endDate)
      .then((response) => {
        setVaccine(response.data);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateBtn = (vac) => {
    setUpdateVaccine({
      name: vac.name,
      vaccineCode: vac.vaccineCode,
      protectionStartDate: vac.protectionStartDate,
      protectionFinishDate: vac.protectionFinishDate,
      animalId: vac.animalId,
      reportId: vac.reportId,
      vaccineId: vac.vaccineId,
    });
  };

  const handleNewVaccine = (event) => {
    if (event.target.name === "animalId") {
      setNewVaccine({
        ...newVaccine,
        animalId: event.target.value,
      });
    } else if (event.target.name === "reportId") {
      setNewVaccine({
        ...newVaccine,
        reportId: event.target.value,
      });
    } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createVaccines(newVaccine)
      .then(() => {
        setReload(true);
        setNewVaccine({
          name: "",
          vaccineCode: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animalId: "",
          reportId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "animalId") {
      setUpdateVaccine({
        ...updateVaccine,
        animalId: event.target.value,
      });
    } else if (event.target.name === "reportId") {
      setUpdateVaccine({
        ...updateVaccine,
        reportId: event.target.value,
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateVaccinesAPI(updateVaccine)
      .then(() => {
        setReload(true);
        setUpdateVaccine({
          vaccineId: "",
          name: "",
          vaccineCode: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animalId: "",
          reportId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setVaccine(initialVaccineList);
    setAnimalId("");
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

  return (
    <div>
      <div className="vaccine-search">
        <div className="showAll">
          <button onClick={handleShowAll}>Tümünü Göster</button>
          <h1>Aşılar</h1>
        </div>
        <div className="vacsearch-container">
          <input
            type="text"
            placeholder="Hayvan Adı Giriniz"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />
          <button onClick={handleIdSearch} className="search-button">
            Ara
          </button>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleDateSearch} className="search-button">
            Filtrele
          </button>
        </div>
      </div>

      <h2>Aşı Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Aşı İsmi</th>
              <th>Aşı Kodu</th>
              <th>Aşı Başlangıç Tarihi</th>
              <th>Aşı Bitiş Tarihi</th>
              <th>Hayvan</th>
              <th>Hayvan Id</th>
              <th>Rapor Tanısı</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {vaccine.map((vaccines) => (
              <tr key={vaccines.vaccineId}>
                <td>{vaccines.name}</td>
                <td>{vaccines.vaccineCode}</td>
                <td>{vaccines.protectionStartDate}</td>
                <td>{vaccines.protectionFinishDate}</td>
                <td>
                  {animal.map((animals) => {
                    return animals.animalId === vaccines.animalId
                      ? animals.name
                      : "";
                  })}
                </td>
                <td>{vaccines.animalId}</td>
                <td>
                  {report
                    .map((reports) => {
                      return reports.id === vaccines.reportId
                        ? reports.diagnosis
                        : "";
                    })
                    .join("")}
                </td>
                <td>
                  <div className="icon-container">
                    <DeleteIcon
                      onClick={() => handleDelete(vaccines.vaccineId)}
                      style={{ color: "#3aa6b9", marginRight: "8px" }}
                    />
                    <UpdateIcon
                      onClick={() => handleUpdateBtn(vaccines)}
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
        <div className="addvaccine">
          <h2>Aşı Ekleme</h2>
          <input
            type="text"
            placeholder="Aşı İsmi"
            name="name"
            value={newVaccine.name}
            onChange={handleNewVaccine}
          />
          <input
            type="text"
            placeholder="Aşı Kodu"
            name="vaccineCode"
            value={newVaccine.vaccineCode}
            onChange={handleNewVaccine}
          />
          <input
            type="date"
            placeholder="protectionStartDate"
            name="protectionStartDate"
            value={newVaccine.protectionStartDate}
            onChange={handleNewVaccine}
          />
          <input
            type="date"
            placeholder="protectionFinishDate"
            name="protectionFinishDate"
            value={newVaccine.protectionFinishDate}
            onChange={handleNewVaccine}
          />
          <select
            value={newVaccine.animalId}
            name="animalId"
            onChange={handleNewVaccine}
          >
            <option value="" disabled={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return (
                <option key={animals.animalId} value={animals.animalId}>
                  {animals.name}
                </option>
              );
            })}
          </select>
          <select
            value={newVaccine.reportId}
            name="reportId"
            onChange={handleNewVaccine}
          >
            <option value="" disabled={true}>
              Rapor Seçiniz
            </option>
            {report.map((reports) => {
              return (
                <option key={reports.id} value={reports.id}>
                  {reports.id}
                </option>
              );
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updatevaccines">
          <h2>Aşı Güncelleme</h2>
          <input
            type="text"
            placeholder="Aşı İsmi"
            name="name"
            onChange={handleUpdateChange}
            value={updateVaccine.name}
          />
          <input
            type="text"
            placeholder="Aşı Kodu"
            name="vaccineCode"
            onChange={handleUpdateChange}
            value={updateVaccine.vaccineCode}
          />
          <input
            type="date"
            placeholder="protectionStartDate"
            name="protectionStartDate"
            onChange={handleUpdateChange}
            value={updateVaccine.protectionStartDate}
          />
          <input
            type="date"
            placeholder="protectionFinishDate"
            name="protectionFinishDate"
            onChange={handleUpdateChange}
            value={updateVaccine.protectionFinishDate}
          />
          <select
            value={updateVaccine.animalId}
            name="animalId"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return (
                <option key={animals.animalId} value={animals.animalId}>
                  {animals.name}
                </option>
              );
            })}
          </select>
          <select
            value={updateVaccine.reportId}
            name="reportId"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true}>
              Rapor Seçiniz
            </option>
            {report.map((reports) => {
              return (
                <option key={reports.id} value={reports.id}>
                  {reports.diagnosis}
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

export default Vaccine;
