import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import usePlanets from '../hooks/usePlanets';
import useCompare from '../hooks/useCompare';

function PlanetsProvider({ children }) {
  const [planets, setFilterPlanetName,
    filterPlanetName, setPlanets] = usePlanets();

  const [numberFilter, setNumberFilter] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);

  const [allFilterByNumber, setAllFilterByNumber] = useState({
    filterByNumericValues: [],
  });

  const [filterByNumber, setFilterByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [deletedFilter, setDeletedFilter] = useState([]);

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
  }
  usePlanets(allFilterByNumber, deletedFilter);

  useCompare(setPlanets, allFilterByNumber, planets);

  const context = {
    planets,
    handleFilterName,
    handleColumnFilter,
    applyFilterNumber,
    numberFilter,
    deletedFilter,
    restoreFilter,
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
