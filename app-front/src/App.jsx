import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import SignOut from "./components/signOut";
import ProtectedRouteForBiz from "./components/common/protectedRouteForBiz";
import CreateProduct from "./components/createProduct.jsx";
import DeleteProduct from "./components/deleteProduct";
import EditProduct from "./components/editProduct";
import ShowProduct from "./components/showProduct";

function App() {
  return (
    <div
      className="app d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#FAEBD7" }}
    >
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signUp" element={<SignUp redirect="/" />} />
          <Route path="signIn" element={<SignIn redirect="/" />} />
          <Route path="signOut" element={<SignOut redirect="/" />} />
          <Route
            path="createProduct"
            element={
              <ProtectedRouteForBiz onlyBiz>
                <CreateProduct />
              </ProtectedRouteForBiz>
            }
          />
          <Route
            path="deleteProduct/:id"
            element={
              <ProtectedRouteForBiz onlyBiz>
                <DeleteProduct />
              </ProtectedRouteForBiz>
            }
          />
          <Route
            path="editProduct/:id"
            element={
              <ProtectedRouteForBiz onlyBiz>
                <EditProduct />
              </ProtectedRouteForBiz>
            }
          />
          <Route path="showProduct/:id" element={<ShowProduct />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
