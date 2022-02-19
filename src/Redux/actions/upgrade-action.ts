import {LOGGED_IN} from '../constants';
export function changeLoggedIn(data: string) {
  return {
    type: LOGGED_IN,
    payload: data,
  };
}
