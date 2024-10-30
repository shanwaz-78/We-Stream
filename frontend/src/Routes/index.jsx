import { useRoutes } from "react-router-dom";
import { ROUTES } from "../Constants/routes.jsx";
import Login from "../Pages/LoginPage/Login.jsx";
import Signup from "../Pages/SignupPage/Signup.jsx";

const AppRoutes = () => {
  return useRoutes([
    {
      path: ROUTES.LOGIN,
      exact: true,
      element: <Login />,
    },
    {
      path: ROUTES.SIGNUP,
      exact: true,
      element: <Signup />,
    },
  ]);
};

export default AppRoutes;
