import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import NewStudent from "./pages/NewStudent";
import Extension from "./pages/Extension";
import VivaVoceHome from "./pages/VivaVoceHome";
import AccountsHome from "./pages/AccountsHome";
import RegistrationHome from "./pages/RegistrationHome";
import NewRegistration from "./pages/NewRegistration";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <RegistrationHome />,
    },
    {
      path: "/registrations/add",
      element: <NewRegistration />,
    },
    {
      path: "/registrations/newstudent",
      element: <NewStudent />,
    },
    {
      path: "/extension",
      element: <Extension />,
    },
    {
      path: "/vivavoce",
      element: <VivaVoceHome />,
    },
    {
      path: "/Accounts",
      element: <AccountsHome />,
    },
    {
      path: "/*",
      element: <div>Page Not Found</div>,
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;