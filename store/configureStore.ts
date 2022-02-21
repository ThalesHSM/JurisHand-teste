import {createStore, combineReducers} from 'redux';
import loggedInReducer from '../src/redux/reducers/loggedInReducer';

const rootReducer = combineReducers({logged: loggedInReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
