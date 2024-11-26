import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const LocalisationList = () => {
  const [localisations, setLocalisations] = useState([]);
  const [newLocalisation, setNewLocalisation] = useState({
    commune: "",
    district: "",
    poleDev: "",
    region: ""
  });
  const [editLocalisation, setEditLocalisation] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const fetchLocalisations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/localisations");
      setLocalisations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des localisations :", error);
    }
  };

  useEffect(() => {
    fetchLocalisations();
  }, []);

  const handleAddLocalisation = async () => {
    if (!newLocalisation.commune || !newLocalisation.district || !newLocalisation.poleDev || !newLocalisation.region) {
      alert("Tous les champs sont requis.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/localisations", newLocalisation);
      setNewLocalisation({ commune: "", district: "", poleDev: "", region: "" });
      setShowModalAdd(false);
      fetchLocalisations();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la localisation :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLocalisation({ ...newLocalisation, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditLocalisation({ ...editLocalisation, [name]: value });
  };

  const handleEditClick = (localisation) => {
    setEditLocalisation(localisation);
    setShowModalEdit(true);
  };

  const handleEditLocalisation = async () => {
    try {
      await axios.put(`http://localhost:5000/api/localisations/${editLocalisation.id}`, editLocalisation);
      setShowModalEdit(false);
      fetchLocalisations();
    } catch (error) {
      console.error("Erreur lors de la modification de la localisation :", error);
    }
  };

  const handleDeleteLocalisation = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette localisation ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/localisations/${id}`);
        fetchLocalisations();
      } catch (error) {
        console.error("Erreur lors de la suppression de la localisation :", error.response ? error.response.data : error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>GESTION DES LOCALISATIONS</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModalAdd(true)}>
        <FaPlus /> Ajouter
      </button>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Commune</th>
            <th>District</th>
            <th>Pole Dev</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localisations.map((localisation) => (
            <tr key={localisation.id}>
              <td>{localisation.id}</td>
              <td>{localisation.commune}</td>
              <td>{localisation.district}</td>
              <td>{localisation.poleDev}</td>
              <td>{localisation.region}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditClick(localisation)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteLocalisation(localisation.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour ajouter une localisation */}
      {showModalAdd && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une nouvelle localisation</h5>
                <button type="button" className="close" onClick={() => setShowModalAdd(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="commune">Commune</label>
                    <input
                      type="text"
                      className="form-control"
                      id="commune"
                      name="commune"
                      value={newLocalisation.commune}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      name="district"
                      value={newLocalisation.district}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="poleDev">Pole Dev</label>
                    <input
                      type="text"
                      className="form-control"
                      id="poleDev"
                      name="poleDev"
                      value={newLocalisation.poleDev}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="region">Region</label>
                    <input
                      type="text"
                      className="form-control"
                      id="region"
                      name="region"
                      value={newLocalisation.region}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalAdd(false)}>
                  Fermer
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddLocalisation}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour modifier une localisation */}
      {showModalEdit && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier la localisation</h5>
                <button type="button" className="close" onClick={() => setShowModalEdit(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="commune">Commune</label>
                    <input
                      type="text"
                      className="form-control"
                      id="commune"
                      name="commune"
                      value={editLocalisation?.commune || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      name="district"
                      value={editLocalisation?.district || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="poleDev">Pole Dev</label>
                    <input
                      type="text"
                      className="form-control"
                      id="poleDev"
                      name="poleDev"
                      value={editLocalisation?.poleDev || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="region">Region</label>
                    <input
                      type="text"
                      className="form-control"
                      id="region"
                      name="region"
                      value={editLocalisation?.region || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalEdit(false)}>
                  Fermer
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditLocalisation}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default LocalisationList;
