import { useEffect } from 'react';

const useCompare = (setPlanets, allFilterByNumber, planets) => {
  const { filterByNumericValues } = allFilterByNumber;

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        const filterNumber = planets.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) > Number(value);
          case 'iqual a':
            return Number(planet[column]) === Number(value);
          default:
            return true;
          }
        });
        setPlanets(filterNumber);
      });
    }
  }, [filterByNumericValues]);
};

export default useCompare;
