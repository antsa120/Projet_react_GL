import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const PersonnelList = () => {
    const [personnels, setPersonnels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        cin: '',
        nom: '',
        prenom: '',
        genre: '',
        dateNaiss: '',
        lieuNaiss: '',
        dateCin: '',
        lieuCin: '',
        situation: '',
        adresse: '',
        email: '',
        phone: '',
        diplome: '',
        dateArrive: '',
        nbrAnnee: '',
        fonction: '',
        statut: 'Permanent',
        classe: '',
        cours_id: ''
    });
    const [cours, setCours] = useState([]);

    useEffect(() => {
        fetchPersonnels();
        fetchCours();
    }, []);

    const fetchPersonnels = async () => {
        try {
            const response = await axios.get('/api/personnels'); // Assurez-vous que cette route existe
            setPersonnels(response.data);
        } catch (error) {
            console.error('Error fetching personnels:', error);
        }
    };

    const fetchCours = async () => {
        try {
            const response = await axios.get('/api/cours'); // Assurez-vous que cette route existe
            setCours(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/personnels', formData); // Changez la route selon votre API
            fetchPersonnels();
            setShowModal(false);
            setFormData({
                cin: '',
                nom: '',
                prenom: '',
                genre: '',
                dateNaiss: '',
                lieuNaiss: '',
                dateCin: '',
                lieuCin: '',
                situation: '',
                adresse: '',
                email: '',
                phone: '',
                diplome: '',
                dateArrive: '',
                nbrAnnee: '',
                fonction: '',
                statut: 'Permanent',
                classe: '',
                cours_id: ''
            });
        } catch (error) {
            console.error('Error creating personnel:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce personnel ?')) {
            try {
                await axios.delete(`/api/personnels/${id}`); // Changez la route selon votre API
                fetchPersonnels();
            } catch (error) {
                console.error('Error deleting personnel:', error);
            }
        }
    };

    return (
        <div className="container">
            <h1>Liste des Personnels</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus"></i> Ajouter un personnel
            </button>

            {/* Modal d'ajout */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Personnel</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label htmlFor="cin">CIN :</label>
                                            <input type="number" className="form-control" id="cin" name="cin" value={formData.cin} onChange={handleChange} required />
                                            
                                            {/* Autres champs similaires ... */}
                                            <label htmlFor="nom">Nom :</label>
                                            <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                                            
                                            <label htmlFor="prenom">Prénom :</label>
                                            <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                                            
                                            <label htmlFor="genre">Genre :</label>
                                            <select className="form-control" id="genre" name="genre" value={formData.genre} onChange={handleChange} required>
                                                <option value="" disabled>Choisir le genre</option>
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                            </select>

                                            <label htmlFor="dateNaiss">Date de naissance :</label>
                                            <input type="date" className="form-control" id="dateNaiss" name="dateNaiss" value={formData.dateNaiss} onChange={handleChange} required />

                                            {/* Ajoutez les autres champs ici */}
                                            {/* ... */}
                                        </div>
                                        {/* Deuxième colonne pour les autres champs */}
                                        <div className="form-group col-sm-6">
                                            <label htmlFor="adresse">Adresse :</label>
                                            <input type="text" className="form-control" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />

                                            <label htmlFor="email">Email :</label>
                                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />

                                            {/* Autres champs similaires ... */}
                                            <label htmlFor="phone">Téléphone :</label>
                                            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />

                                            <label htmlFor="diplome">Diplôme :</label>
                                            <input type="text" className="form-control" name="diplome" value={formData.diplome} onChange={handleChange} required />

                                            <label htmlFor="statut">Statut :</label>
                                            <select name="statut" id="statut" className="form-control" value={formData.statut} onChange={handleChange} required>
                                                <option value="Permanent">Permanent</option>
                                                <option value="Chargé de cours">Chargé de cours</option>
                                            </select>

                                            <label htmlFor="cours_id">Cours associé :</label>
                                            <select className="form-control" name="cours_id" value={formData.cours_id} onChange={handleChange} required>
                                                <option value="" disabled>Choisir un cours</option>
                                                {cours.map((coursItem) => (
                                                    <option key={coursItem.id} value={coursItem.id}>
                                                        {coursItem.nom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        <i className="fas fa-check"></i> Enregistrer
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered datatable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>CIN</th>
                            <th>Genre</th>
                            <th>Date de Naissance</th>
                            <th>Lieu de Naissance</th>
                            <th>Date CIN</th>
                            <th>Lieu CIN</th>
                            <th>Situation</th>
                            <th>Adresse</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Diplôme</th>
                            <th>Date d'Arrivée</th>
                            <th>Nombre d'Années</th>
                            <th>Fonction</th>
                            <th>Statut</th>
                            <th>Classe</th>
                            <th>Cours associé</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnels.length > 0 ? (
                            personnels.map((personnel) => (
                                <tr key={personnel.id}>
                                    <td>{personnel.id}</td>
                                    <td>{personnel.nom}</td>
                                    <td>{personnel.prenom}</td>
                                    <td>{personnel.cin}</td>
                                    <td>{personnel.genre}</td>
                                    <td>{new Date(personnel.dateNaiss).toLocaleDateString()}</td>
                                    <td>{personnel.lieuNaiss}</td>
                                    <td>{new Date(personnel.dateCin).toLocaleDateString()}</td>
                                    <td>{personnel.lieuCin}</td>
                                    <td>{personnel.situation}</td>
                                    <td>{personnel.adresse}</td>
                                    <td>{personnel.email}</td>
                                    <td>{personnel.phone}</td>
                                    <td>{personnel.diplome}</td>
                                    <td>{new Date(personnel.dateArrive).toLocaleDateString()}</td>
                                    <td>{personnel.nbrAnnee}</td>
                                    <td>{personnel.fonction}</td>
                                    <td>{personnel.statut}</td>
                                    <td>{personnel.classe}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(personnel.id)}>
                                            <i className="fas fa-trash"></i> Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="20" className="text-center">Aucun personnel trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonnelList;
