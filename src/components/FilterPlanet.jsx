import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/FilterPlanet.css';

export default function FilterPlanet() {
  const { handleFilterName, handleColumnFilter,
    applyFilterNumber, numberFilter,
    deletedFilter, restoreFilter,
    filterByNumber, handleSortFilter,
    applyFilterOrder, filtersColumn } = useContext(PlanetsContext);

  const compareFilter = ['maior que', 'igual a', 'menor que'];

  return (
    <div className="search-container">
      <h1>StarWars Search Planets</h1>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Search By Name"
        onChange={ handleFilterName }
      />
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
            data-testid="filter"
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
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          applyFilterOrder();
        } }
      >
        <select
          name="column"
          onChange={ handleSortFilter }
          data-testid="column-sort"
        >
          {
            filtersColumn.map((el) => <option key={ el }>{ el }</option>)
          }
        </select>
        <label htmlFor="asc-radio">
          <input
            type="radio"
            id="asc-radio"
            name="sort"
            value="ASC"
            onClick={ handleSortFilter }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="desc-radio">
          <input
            type="radio"
            name="sort"
            id="desc-radio"
            value="DESC"
            onClick={ handleSortFilter }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
        <button type="submit" data-testid="column-sort-button">Ordenar</button>
      </form>
    </div>
  );
}
