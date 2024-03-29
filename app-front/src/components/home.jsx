import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import { useGetProducts } from "../hooks/useGetProducts";
import Product from "./Product";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import getPriceRangeFromString from "../utils/stringHandler";

const Home = () => {
  const [productsFilter, setProductsFilter] = useState("");

  const [filterBy, setFilterBy] = useState("productName");
  const [filterByPrettyName, setFilterByPrettyName] = useState("Name");
  const [isAdvancedFilter, setIsAdvanceFilter] = useState(false);
  const [priceRange, setPriceRange] = useState("placeholder");

  const { user, favoritesP } = useAuth();
  const products = useGetProducts();
  const [showFavorites, setShowFavorites] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts([...products]);
      if (filterBy !== "productPrice") {
        // Filter products if user entered text in the search field
        if (productsFilter.trim().length > 0) {
          let arrFilteredProducts = products.filter((product) =>
            product[filterBy]
              .toLowerCase()
              .includes(productsFilter.toLowerCase())
          );
          setFilteredProducts(arrFilteredProducts);
        }
      }
    }
  }, [products, filterBy, productsFilter]);

  const handleChangeFilterBy = (event) => {
    setFilterBy(event.target.value);
    setProductsFilter("");
    if (event.target.value === "productName") {
      setFilterByPrettyName("Name");
    } else if (event.target.value === "productDescription") {
      setFilterByPrettyName("Description");
    } else if (event.target.value === "productPrice") {
      setFilterByPrettyName("Price");
    }
  };

  const handleChangePriceRange = (event) => {
    const priceRangeStr = event.target.value;
    const arrPriceRange = getPriceRangeFromString(priceRangeStr);
    let arrFilteredProducts = [...products];
    // Filter products by the price range
    arrFilteredProducts = products.filter(
      (product) =>
        product["productPrice"] >= arrPriceRange[0] &&
        product["productPrice"] <= arrPriceRange[1]
    );
    setFilteredProducts(arrFilteredProducts);
    setPriceRange(event.target.value);
  };

  const handleChangeAdvancedFilter = () => {
    if (isAdvancedFilter) {
      setFilterByPrettyName("Name");
      setFilterBy("productName");
      setProductsFilter("");
    }

    setIsAdvanceFilter((val) => !val);
  };

  const filterProducts = (val) => {
    setProductsFilter(val);
  };

  const handleClose = () => setShowFavorites(false);

  const handleShow = () => {
    setShowFavorites(true);
  };

  const handleDisplayTable = () => {
    setDisplayTable((val) => !val);
  };

  return (
    <>
      <PageHeader title={"The Perfect Gift"} description={""} />
      <div className="container mt-4">
        <div className="row">
          {filterBy !== "productPrice" ? (
            <input
              className="col-sm-2"
              type="search"
              placeholder={"Search by " + filterByPrettyName}
              aria-label="Search"
              onChange={(e) => filterProducts(e.target.value)}
              value={productsFilter}
            />
          ) : (
            <select
              className="col-sm-2"
              value={priceRange}
              onChange={handleChangePriceRange}
            >
              <option value="placeholder" disabled>
                Select price range
              </option>
              <option value="10-99">from: 10 NIS &nbsp; to: 99 NIS</option>
              <option value="100-399">from: 100 NIS &nbsp; to: 399 NIS</option>
              <option value="400-9999">
                from: 400 NIS &nbsp; to: 9999 NIS
              </option>
            </select>
          )}

          {isAdvancedFilter && (
            
            <select
              className="col-sm-2 mx-2"
              value={filterBy}
              onChange={handleChangeFilterBy}
            >
              <br/>
              <option value="productName">Name</option>
              <option value="productDescription">Description</option>
              <option value="productPrice">Price</option>
            </select>
          )}

          <button
            onClick={(e) => handleChangeAdvancedFilter()}
            style={{ width: "110px" }}
            className="mx-1"
          >
            {isAdvancedFilter ? "Minimal" : "Advanced"}
          </button>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            {user ? (
              <>
                <button onClick={handleShow} className="mx-1">
                  Show Favorites
                </button>
              </>
            ) : null}

            <button onClick={handleDisplayTable} className="mx-1">
              Change Display
            </button>
          </div>
        </div>
        {user?.biz ? (
          <Link
            style={{ color: "black" }}
            className="row mt-3"
            to="/createProduct"
          >
            Create Product
          </Link>
        ) : null}
      </div>
      {displayTable ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    style={{ maxHeight: "80px" }}
                    className="img-fluid"
                    src={product.productImage}
                    alt={product.productName}
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.productPrice} NIS</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          {!filteredProducts || !filteredProducts.length ? (
            <p>no products...</p>
          ) : (
            filteredProducts.map((product, index) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>
      )}
      {user ? (
        <Modal show={showFavorites} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Favorite Products</Modal.Title>
          </Modal.Header>
          <div>
            {favoritesP?.map((product) => {
              return <Product product={product} key={product._id} />;
            })}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Home;
