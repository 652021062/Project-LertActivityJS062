const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    activity_name: { type: String, required: true },      // ชื่อกิจกรรม
    details: { type: String, required: true },             // รายละเอียด
    number_of_applicants: { type: Number, required: true }, // จำนวนผู้สมัคร
    time: { type: String, required: true },                // เวลา
    activity_hours: { type: String, required: true },      // ชั่วโมงกิจกรรม
    date: { type: Date, required: true }                   // วันที่
}, 
{ 
    timestamps: true, 
    versionKey: false 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
