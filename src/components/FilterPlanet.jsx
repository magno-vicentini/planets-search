import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterPlanet() {
  const { handleFilterName, handleColumnFilter,
    applyFilterNumber, numberFilter,
    deletedFilter, restoreFilter, compareFilter,
    filterByNumber } = useContext(PlanetsContext);

  return (
    <div>
      <input 
      data-testid="name-filter"
      type="text" 
      onChange={ handleFilterName } />
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
          type="number"
          name="value"
          value={ filterByNumber.value }
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
          <label 
            htmlFor="'deleted-filter'" 
            key={ filter.column }
            data-testid='filter'
          >
            {`${filter.column} ${filter.comparison} ${filter.value}` }
            <button
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
