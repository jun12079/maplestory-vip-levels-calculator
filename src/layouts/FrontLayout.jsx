import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function FrontLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}