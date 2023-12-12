const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastName: String,
    mobile: Number,
    address1: String,
    address2: String,
    state: String,
    city: String,
    country: String,
    zipCode: Number
});


RegisterSchema.index({ email: 1 });

const RegisterModel = mongoose.model("register", RegisterSchema);

module.exports = RegisterModel;
