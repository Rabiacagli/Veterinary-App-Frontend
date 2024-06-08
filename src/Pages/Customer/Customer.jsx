import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getCustomers,
  deleteCustomers,
  createCustomers,
  updateCustomersAPI,
  getByName,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [reload, setReload] = useState(true);
  const [initialCustomerList, setInitialCustomerList] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (reload) {
      getCustomers()
        .then((response) => {
          if (response.status) {
            setCustomer(response.data.items);
            setInitialCustomerList(response.data.items);
          } else {
            handleOperationError(response.message);
          }
        })
        .catch((err) => handleOperationError(err.message));
      setReload(false);
    }
  }, [reload]);

  const handleDelete = (id) => {
    deleteCustomers(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    getByName(name).then((response) => {
      if (response.status) {
        setCustomer(response.data);
        console.log(response.data[0].customerId);
      } else {
        handleOperationError(response.message);
      }
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createCustomers(newCustomer)
      .then(() => {
        setReload(true);
        setNewCustomer({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
      };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });

  };

  const handleUpdate = () => {
    updateCustomersAPI(updateCustomer)
      .then(() => {
        setReload(true);
        setUpdateCustomer({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
          customerId: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateBtn = (cus) => {
    setUpdateCustomer({
      customerId: cus.customerId,
      name: cus.name,
      mail: cus.mail,
      address: cus.address,
      city: cus.city,
      phone: cus.phone,
    });
  };

  const handleShowAll = () => {
    setCustomer(initialCustomerList);
    setName("");
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
      <div className="customer-search">
        <h1>Müşteri Yönetimi</h1>
        <div className="cussearch-container">
          <input
            type="text"
            placeholder="Müşteri Ara..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
          <button onClick={handleShowAll}>
            Tümünü Göster
          </button>
        </div>
      </div>
      <h2>Müşteri Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Müşteri İsmi</th>
              <th>Müşteri Mail</th>
              <th>Müşteri Adres</th>
              <th>Müşteri Şehir</th>
              <th>Tel. No</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((customers) => (
              <tr key={customers.customerId}>
                <td>{customers.name}</td>
                <td>{customers.mail}</td>
                <td>{customers.address}</td>
                <td>{customers.city}</td>
                <td>{customers.phone}</td>
                <td>
                  <div className="icon-container">
                    <DeleteIcon
                      onClick={() => handleDelete(customers.customerId)}
                      style={{ color: "#7469B6", marginRight: "8px" }}
                    />
                    <UpdateIcon
                      onClick={() => handleUpdateBtn(customers)}
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
        <div className="addcustomer">
          <h2>Müşteri Ekleme</h2>
          <input
            type="text"
            placeholder="İsim - Soy ismi"
            name="name"
            value={newCustomer.name}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="Mail"
            name="mail"
            value={newCustomer.mail}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={newCustomer.address}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="Şehir"
            name="city"
            value={newCustomer.city}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="Tel. No"
            name="phone"
            value={newCustomer.phone}
            onChange={handleNewCustomer}
          />
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updateCustomer">
          <h2>Müşteri Güncelleme</h2>
          <input
            type="text"
            placeholder="İsim - Soy ismi"
            name="name"
            onChange={handleUpdateChange}
            value={updateCustomer.name}
          />
          <input
            type="text"
            placeholder="Mail"
            name="mail"
            onChange={handleUpdateChange}
            value={updateCustomer.mail}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            onChange={handleUpdateChange}
            value={updateCustomer.address}
          />
          <input
            type="text"
            placeholder="Şehir"
            name="city"
            onChange={handleUpdateChange}
            value={updateCustomer.city}
          />
          <input
            type="text"
            placeholder="Tel. No"
            name="phone"
            onChange={handleUpdateChange}
            value={updateCustomer.phone}
          />
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

export default Customer;
