import { useState } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service";

const Index = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("file", product.image);
    formData.append("price", product.price);
    formData.append("category", product.category);

    ProductService.addProduct(formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product has been added successfully!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error adding the product. Please try again.",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image File:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm file:bg-blue-50 file:border-none file:rounded-md file:text-blue-700 file:px-4 file:py-2 cursor-pointer"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Index;
