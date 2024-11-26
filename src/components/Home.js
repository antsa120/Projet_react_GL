// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StockList from './StockList';
 
import './Home.css';

const Home = () => {
    const [content, setContent] = useState(<h1>Bienvenue</h1>); // Contenu par défaut

    const handleLogout = () => {
        // Logique de déconnexion ici
        console.log("Déconnexion...");
    };

    return (
        <div className="home-layout">
            <nav className="navbar">
                <div className="navbar-content">
                    <h1>Gestion de Stock</h1>
                    <input
                        type="text"
                        placeholder="Recherche..."
                        className="search-input"
                    />
                    <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
                </div>
            </nav>
            <aside className="sidebar">
                <h2>Menu</h2>
                <div className="buttons">
                    <Link 
                        to="/stocks" 
                        className="btn" 
                        onClick={() => setContent(<StockList />)} // Mise à jour du contenu sur clic
                    >
                        Voir les Stocks
                    </Link>
                    <Link 
                        to="/statistique" 
                        className="btn" 
                        onClick={() => setContent(<h1>Dashboard</h1>)}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/home" 
                        className="btn" 
                        onClick={() => setContent(<h1>Bienvenue</h1>)}
                    >
                        Home
                    </Link>
                   
                </div>
            </aside>
            <main className="content">
                {content} {/* Affiche le contenu ici */}
            </main>
        </div>
    );
};

export default Home;
