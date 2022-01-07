import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    color: 'all',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

function filter_reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    }

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];

      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filtered_products: tempProducts,
      };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    }

    case FILTER_PRODUCTS: {
      const { all_products } = state;
      const { text, company, color, price, shipping, category } = state.filters;
      let tempProducts = [...all_products];
      if (text) {
        tempProducts = tempProducts.filter((item) =>
          item.name.toLowerCase().startsWith(text)
        );
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (item) => item.category === category
        );
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter((item) => item.company === company);
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((item) =>
          item.colors.find((col) => col === color)
        );
      }
      if (shipping) {
        tempProducts = tempProducts.filter((item) => item.shipping === true);
      }
      tempProducts = tempProducts.filter((item) => item.price <= price);

      return { ...state, filtered_products: tempProducts };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          colors: 'all',
          category: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      return state;
  }
}

export default filter_reducer;
