import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Appointment from "./pages/Appointment";
import AppLayout from "./layout/AppLayout";
import PhotoLibrary from "./pages/PhotoLibrary";
import Page404 from "./pages/Page404";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import "react-loading-skeleton/dist/skeleton.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route exact errorElement={<ErrorBoundary />}>
        <Route index element={<Appointment />} />
        <Route path="photo-library" element={<PhotoLibrary />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>,
  ),
);

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "gray",
            color: "white",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
