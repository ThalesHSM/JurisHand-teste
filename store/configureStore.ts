import {createStore, combineReducers} from 'redux';
import loggedInReducer from '../src/Redux/reducers/loggedInReducer';

const rootReducer = combineReducers({logged: loggedInReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
