export const SIDEBAR_OPEN = 'SIDEBAR_OPEN';
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE';
export const GET_PRODUCTS_BEGIN = 'GET_PRODUCTS_BEGIN';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const GET_SINGLE_PRODUCT_BEGIN = 'GET_SINGLE_PRODUCT_BEGIN';
export const GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS';
export const GET_SINGLE_PRODUCT_ERROR = 'GET_SINGLE_PRODUCT_ERROR';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const SET_GRIDVIEW = 'SET_GRIDVIEW';
export const SET_LISTVIEW = 'SET_LISTVIEW';
export const UPDATE_SORT = 'UPDATE_SORT';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT';
export const CLEAR_CART = 'CLEAR_CART';
export const COUNT_CART_TOTALS = 'COUNT_CART_TOTALS';

export const addToCart = (id, color, amount, product) => ({ type: ADD_TO_CART, payload: { id, color, amount, product } });

export const clearCart = () => ({ type: CLEAR_CART });

export const closeSidebar = () => ({ type: SIDEBAR_CLOSE });

export const removeItem = (id) => ({ type: REMOVE_CART_ITEM, payload: id });

export const toggleAmount = (id, value) => ({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });

export const openSidebar = () => ({ type: SIDEBAR_OPEN });

export const setGridView = () => ({ type: SET_GRIDVIEW });

export const setListView = () => ({ type: SET_LISTVIEW });

export const loadProducts = (products) => ({ type: LOAD_PRODUCTS, payload: products });
export const sortProducts = () => ({ type: SORT_PRODUCTS });

export const updateSort = (e) => {
  const { value } = e.target;
  return { type: UPDATE_SORT, payload: value };
};

export const updateFilters = (e) => {
  const { name } = e.target;
  let { value } = e.target;
  if (name === 'category') {
    value = e.target.textContent;
  }
  if (name === 'color') {
    value = e.target.dataset.color;
  }
  if (name === 'price') {
    value = Number(value);
  }
  if (name === 'shipping') {
    value = e.target.checked;
  }
  return { type: UPDATE_FILTERS, payload: { name, value } };
};

export const clearFilters = () => ({ type: CLEAR_FILTERS });
export const countCartTotals = () => ({ type: COUNT_CART_TOTALS });

export const getProductsBegin = () => ({ type: GET_PRODUCTS_BEGIN });
export const getProductsSuccess = (products) => ({ type: GET_PRODUCTS_SUCCESS, payload: products });
export const getProductsError = () => ({ type: GET_PRODUCTS_ERROR });
export const getSingleProductBegin = (url) => ({ type: GET_SINGLE_PRODUCT_BEGIN, payload: url});
export const getSingleProductSuccess = (single_product) => ({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: single_product });
export const getSingleProductError = () => ({ type: GET_SINGLE_PRODUCT_ERROR });
