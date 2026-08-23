import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name : String,
    discreption : String,
    tech : String,
    github : String,
    live : String, 
    docker : String,
});

export const project = mongoose.model('project', projectSchema);