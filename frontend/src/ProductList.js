import React, { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://inventory-backend-88x9.onrender.com/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total + product.quantity * parseFloat(product.price),
    0
  );

  return (
    <div className="container">
      <div className="card">
        <h1>📦 Inventory Management System</h1>

        <div className="stats">
          <div className="stat-card">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>

          <div className="stat-card">
            <h3>₹{totalInventoryValue.toLocaleString()}</h3>
            <p>Inventory Value</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          Total Products: {products.length}
        </div>
      </div>
    </div>
  );
}

export default ProductList;