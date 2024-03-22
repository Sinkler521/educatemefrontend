import axios from "axios";

export const logoutUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_AUTH}/logout/`);
        if (response.status === 200) {
          console.log('User logged out successfully');
        } else {
          console.error('Failed to logout user');
        }
      } catch (error) {
        console.error('Error occurred while logging out user:', error);
      }
    };