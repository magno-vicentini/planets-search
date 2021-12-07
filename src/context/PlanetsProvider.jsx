import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
// import usePlanets from '../hooks/usePlanets';
import useCompare from '../hooks/useCompare';

function PlanetsProvider({ children }) {
  // const [planets, setFilterPlanetName,
  //   filterPlanetName, setPlanets, allFilterByNumber,
  //   setAllFilterByNumber, deletedFilter, setDeletedFilter,
  //   allPlanets] = usePlanets();

  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [allFilterByNumber, setAllFilterByNumber] = useState({
    filterByNumericValues: [],
  });

  const [deletedFilter, setDeletedFilter] = useState([]);
  const NEGATIVEONE = -1;
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { filterByName } = filterPlanetName;
  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await fetch(URL).then((response) => response.json());
      setAllPlanets(results);
      setPlanets(results.sort((a, b) => ((a.name > b.name) ? 1 : NEGATIVEONE)));
    };
    fetchPlanets();
  }, [NEGATIVEONE]);

  useEffect(() => {
    setPlanets(allPlanets
      .filter(({ name }) => name.includes(filterByName.name)));
  }, [allPlanets, filterByName]);

  useCompare(setPlanets, allFilterByNumber, planets);

  const [numberFilter, setNumberFilter] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);

  const [filterByNumber, setFilterByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filterByOrder, setFilterByOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const [orderFilter, setOrderFilter] = useState({
    order: {},
  });

  const [sortFilter, setSortFilter] = useState(numberFilter);

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

  function handleSortFilter({ target }) {
    const { value, name } = target;
    setFilterByOrder({
      ...filterByOrder,
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

  const applyFilterOrder = () => {
    const { column, sort } = filterByOrder;
    setOrderFilter({
      ...orderFilter,
      order: filterByOrder,
    });
    console.log(planets);
    console.log(sort);
    if (sort === 'ASC') {
      console.log(column);
      setPlanets(planets.sort((a, b) => a[column] - b[column]));
    }
    if (sort === 'DESC') {
      setPlanets(planets.sort((a, b) => b[column] - a[column]));
    }
  };

  function restoreFilter(filter) {
    setPlanets(allPlanets);

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
    ]);
    setFilterByNumber({
      ...filterByNumber,
      column: numberFilter[0],
    });
  }

  // useEffect(() => {
  //   const { column, sort } = orderFilter.order;
  //   console.log(orderFilter.order);
  //   console.log(planets);
  //   if (sort === 'ASC') {
  //     setPlanets(planets.sort((a, b) => a[column] - b[column]));
  //   }
  //   if (sort === 'DESC') {
  //     setPlanets(planets.sort((a, b) => b[column] - a[column]));
  //   }
  // }, [orderFilter]);

  const context = {
    planets,
    handleFilterName,
    handleColumnFilter,
    applyFilterNumber,
    numberFilter,
    deletedFilter,
    restoreFilter,
    filterByNumber,
    sortFilter,
    setSortFilter,
    handleSortFilter,
    applyFilterOrder,
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
