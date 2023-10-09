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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Appointment />} />
      <Route path="photo-library" element={<PhotoLibrary />} />
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
