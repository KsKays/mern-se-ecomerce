import React, { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // เก็บไฟล์รูปที่เลือก

  // โหลดรายการสินค้า
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch products.", "error");
    }
  };

  // เปิด Modal แก้ไขสินค้า
  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setSelectedImage(null); // เคลียร์ไฟล์รูปที่เลือกก่อนหน้า
    setIsModalOpen(true);
  };

  // ลบสินค้า
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  // อัปเดตไฟล์รูปภาพใหม่
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setEditProduct((prev) => ({
        ...prev,
        image: URL.createObjectURL(file), // แสดงตัวอย่างภาพใหม่
      }));
    }
  };

  // บันทึกการแก้ไขสินค้า
  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("category", editProduct.category);

      if (selectedImage) {
        formData.append("file", selectedImage); // อัปโหลดภาพใหม่ถ้ามี
      }

      await ProductService.updateProduct(editProduct._id, formData);
      fetchProducts(); // โหลดข้อมูลใหม่หลังอัปเดต
      setIsModalOpen(false);
      Swal.fire(
        "Updated!",
        "Product has been updated successfully.",
        "success"
      );
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Manage Products
      </h2>
      <div className="overflow-x-auto rounded-lg">
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
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
                      className="btn"
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

      {isModalOpen && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {editProduct.image && (
                <img
                  src={editProduct.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category: e.target.value,
                  })
                }
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
                onClick={handleSaveEdit}
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
