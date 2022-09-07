import Navbar from "./navbar-m";
import Footer from "./footer-m";

export default function LayoutFile({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
