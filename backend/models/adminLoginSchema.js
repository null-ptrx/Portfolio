import mongoose from 'mongoose'

const adminLoginSchema = new mongoose.Schema({
    email : String,
    password : String,
});
export const adminLogin = mongoose.model('adminLogin', adminLoginSchema);