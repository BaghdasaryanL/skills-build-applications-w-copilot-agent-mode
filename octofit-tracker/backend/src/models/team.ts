import mongoose, { Model, Schema, Types } from 'mongoose';

export interface TeamRecord {
  name: string;
  slug: string;
  description: string;
  members: Types.ObjectId[];
}

const teamSchema: Schema<TeamRecord> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team: Model<TeamRecord> =
  mongoose.models.Team ?? mongoose.model('Team', teamSchema);
