import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { updateFilters, clearFilters, FILTER_PRODUCTS } from '../actions';

const Filters = () => {
  const dispatch = useDispatch();

  const {
    all_products,
    filters,
  } = useSelector((state) => state.filter_reducer);

  const {
    category,
    company,
    color,
    min_price,
    max_price,
    price,
    shipping,
    text,
  } = useSelector((state) => state.filter_reducer.filters);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [filters, dispatch]);

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search Input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              value={text}
              onChange={(e) => dispatch(updateFilters(e))}
              className='search-input'
            />
          </div>
          {/* Categories */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  name='category'
                  type='button'
                  onClick={(e) => dispatch(updateFilters(e))}
                  className={`${
                    category === cat.toLowerCase() ? 'active' : null
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Companies */}
          <div className='form-control'>
            <h5>Company</h5>
            <select
              name='company'
              value={company}
              onChange={(e) => dispatch(updateFilters(e))}
              className='company'
            >
              {companies.map((comp) => (
                <option value={comp} key={comp}>
                  {comp}
                </option>
              ))}
            </select>
            {/* Colors */}
            <div className='form-control'>
              <h5>Colors</h5>
              <div className='colors'>
                {colors.map((col) => {
                  if (col === 'all') {
                    return (
                      <button
                        key={col}
                        type='button'
                        name='color'
                        data-color='all'
                        className={`${
                          color === 'all' ? 'all-btn active' : 'all-btn'
                        }`}
                        onClick={(e) => dispatch(updateFilters(e))}
                      >
                        All
                      </button>
                    );
                  }
                  return (
                    <button
                      type='button'
                      key={col}
                      name='color'
                      style={{ background: col }}
                      className={`${
                        col === color ? 'active color-btn' : 'color-btn'
                      }`}
                      data-color={col}
                      onClick={(e) => dispatch(updateFilters(e))}
                    >
                      {col === color ? <FaCheck /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Price */}
          <div className='form-control'>
            <h5>{price}</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              value={price}
              onChange={(e) => dispatch(updateFilters(e))}
            />
          </div>
          {/* Shipping */}
          <div className='form-control'>
            <label htmlFor='shipping'>
              Free Shiping&nbsp;
              <input
                type='checkbox'
                name='shipping'
                id='shipping'
                onChange={(e) => dispatch(updateFilters(e))}
                checked={shipping}
              />
            </label>
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}
        >
          {' '}
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    outline: none;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
