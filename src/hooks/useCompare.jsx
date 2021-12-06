import { useEffect } from 'react';

const useCompare = (setPlanets, allFilterByNumber, allPlanets, deletedFilter) => {
  const { filterByNumericValues } = allFilterByNumber;

  useEffect(() => {
    if (filterByNumericValues.length) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        const filterNumber = allPlanets.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) < Number(value);
          case 'igual a':
            return Number(planet[column]) === Number(value);
          default:
            return true;
          }
        });
        setPlanets(filterNumber);
      });
    }
  }, [filterByNumericValues, deletedFilter]);
};

export default useCompare;
