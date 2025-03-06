const ProductModel = require("../models/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

//Create Product
exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */
  //File
  // //restruc จะไม่ได้รับ cover เข้ามาต้องจัดการก่อน >> middlewares
  const firebaseUrl = req.file.firebaseUrl;
  const { name, description, category, price } = req.body;
  if (!name || !description || !category || !price)
    return res.status(400).json({
      message: "All Fields is required",
    });
  const productDoc = await ProductModel.create({
    name,
    description,
    category,
    price,
    image: firebaseUrl,
  });
  res.json(productDoc);
};

//getProducts
exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  //Select * FROM POST WHERE POST.author = USER._id
  res.json(products);
};

//getProductsById
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      return res.status(404).send({
        message: "Product Not Found!",
      });
    }
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong while fetching the product!",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedData = {
      name,
      description,
      category,
      price,
    };

    // ถ้ามีการอัปโหลดรูปใหม่ ให้อัปเดต URL ของ Firebase Storage
    if (req.file && req.file.firebaseUrl) {
      updatedData.image = req.file.firebaseUrl;
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while updating the product",
    });
  }
};


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      return res.status(403).send({
        message: "You can not delete this product!",
      });
    }
    await productDoc.deleteOne();
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong while delete the product!",
    });
  }
};
