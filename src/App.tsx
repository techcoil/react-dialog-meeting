import { useEffect } from "react";
import "./App.css";
import { Drawer } from "./components/Drawer";
import { DialogProvider } from "./context";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import { Page } from "./components/Page";
import { Page2 } from "./components/Page2";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col h-screen">
        <menu className="flex gap-4 flex-shrink bg-blue-400 text-white p-2 items-center justify-center">
          <Link to="/page" className="hover:underline">
            Go to Page 1
          </Link>
          <Link to="/page2" className="hover:underline">
            Go to Page 2
          </Link>
        </menu>
        <div className="bg-gray-100 flex-grow">
          <Outlet />
        </div>
      </div>
    ),
    children: [
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
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  );
}

export default App;
