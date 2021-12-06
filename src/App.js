import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FilterPlanet from './components/FilterPlanet';

function App() {
  return (
    <PlanetsProvider>
      <FilterPlanet />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
