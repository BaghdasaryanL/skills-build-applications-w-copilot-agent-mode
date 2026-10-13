import mongoose, { Schema, Types } from 'mongoose';

export interface UserRecord {
  name: string;
  email: string;
  teamId?: Types.ObjectId;
}

const userSchema = new Schema<UserRecord>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User || mongoose.model<UserRecord>('User', userSchema);
