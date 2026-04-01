import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product._id} className="col-sm-6 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <span className="badge bg-secondary mb-2">{product.category}</span>
              <p className="card-text">
                <strong>Price:</strong> ${product.price} <br />
                <strong>Stock:</strong> {product.stock} units
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;