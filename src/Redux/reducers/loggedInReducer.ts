import {LOGGED_IN} from '../constants';
const initialState = {
  uid: '',
};
const loggedInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        logged: action.payload,
      };
    default:
      return state;
  }
};
export default loggedInReducer;
