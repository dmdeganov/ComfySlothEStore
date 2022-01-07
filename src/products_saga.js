import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getProductsSuccess,
  getProductsError,
  GET_PRODUCTS_BEGIN,
} from './actions';
import { fetchProducts } from './api';

function* fetchProductsFlow() {
  try {
    const response = yield call(fetchProducts);
    yield put(getProductsSuccess(response));
  } catch {
    yield put(getProductsError());
  }
}

export default function* productsSaga() {
  yield takeLatest(GET_PRODUCTS_BEGIN, fetchProductsFlow);
}
