import { useEffect, useState } from 'react';

const usePlanets = (allFilterByNumber, deletedFilter) => {
  const [planets, setPlanets] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState({
    filterByName: {
      name: '',
    },
  });
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { filterByName } = filterPlanetName;

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await fetch(URL).then((response) => response.json());
      if (filterByName.name) {
        return setPlanets(results
          .filter(({ name }) => name.includes(filterByName.name)));
      }
      setPlanets(results);
    };
    fetchPlanets();
  }, [filterByName.name, allFilterByNumber, deletedFilter]);

  return [planets, setFilterPlanetName,
    filterPlanetName, setPlanets];
};

export default usePlanets;
