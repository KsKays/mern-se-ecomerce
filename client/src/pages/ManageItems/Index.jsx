import React, { useState, useEffect } from 'react';
import ProductService from '../../services/product.service';
import Swal from 'sweetalert2';

const ManageItems = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    _id: '',
    name: '',
    description: '',
    image: null,
    price: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState(null);  // State for managing new image file

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    ProductService.getAllProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleEdit = (product) => {
    setEditingProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      image: product.image, // Keep existing image URL for display
      price: product.price,
      category: product.category
    });
    setImageFile(null);  // Clear any previously selected image file
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.deleteProduct(id)
          .then(() => {
            setProducts(products.filter(product => product._id !== id));
            Swal.fire('Deleted!', 'Product has been removed.', 'success');
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'Failed to delete product.', 'error');
          });
      }
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);  // Set new image file
      setEditingProduct({
        ...editingProduct,
        image: URL.createObjectURL(e.target.files[0]) // Update preview image
      });
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('name', editingProduct.name);
    formData.append('description', editingProduct.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('price', editingProduct.price);
    formData.append('category', editingProduct.category); // Update the category directly

    ProductService.updateProduct(editingProduct._id, formData)
      .then(() => {
        setProducts(products.map(product =>
          product._id === editingProduct._id ? { ...product, ...editingProduct, image: editingProduct.image } : product
        ));
        setIsModalOpen(false);
        Swal.fire('Updated!', 'Product has been updated successfully.', 'success');
      })
      .catch(error => {
        console.error('Error updating product:', error);
        Swal.fire('Error!', 'Failed to update product.', 'error');
      });
  };

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Category</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">{product.description}</td>
                <td className="border p-3">{product.price}</td>
                <td className="border p-3">{product.category}</td>
                <td className="border p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {editingProduct.image && (
                <img src={editingProduct.image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
