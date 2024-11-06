import { useRoutes } from "react-router-dom";
import { ROUTES } from "../Constants/routes.jsx";
import Login from "../Pages/LoginPage/Login.jsx";
import Signup from "../Pages/SignupPage/Signup.jsx";
import Landing_page from "../Pages/Landing page/Landing_page.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";

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
    {
      path: ROUTES.HOME,
      exact: true,
      element: <Landing_page />
    },
    {
      path: ROUTES.DASHBOARD,
      exact: true,
      element: <Dashboard />
    },
  ]);
};

export default AppRoutes;
