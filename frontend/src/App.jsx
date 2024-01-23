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
import Cancellation from "./pages/Cancellations";
import VivaVoceHome from "./pages/VivaVoceHome";
import AccountsHome from "./pages/AccountsHome";
import RegistrationHome from "./pages/RegistrationHome";


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
      path: "/registrations",
      element: <RegistrationHome />,
    },
    {
      path: "/registrations/newstudent",
      element: <NewStudent />,
    },
    {
      path: "/cancellation",
      element: <Cancellation />,
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