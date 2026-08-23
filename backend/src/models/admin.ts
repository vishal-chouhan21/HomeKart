import mongoose, { Schema, Document } from "mongoose";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
