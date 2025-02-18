import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import PageTitle from "./components/PageTitle";
import { Toaster } from "sonner";
import TopLoaderBar from "./components/TopLoaderBar";
import LoaderScreen from "./components/LoaderScreen";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootMain />,
    children: [
      {
        path: "/",
        index: true,
        lazy: () => import("./routes/Home"),
      },
      {
        path: "/dashboard",
        lazy: () => import("./routes/Dashboard"),
      },
      {
        path: "/auth/sign-in",
        lazy: () => import("./routes/AuthPage"),
      },
      {
        path: "/auth/sign-up",
        lazy: () => import("./routes/AuthPage"),
      },
    ],
  },
]);
function RootMain() {
  return (
    <>
      <TopLoaderBar />
      <Outlet />
    </>
  );
}

function App() {
  PageTitle();
  return (
    <>
      <Toaster duration={1500} position="top-center" />
      <RouterProvider fallbackElement={<LoaderScreen />} router={router} />
    </>
  );
}

export default App;
