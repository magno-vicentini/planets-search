import { useEffect, useState } from 'react';
import useCompare from './useCompare';
// import useCompare from './useCompare';

const usePlanets = () => {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([])
  const [filterPlanetName, setFilterPlanetName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [allFilterByNumber, setAllFilterByNumber] = useState({
    filterByNumericValues: [],
  });

  const [deletedFilter, setDeletedFilter] = useState([]);

  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { filterByName } = filterPlanetName;
  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await fetch(URL).then((response) => response.json());
      setAllPlanets(results);
      setPlanets(results)
    };
    fetchPlanets();
  }, []);

  
  useEffect(() => {
    setPlanets(allPlanets
      .filter(({ name }) => name.includes(filterByName.name)));
    }, [filterByName.name])
    
  useCompare(setPlanets, allFilterByNumber, allPlanets, setDeletedFilter);

  

  return [planets, setFilterPlanetName,
    filterPlanetName, setPlanets, allFilterByNumber
    , setAllFilterByNumber, deletedFilter, setDeletedFilter];
};

export default usePlanets;
