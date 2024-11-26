import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import ChartStock from './ChartStock'; // Importer le composant ChartStock
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from "chart.js";

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStock, setNewStock] = useState({
    libelle: "",
    nom: "",
    prix: "",
    quantite: "",
    date: ""
  });
  const [editStock, setEditStock] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // Fonction pour récupérer les produits
  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stock");
      setStocks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des stocks :", error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Fonction pour gérer l'ajout d'un nouveau stock
  const handleAddStock = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/stock", newStock);
      console.log(response.data);
      setShowModalAdd(false);
      fetchStocks();
    } catch (error) {
      console.error("Erreur lors de l'ajout du stock :", error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  // Gérer le changement dans le formulaire d'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStock({ ...editStock, [name]: value });
  };

  // Ouvrir le modal de modification avec les informations du produit actuel
  const handleEditClick = (stock) => {
    setEditStock(stock);
    setShowModalEdit(true);
  };

  // Fonction pour gérer la modification d'un stock
  const handleEditStock = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/stock/${editStock.id}`, editStock);
      console.log(response.data);
      setShowModalEdit(false);
      fetchStocks();
    } catch (error) {
      console.error("Erreur lors de la modification du stock :", error);
    }
  };

  //  supprimer stock
  const handleDeleteStock = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/stock/${id}`);
      console.log(response.data);
      fetchStocks();
    } catch (error) {
      console.error("Erreur lors de la suppression du stock :", error.response ? error.response.data : error);
    }
  };

  //  recherche
  const filteredStocks = stocks.filter(stock =>
    stock.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Gestion des stocks</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par libelle ou nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={() => setShowModalAdd(true)}>
        <FaPlus /> Ajouter
      </button>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libelle</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Total</th> {/* Nouvelle colonne pour le total */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.libelle}</td>
              <td>{stock.nom}</td>
              <td>{stock.prix}</td>
              <td>{stock.quantite}</td>
              <td>{stock.date}</td>
              <td>{(stock.prix * stock.quantite).toFixed(2)}</td> {/* Total calculé */}
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditClick(stock)}>
                  <FaEdit /> Edit
                </button>
                <button  className="btn btn-danger btn-sm mx-1"  onClick={() => handleDeleteStock(stock.id) }>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Graphique des quantités par produit */}
      <ChartStock stocks={filteredStocks} />  {/* Passer les stocks filtrés au composant ChartStock */}

      {/* Modal pour ajouter un stock */}
      {showModalAdd && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un nouveau stock</h5>
                <button type="button" className="close" onClick={() => setShowModalAdd(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="libelle">Libelle</label>
                    <input
                      type="text"
                      className="form-control"
                      id="libelle"
                      name="libelle"
                      value={newStock.libelle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={newStock.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prix">Prix</label>
                    <input
                      type="number"
                      className="form-control"
                      id="prix"
                      name="prix"
                      value={newStock.prix}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantite">Quantité</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantite"
                      name="quantite"
                      value={newStock.quantite}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={newStock.date}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalAdd(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddStock}>
                  Add Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour modifier un stock */}
      {showModalEdit && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier un stock</h5>
                <button type="button" className="close" onClick={() => setShowModalEdit(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="libelle">Libelle</label>
                    <input
                      type="text"
                      className="form-control"
                      id="libelle"
                      name="libelle"
                      value={editStock?.libelle || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={editStock?.nom || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prix">Prix</label>
                    <input
                      type="number"
                      className="form-control"
                      id="prix"
                      name="prix"
                      value={editStock?.prix || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantite">Quantité</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantite"
                      name="quantite"
                      value={editStock?.quantite || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={editStock?.date || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalEdit(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditStock}>
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

export default StockList;
