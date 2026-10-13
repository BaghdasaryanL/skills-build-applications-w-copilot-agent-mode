import mongoose, { Model, Schema, Types } from 'mongoose';

export type ActivityType = 'running' | 'cycling' | 'strength' | 'walking';

export interface ActivityRecord {
  seedKey: string;
  userId: Types.ObjectId;
  type: ActivityType;
  durationMinutes: number;
  calories: number;
  distanceKm?: number;
  date: Date;
}

const activitySchema: Schema<ActivityRecord> = new Schema(
  {
    seedKey: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'strength', 'walking'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity: Model<ActivityRecord> =
  mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
