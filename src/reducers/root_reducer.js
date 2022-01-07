import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cart_reducer from './cart_reducer';
import products_reducer from './products_reducer';
import filter_reducer from './filter_reducer';
import productsSaga from '../products_saga';
import singleProductSaga from '../singleProductSaga';

const sagaMiddleware = createSagaMiddleware();

const root_reducer = combineReducers({
  cart_reducer,
  products_reducer,
  filter_reducer,
});

const store = createStore(root_reducer, applyMiddleware(sagaMiddleware));
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

sagaMiddleware.run(productsSaga);
sagaMiddleware.run(singleProductSaga);

export default store;
