import mongoose, { Model, Schema, Types } from 'mongoose';

export interface UserRecord {
  name: string;
  email: string;
  teamId?: Types.ObjectId;
}

const userSchema: Schema<UserRecord> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User: Model<UserRecord> =
  mongoose.models.User ?? mongoose.model('User', userSchema);
