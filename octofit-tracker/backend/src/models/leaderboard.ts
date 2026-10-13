import mongoose, { Model, Schema, Types } from 'mongoose';

export interface LeaderboardRecord {
  userId: Types.ObjectId;
  period: string;
  points: number;
  rank: number;
}

const leaderboardSchema: Schema<LeaderboardRecord> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    period: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

leaderboardSchema.index({ userId: 1, period: 1 }, { unique: true });

export const Leaderboard: Model<LeaderboardRecord> =
  mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);
