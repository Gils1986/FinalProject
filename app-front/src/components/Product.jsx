import { Link } from "react-router-dom";
import userService from "../services/userService";
import { useState } from "react";
import { useAuth } from "../context/auth.context";

const Product = ({
  product: {
    _id,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImage,
    isFavorite,
  },
}) => {
  const { user } = useAuth();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(isFavorite);

  const handleChange = (e) => {
    console.log("Is favorite card?", e.target.checked);
    if (e.target.checked) {
      userService.addFavoriteProduct(_id);
      setIsFavoriteProduct(true);
    } else {
      userService.removeFavoriteProduct(_id);
      setIsFavoriteProduct(false);
    }
  };

  return (
    <div className="card mx-2 mb-3  mt-3" style={{ width: "18rem" }}>
      <img className="card-img-top mt-3" src={productImage} alt={productName} />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          {productDescription}
          {/* .length <= 50
            ? productDescription
            : productDescription.substring(0, 50) + "..."} */}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{productPrice} NIS</li>
        {/* <li className="list-group-item">Quantity: {productQuantity}</li> */}
        {user ? (
          <li className="list-group-item">
            <div className="form-check my-1">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isFavoriteProduct}
                onChange={handleChange}
              />
              <label className="form-check-label">Favorites</label>
              <Link to={`/showProduct/${_id}`} className="card-link mx-5">
                show
              </Link>
            </div>
          </li>
        ) : null}
        {user?.biz ? (
          <li className="list-group-item">
            <Link to={`/editProduct/${_id}`} className="card-link mx-4">
              Edit
            </Link>
            <Link to={`/deleteProduct/${_id}`} className="card-link mx-5">
              Delete
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Product;
