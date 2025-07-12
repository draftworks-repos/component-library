import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  client: {
    name: string;
    initials: string;
  };
  email: string;
  phone: string;
  message: string;
  assigned: "BOE1" | "BOE2" | "BOE3" | "BOE4" | "BOE5";
  status: "pending" | "assigned" | "completed";
  action: "" | "trash";
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  client: {
    name: { type: String, required: true },
    initials: { type: String, required: true },
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  assigned: {
    type: String,
    enum: ["BOE1", "BOE2", "BOE3", "BOE4", "BOE5"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending",
  },
  action: {
    type: String,
    enum: ["", "trash"],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ILead>("Lead", LeadSchema);
