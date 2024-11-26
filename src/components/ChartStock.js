import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Enregistrer les échelles et éléments nécessaires

const ChartStock = ({ stocks }) => {
  const data = {
    labels: stocks.map(stock => stock.nom), // Les noms des produits
    datasets: [
      {
        label: 'Quantité',
        data: stocks.map(stock => stock.quantite), // Les quantités correspondantes
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quantités des Produits',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartStock;
