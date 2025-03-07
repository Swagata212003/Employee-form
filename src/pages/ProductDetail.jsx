import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="fw-bold">Price: ${product.price}</p>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
          <button className="btn btn-success">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
