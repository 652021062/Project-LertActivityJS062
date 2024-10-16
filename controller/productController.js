const Product = require('../models/product');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve products: ' + err.message });
    }
};

// Get a specific product by ID
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving product: ' + err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { activity_name, details, number_of_applicants, time, activity_hours, date } = req.body;

    // ตรวจสอบค่าที่จำเป็น
    if (!activity_name || !details || number_of_applicants === undefined || !time || !activity_hours || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // ตรวจสอบและแปลงวันที่ให้เป็นประเภท Date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    const product = new Product({ 
        activity_name, 
        details, 
        number_of_applicants, 
        time, 
        activity_hours, 
        date: parsedDate 
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product: ' + err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    // ตรวจสอบว่ามีฟิลด์วันที่ใน req.body หรือไม่
    if (req.body.date) {
        const parsedDate = new Date(req.body.date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        req.body.date = parsedDate; 
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product: ' + err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting product: ' + err.message });
    }
};
