import axios from 'axios';
import { userLogout } from '../store/userSlice';

export const logoutUser = async (user, dispatch, removeCookie) => {

  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_AUTH}/logout/`);

    if (response.status === 200) {
      removeCookie('token')
      removeCookie('user');

      dispatch(userLogout());

      console.log('Logged out');
    } else {
      console.error("Can't logout");
    }
  } catch (error) {
    console.error('error while trying to logout:', error);
  }
};