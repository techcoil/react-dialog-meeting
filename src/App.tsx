import { useEffect } from "react";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Page } from "./components/Page";
import { Page2 } from "./components/Page2";
import { DialogProvider } from "./DialogProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col h-screen">
        <menu className="flex gap-4 flex-shrink bg-blue-400 text-white p-2 items-center justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "underline" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/page"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "underline" : ""}`
            }
          >
            Go to Page 1
          </NavLink>
          <NavLink
            to="/page2"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "underline" : ""}`
            }
          >
            Go to Page 2
          </NavLink>
        </menu>
        <div className="bg-gray-100 flex-grow">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <div>Home page</div>,
      },
      {
        path: "page",
        element: <Page />,
      },
      {
        path: "page2",
        element: <Page2 />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {});
  return (
    <DialogProviderf>
      <RouterProvider router={router} />
    </DialogProviderf>
  );
}

export default App;
