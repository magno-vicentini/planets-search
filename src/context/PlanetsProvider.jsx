import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import usePlanets from '../hooks/usePlanets';

function PlanetsProvider({ children }) {
  const [planets, setFilterPlanetName,
    filterPlanetName, setPlanets, allFilterByNumber,
    setAllFilterByNumber, deletedFilter, setDeletedFilter] = usePlanets();

  const [numberFilter, setNumberFilter] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);

  const [compareFilter, setCompareFilter]= useState([
    'maior que', 'igual a', 'menor que'
  ])
  
  const [filterByNumber, setFilterByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  function handleFilterName({ target }) {
    const { value } = target;
    setFilterPlanetName({
      ...filterPlanetName,
      filterByName: { name: value },
    });
  }

  function handleColumnFilter({ target }) {
    const { value, name } = target;
    setFilterByNumber({
      ...filterByNumber,
      [name]: value,
    });
  }

  function applyFilterNumber() {
    setNumberFilter(numberFilter.filter((type) => type !== filterByNumber.column));

    setAllFilterByNumber({
      ...allFilterByNumber,
      filterByNumericValues: [
        ...allFilterByNumber.filterByNumericValues,
        filterByNumber,
      ],
    });
    setDeletedFilter([
      ...deletedFilter,
      filterByNumber,
    ]);
  }

  function restoreFilter(filter) {
    setDeletedFilter([
      ...deletedFilter.filter((el) => el !== filter),
    ]);
    setAllFilterByNumber({
      ...allFilterByNumber,
      filterByNumericValues: [
        ...allFilterByNumber.filterByNumericValues.filter((el) => el !== filter),
      ],
    });
    setNumberFilter([
      ...numberFilter,
      filter.column,
    ])
  }
  usePlanets();



  const context = {
    planets,
    handleFilterName,
    handleColumnFilter,
    applyFilterNumber,
    numberFilter,
    deletedFilter,
    restoreFilter,
    compareFilter,
    filterByNumber,
  };
  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
