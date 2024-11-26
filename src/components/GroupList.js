import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({
    commune: "",
    district: "",
    poleDev: "",
    region: ""
  });
  const [editGroup, setEditGroup] = useState(null); // État pour le groupe à modifier
  const [showModalAdd, setShowModalAdd] = useState(false); // Pour afficher le modal d'ajout
  const [showModalEdit, setShowModalEdit] = useState(false); // Pour afficher le modal de modification

  // Fonction pour récupérer les groupes
  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/groupes");
      setGroups(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Fonction pour gérer l'ajout d'un nouveau groupe
  const handleAddGroup = async () => {
    if (!newGroup.commune || !newGroup.district || !newGroup.poleDev || !newGroup.region) {
      alert("Tous les champs sont requis.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/groupes", newGroup);
      console.log(response.data);
      setNewGroup({ commune: "", district: "", poleDev: "", region: "" }); // Réinitialisation
      setShowModalAdd(false);
      fetchGroups();
    } catch (error) {
      console.error("Erreur lors de l'ajout du groupe :", error);
    }
  };
  

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  // Gérer le changement dans le formulaire d'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGroup({ ...editGroup, [name]: value });
  };

  // Ouvrir le modal de modification avec les informations du groupe actuel
  const handleEditClick = (group) => {
    setEditGroup(group);
    setShowModalEdit(true); // Afficher le modal de modification
  };

  // Fonction pour gérer la modification d'un groupe
  const handleEditGroup = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/groupes/${editGroup.id}`, editGroup);
      console.log(response.data);
      setShowModalEdit(false); // Fermer le modal après la modification
      fetchGroups(); // Rafraîchir la liste des groupes
    } catch (error) {
      console.error("Erreur lors de la modification du groupe :", error);
    }
  };

  // Fonction pour gérer la suppression d'un groupe
  const handleDeleteGroup = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/groupes/${id}`);
      console.log(response.data);
      fetchGroups(); // Rafraîchir la liste des groupes
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe :", error.response ? error.response.data : error);
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
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.commune}</td>
              <td>{group.district}</td>
              <td>{group.poleDev}</td>
              <td>{group.region}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditClick(group)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteGroup(group.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour ajouter un groupe */}
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
                      value={newGroup.commune}
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
                      value={newGroup.district}
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
                      value={newGroup.poleDev}
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
                      value={newGroup.region}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalAdd(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddGroup}>
                  Add Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour modifier un groupe */}
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
                      value={editGroup?.commune || ""}
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
                      value={editGroup?.district || ""}
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
                      value={editGroup?.poleDev || ""}
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
                      value={editGroup?.region || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalEdit(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditGroup}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;

