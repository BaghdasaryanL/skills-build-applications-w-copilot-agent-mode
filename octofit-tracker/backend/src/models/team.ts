import mongoose, { Schema, Types } from 'mongoose';

export interface TeamRecord {
  name: string;
  slug: string;
  description: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team =
  mongoose.models.Team || mongoose.model<TeamRecord>('Team', teamSchema);
