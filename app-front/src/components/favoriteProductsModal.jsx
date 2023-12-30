// import { useState } from "react";
// import useGetProducts from "../hooks/useGetProducts";
// import Product from "./Product";
// import { Modal, Button, Card } from "react-bootstrap";

// const FavoriteProductsModal = (show) => {
//   const favoriteProducts = useGetProducts(true);
//   const [showModal, setShowModal] = useState(show);

//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   return (
//     <div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Favorite Products</Modal.Title>
//         </Modal.Header>
//         {/* {favoriteProducts.map((product) => {
//           return (
//             <div>

//             </div>
//           )
//           // <Product product={product} key={product._id} />;
//         })} */}
//         <div>This is my modal</div>
//       </Modal>
//     </div>
//   );
// };

// export default FavoriteProductsModal;
