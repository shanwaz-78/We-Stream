import { useRoutes } from "react-router-dom";
import { ROUTES } from "../Constants/routes.jsx";
import Login from "../Pages/LoginPage/Login.jsx";
import Signup from "../Pages/SignupPage/Signup.jsx";
import Landing_page from "../Pages/Landing page/Landing_page.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import Stream_Page from "../Pages/Stream Page/Stream_Page.jsx";
import Protected_route from "../Components/Protected_route.jsx";

const AppRoutes = () => {
  return useRoutes([
    {
      path: ROUTES.LOGIN,
      exact: true,
      element: <Protected_route isProtected={false}><Login /></Protected_route>,
    },
    {
      path: ROUTES.SIGNUP,
      exact: true,
      element: <Protected_route isProtected={false}><Signup /></Protected_route>,
    },
    {
      path: ROUTES.HOME,
      exact: true,
      element: <Protected_route isProtected={false}><Landing_page /></Protected_route>
    },
    {
      path: ROUTES.DASHBOARD,
      exact: true,
      element: <Protected_route isProtected={true}><Dashboard /></Protected_route>
    },
    {
      path: ROUTES.STREAM,
      exact: true,
      element: <Protected_route isProtected={true}><Stream_Page /></Protected_route>
    }
  ]);
};

export default AppRoutes;
