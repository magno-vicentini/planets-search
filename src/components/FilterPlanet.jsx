import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterPlanet() {
  const { handleFilterName, handleColumnFilter,
    applyFilterNumber, numberFilter,
    deletedFilter, restoreFilter } = useContext(PlanetsContext);
  const compareFilter = ['maior que', 'menor que', 'iqual a'];

  return (
    <div>
      <input type="text" onChange={ handleFilterName } />
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          applyFilterNumber();
        } }
      >
        <select
          name="column"
          onChange={ handleColumnFilter }
          data-testid="column-filter"
        >
          {
            numberFilter.map((el) => <option key={ el }>{ el }</option>)
          }
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleColumnFilter }
        >
          {
            compareFilter.map((el) => <option key={ el }>{ el }</option>)
          }
        </select>
        <input
          type="text"
          name="value"
          data-testid="value-filter"
          onChange={ handleColumnFilter }
        />
        <button
          type="submit"
          data-testid="button-filter"
          disabled={ numberFilter.length === 0 }
        >
          Filtrar
        </button>
      </form>
      {
        deletedFilter && deletedFilter.map((filter) => (
          <label htmlFor="'deleted-filter'" key={ filter.column }>
            {`${filter.column} ${filter.comparison} ${filter.value}` }
            <button
              data-testid="filter"
              type="button"
              id="deleted-filter"
              onClick={ () => restoreFilter(filter) }
            >
              X
            </button>

          </label>
        ))
      }
    </div>
  );
}
