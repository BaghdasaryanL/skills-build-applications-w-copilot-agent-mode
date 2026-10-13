import mongoose, { Schema } from 'mongoose';

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface WorkoutRecord {
  slug: string;
  title: string;
  description: string;
  activityType: string;
  durationMinutes: number;
  difficulty: WorkoutDifficulty;
}

const workoutSchema = new Schema<WorkoutRecord>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
  },
  { timestamps: true },
);

export const Workout =
  mongoose.models.Workout || mongoose.model<WorkoutRecord>('Workout', workoutSchema);
