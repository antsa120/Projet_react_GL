import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    libelle: "",
    nomProd: "",
    type: ""
  });
  const [editProduct, setEditProduct] = useState(null); // État pour le produit à modifier
  const [showModalAdd, setShowModalAdd] = useState(false); // Pour afficher le modal d'ajout
  const [showModalEdit, setShowModalEdit] = useState(false); // Pour afficher le modal de modification

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/produits");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fonction pour gérer l'ajout d'un nouveau produit
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/produits", newProduct);
      console.log(response.data);
      setShowModalAdd(false); // Fermer le modal après l'ajout
      fetchProducts(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Gérer le changement dans le formulaire d'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  // Ouvrir le modal de modification avec les informations du produit actuel
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModalEdit(true); // Afficher le modal de modification
  };

  // Fonction pour gérer la modification d'un produit
  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/produits/${editProduct.id}`, editProduct);
      console.log(response.data);
      setShowModalEdit(false); // Fermer le modal après la modification
      fetchProducts(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Erreur lors de la modification du produit :", error);
    }
  };

 
  // Fonction pour gérer la suppression d'un produit
const handleDeleteProduct = async (id) => {
  try {
      const response = await axios.delete(`http://localhost:5000/api/produits/${id}`);
      console.log(response.data);
      fetchProducts(); // Rafraîchir la liste des produits
  } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error.response ? error.response.data : error);
  }
};


  return (
    <div className="container mt-5">
      <h2>Gestion des produits</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModalAdd(true)}>
        <FaPlus /> Ajouter
      </button>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libelle</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.libelle}</td>
              <td>{product.nomProd}</td>
              <td>{product.type}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditClick(product)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrash /> Delete
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour ajouter un produit */}
      {showModalAdd && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un nouveau produit</h5>
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
                      value={newProduct.libelle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nomProd">Nom du Produit</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomProd"
                      name="nomProd"
                      value={newProduct.nomProd}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={newProduct.type}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalAdd(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour modifier un produit */}
      {showModalEdit && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier un produit</h5>
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
                      value={editProduct?.libelle || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nomProd">Nom du Produit</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomProd"
                      name="nomProd"
                      value={editProduct?.nomProd || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={editProduct?.type || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalEdit(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditProduct}>
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

export default ProductList;


