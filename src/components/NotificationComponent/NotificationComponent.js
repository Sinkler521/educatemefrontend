import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NotificationComponent = (props) => { // only one prop is position (top-right top-center etc)
  return (
      <>
        <ToastContainer
          position={props.position}
          autoClose="2000"
          hideProgressBar="false"
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
  )
}