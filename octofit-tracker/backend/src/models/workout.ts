import mongoose, { Model, Schema } from 'mongoose';

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface WorkoutRecord {
  slug: string;
  title: string;
  description: string;
  activityType: string;
  durationMinutes: number;
  difficulty: WorkoutDifficulty;
}

const workoutSchema: Schema<WorkoutRecord> = new Schema(
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

export const Workout: Model<WorkoutRecord> =
  mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
