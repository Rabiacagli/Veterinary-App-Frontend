import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getAnimals,
  deleteAnimals,
  createAnimals,
  updateAnimalsAPI,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";
import { getByName } from "../../API/animal";

function Animal() {
  const [animal, setAnimal] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [initialAnimalList, setInitialAnimalList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [reload, setReload] = useState(true);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customerId: "",
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customerId: "",
    animalId: "",
  });

  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

useEffect(() => {
    getAnimals().then((response) => {
      setAnimal(response.data.items);
      setInitialAnimalList(response.data.items);
    });
    getCustomers().then((response) => {
      setCustomer(response.data.items);
    });
    setReload(false);
  }, [reload]);

   

  const handleDelete = (animalId) => {
    deleteAnimals(animalId)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    if (name) {

    if (name.trim() === "") {
      setInitialAnimalList([]);
    } else { 
        getByName(name).then((response) => {
        setAnimal(response.data);
      })
    }} else {
        const results = animal.filter(
          (animals) =>
            animals.customerId === getCustomerId(customerName)
        );
        setAnimal(results);
    }
  };

  const handleUpdateBtn = (ani) => {
    setUpdateAnimal({
      name: ani.name,
      species: ani.species,
      breed: ani.breed,
      gender: ani.gender,
      colour: ani.colour,
      dateOfBirth: ani.dateOfBirth,
      customerId: ani.customerId,
      animalId: ani.animalId,
    });
  };

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customerId:  event.target.value,
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAnimals(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customerId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "customerId") {
      setUpdateAnimal({
        ...updateAnimal,
        customerId: event.target.value,
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAnimalsAPI(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customerId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setAnimal(initialAnimalList);
    setName("");
    setCustomerName("");
  };

  const handleOperationError = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  const getCustomerName = (customerId) => {
  const customerObj = customer.find(doc => doc.customerId === customerId);
  return customerObj ? customerObj.name : "Bilinmiyor";
  };

  const getCustomerId = (customerName) => {
  const customerObj = customer.find(doc => doc.name === customerName);
  return customerObj ? customerObj.customerId : "Bilinmiyor";
};


  return (
<div>
  <div className="animal-search">
    <h1>Hayvan Yönetimi</h1>
    <div className="ani-search">
      <input
        type="text"
        placeholder="Müşteri Ara..."
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hayvan Ara..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Ara
      </button>
      <button onClick={handleShowAll}>
        Tümünü Göster
      </button>
    </div>
  </div>
  <h2>Hayvan Listesi</h2>
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Hayvan İsmi</th>
          <th>Hayvan Türü</th>
          <th>Hayvan Cinsiyet</th>
          <th>Hayvan Renk</th>
          <th>Hayvan Cinsi</th>
          <th>Doğum Tarihi</th>
          <th>Hayvan Sahibi</th>
          <th>Hayvan Sahibi ID</th>
          <th>İşlemler</th>
        </tr>
      </thead>

      <tbody>
        {animal.map((animals) => (
          <tr key={animals.animalId}>
            <td>{animals.name}</td>
            <td>{animals.species}</td>
            <td>{animals.gender}</td>
            <td>{animals.colour}</td>
            <td>{animals.breed}</td>
            <td>{animals.dateOfBirth}</td>
            <td>{getCustomerName(animals.customerId)}</td>
            <td>{animals.customerId}</td>
            <td>
              <div className="icon-container">
                <DeleteIcon
                  onClick={() => handleDelete(animals.animalId)}
                  style={{ color: "#3aa6b9", marginRight: "8px" }}
                />
                <UpdateIcon
                  onClick={() => handleUpdateBtn(animals)}
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
    <div className="addanimal">
      <h2>Hayvan Ekleme</h2>
      <input
        type="text"
        placeholder="İsim"
        name="name"
        value={newAnimal.name}
        onChange={handleNewAnimal}
      />
      <input
        type="text"
        placeholder="Türü"
        name="species"
        value={newAnimal.species}
        onChange={handleNewAnimal}
      />
      <input
        type="text"
        placeholder="Cinsi"
        name="breed"
        value={newAnimal.breed}
        onChange={handleNewAnimal}
      />
      <input
        type="text"
        placeholder="Cinsiyet"
        name="gender"
        value={newAnimal.gender}
        onChange={handleNewAnimal}
      />
      <input
        type="text"
        placeholder="Renk"
        name="colour"
        value={newAnimal.colour}
        onChange={handleNewAnimal}
      />
      <input
        type="date"
        name="dateOfBirth"
        value={newAnimal.dateofBirth}
        onChange={handleNewAnimal}
      />
      <select
        value={newAnimal.customerId}
        name="customerId"
        onChange={handleNewAnimal}
      >
        <option value="" disabled={true}>
          Hayvan Sahibi Seçiniz
        </option>
        {customer.map((customers) => {
          return  <option key={customers.customerId} value={customers.customerId}>{customers.name}</option>;
        })}
      </select>
      <button onClick={handleCreate}>Ekle</button>
    </div>

    <div className="updateAnimal">
      <h2>Hayvan Güncelleme</h2>
      <input
        type="text"
        placeholder="İsim"
        name="name"
        onChange={handleUpdateChange}
        value={updateAnimal.name}
      />
      <input
        type="text"
        placeholder="Türü"
        name="species"
        onChange={handleUpdateChange}
        value={updateAnimal.species}
      />
      <input
        type="text"
        placeholder="Cinsi"
        name="breed"
        onChange={handleUpdateChange}
        value={updateAnimal.breed}
      />
      <input
        type="text"
        placeholder="Cinsiyet"
        name="gender"
        onChange={handleUpdateChange}
        value={updateAnimal.gender}
      />
      <input
        type="text"
        placeholder="Renk"
        name="colour"
        onChange={handleUpdateChange}
        value={updateAnimal.colour}
      />
      <input
        type="date"
        name="dateOfBirth"
        onChange={handleUpdateChange}
        value={updateAnimal.dateOfBirth}
      />
      <select
        value={updateAnimal.customerId}
        name="customerId"
        onChange={handleUpdateChange}
      >
        <option value="" disabled={true} >
          Hayvan Sahibi Seçiniz
        </option>
        {customer.map((customers) => {
          return <option key={customers.customerId} value={customers.customerId}>{customers.name}</option>;
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

export default Animal;
