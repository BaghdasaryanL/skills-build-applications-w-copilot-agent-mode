import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const users = await Promise.all([
      User.findOneAndUpdate(
        { email: 'maya.chen@example.com' },
        { $set: { name: 'Maya Chen' } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'leo.martinez@example.com' },
        { $set: { name: 'Leo Martinez' } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'imani.johnson@example.com' },
        { $set: { name: 'Imani Johnson' } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'noah.patel@example.com' },
        { $set: { name: 'Noah Patel' } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ),
    ]);

    const userByEmail = new Map(users.map((user) => [user.email, user]));
    const teamSeeds = [
      {
        slug: 'morning-milers',
        name: 'Morning Milers',
        description: 'A friendly crew building a consistent running habit.',
        members: ['maya.chen@example.com', 'leo.martinez@example.com'],
      },
      {
        slug: 'weekend-warriors',
        name: 'Weekend Warriors',
        description: 'Strength and cardio sessions to make weekends count.',
        members: ['imani.johnson@example.com', 'noah.patel@example.com'],
      },
    ];

    const teams = await Promise.all(
      teamSeeds.map(({ slug, name, description }) =>
        Team.findOneAndUpdate(
          { slug },
          { $set: { name, description } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ),
      ),
    );
    const teamBySlug = new Map(teams.map((team) => [team.slug, team]));

    for (const { slug, members } of teamSeeds) {
      const team = teamBySlug.get(slug);
      if (!team) {
        throw new Error(`Seeded team "${slug}" could not be found`);
      }

      const memberIds = members.map((email) => {
        const user = userByEmail.get(email);
        if (!user) {
          throw new Error(`Seeded user "${email}" could not be found`);
        }
        return user._id;
      });

      await Team.updateOne({ _id: team._id }, { $set: { members: memberIds } });
      await User.updateMany(
        { _id: { $in: memberIds } },
        { $set: { teamId: team._id } },
      );
    }

    const activitySeeds = [
      { seedKey: 'maya-run-1', email: 'maya.chen@example.com', type: 'running' as const, durationMinutes: 34, calories: 285, distanceKm: 5.2, daysAgo: 1 },
      { seedKey: 'maya-strength-1', email: 'maya.chen@example.com', type: 'strength' as const, durationMinutes: 42, calories: 240, daysAgo: 3 },
      { seedKey: 'leo-run-1', email: 'leo.martinez@example.com', type: 'running' as const, durationMinutes: 28, calories: 250, distanceKm: 4.1, daysAgo: 2 },
      { seedKey: 'imani-cycle-1', email: 'imani.johnson@example.com', type: 'cycling' as const, durationMinutes: 48, calories: 390, distanceKm: 16.5, daysAgo: 1 },
      { seedKey: 'imani-walk-1', email: 'imani.johnson@example.com', type: 'walking' as const, durationMinutes: 30, calories: 130, distanceKm: 2.4, daysAgo: 4 },
      { seedKey: 'noah-strength-1', email: 'noah.patel@example.com', type: 'strength' as const, durationMinutes: 50, calories: 310, daysAgo: 2 },
    ];

    for (const activity of activitySeeds) {
      const user = userByEmail.get(activity.email);
      if (!user) {
        throw new Error(`Seeded user "${activity.email}" could not be found`);
      }

      const { email: _email, daysAgo, ...record } = activity;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      await Activity.findOneAndUpdate(
        { seedKey: record.seedKey },
        { $set: { ...record, userId: user._id, date } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    const period = new Date().toISOString().slice(0, 7);
    const leaderboardSeeds = [
      { email: 'maya.chen@example.com', points: 420, rank: 1 },
      { email: 'imani.johnson@example.com', points: 390, rank: 2 },
      { email: 'noah.patel@example.com', points: 350, rank: 3 },
      { email: 'leo.martinez@example.com', points: 315, rank: 4 },
    ];

    for (const entry of leaderboardSeeds) {
      const user = userByEmail.get(entry.email);
      if (!user) {
        throw new Error(`Seeded user "${entry.email}" could not be found`);
      }

      await LeaderboardEntry.findOneAndUpdate(
        { userId: user._id, period },
        { $set: { points: entry.points, rank: entry.rank } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    const workoutSeeds = [
      {
        slug: 'easy-5k-run',
        title: 'Easy 5K Run',
        description: 'A relaxed conversational-pace run to build aerobic fitness.',
        activityType: 'running',
        durationMinutes: 35,
        difficulty: 'beginner' as const,
      },
      {
        slug: 'full-body-strength',
        title: 'Full-Body Strength',
        description: 'A balanced circuit of bodyweight squats, push-ups, and lunges.',
        activityType: 'strength',
        durationMinutes: 40,
        difficulty: 'intermediate' as const,
      },
      {
        slug: 'steady-cycle',
        title: 'Steady Cycle',
        description: 'A moderate ride focused on steady cadence and endurance.',
        activityType: 'cycling',
        durationMinutes: 45,
        difficulty: 'beginner' as const,
      },
      {
        slug: 'recovery-walk',
        title: 'Recovery Walk',
        description: 'A brisk low-impact walk to support active recovery.',
        activityType: 'walking',
        durationMinutes: 30,
        difficulty: 'beginner' as const,
      },
    ];

    for (const workout of workoutSeeds) {
      const { slug, ...fields } = workout;
      await Workout.findOneAndUpdate(
        { slug },
        { $set: fields },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] =
      await Promise.all([
        User.countDocuments(),
        Team.countDocuments(),
        Activity.countDocuments(),
        LeaderboardEntry.countDocuments({ period }),
        Workout.countDocuments(),
      ]);
    console.info(
      `Seed complete: ${userCount} users, ${teamCount} teams, ${activityCount} activities, ${leaderboardCount} leaderboard entries for ${period}, ${workoutCount} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Failed to close the database connection after seeding:', error);
  process.exitCode = 1;
});
