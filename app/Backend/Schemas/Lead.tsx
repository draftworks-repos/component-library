import mongoose, { Document, Schema, Types } from "mongoose";

export type LeadStatus = "new" | "contacted" | "closed";

export interface ILead extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  message?: string;
  fileUrl?: string;
  wantsMeeting: boolean;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema<ILead>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    company: { type: String },
    website: { type: String },
    message: { type: String },
    fileUrl: { type: String }, // This is where the uploaded file’s URL or path goes
    wantsMeeting: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
