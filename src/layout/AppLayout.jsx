import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <section className="flex h-screen flex-col gap-y-4">
      <Nav />
      <div className="">
        <Outlet />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </section>
  );
}
