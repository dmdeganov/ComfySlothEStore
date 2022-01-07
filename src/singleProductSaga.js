import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getSingleProductSuccess,
  getSingleProductError,
  GET_SINGLE_PRODUCT_BEGIN,
} from './actions';
import { fetchSingleProduct } from './api';

function* fetchSingleProductFlow(action) {
  try {
    const response = yield call(fetchSingleProduct, action.payload);
    yield put(getSingleProductSuccess(response));
  } catch (error) {
    yield put(getSingleProductError());
  }
}

export default function* singleProductSaga() {
  yield takeLatest(GET_SINGLE_PRODUCT_BEGIN, fetchSingleProductFlow);
}
