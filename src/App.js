import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StockList from './components/StockList'; 
import LocalisationList from './components/LocalisationList';




const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    
                    <Route path="/stocks" element={<StockList />} />
                    <Route path="/home" element={<Home />} />
                    
                    {/* Route pour la liste des localisation */}
                    <Route path="/localisations" element={<LocalisationList />} />

                    {/* Ajoutez d'autres routes ici si nécessaire */}
                </Routes>
            </div>
        </Router>
    );
    
};

export default App;
