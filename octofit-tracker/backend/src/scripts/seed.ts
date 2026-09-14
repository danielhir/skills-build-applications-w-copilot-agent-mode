import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trailblazers',
        description: 'A steady team focused on building healthy habits.',
        color: '#2f855a',
        memberUsernames: ['alex.rivera', 'jamie.chen'],
      },
      {
        name: 'Peak Performers',
        description: 'Friendly competition with a focus on personal bests.',
        color: '#c05621',
        memberUsernames: ['sam.taylor', 'riley.morgan'],
      },
    ]);

    const users = await User.insertMany([
      { username: 'alex.rivera', email: 'alex.rivera@example.com', displayName: 'Alex Rivera', teamId: teams[0]._id },
      { username: 'jamie.chen', email: 'jamie.chen@example.com', displayName: 'Jamie Chen', teamId: teams[0]._id },
      { username: 'sam.taylor', email: 'sam.taylor@example.com', displayName: 'Sam Taylor', teamId: teams[1]._id },
      { username: 'riley.morgan', email: 'riley.morgan@example.com', displayName: 'Riley Morgan', teamId: teams[1]._id },
    ]);

    await Activity.insertMany([
      { username: users[0].username, type: 'Running', durationMinutes: 32, distanceMiles: 3.1, points: 95, completedAt: new Date('2026-09-10') },
      { username: users[1].username, type: 'Strength training', durationMinutes: 40, points: 80, completedAt: new Date('2026-09-11') },
      { username: users[2].username, type: 'Cycling', durationMinutes: 45, distanceMiles: 10.5, points: 120, completedAt: new Date('2026-09-12') },
      { username: users[3].username, type: 'Walking', durationMinutes: 35, distanceMiles: 2.2, points: 55, completedAt: new Date('2026-09-12') },
    ]);

    await Leaderboard.insertMany([
      { username: users[2].username, teamName: teams[1].name, points: 420, activitiesCompleted: 8, rank: 1 },
      { username: users[0].username, teamName: teams[0].name, points: 390, activitiesCompleted: 7, rank: 2 },
      { username: users[1].username, teamName: teams[0].name, points: 350, activitiesCompleted: 6, rank: 3 },
      { username: users[3].username, teamName: teams[1].name, points: 315, activitiesCompleted: 6, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Fresh Start Run',
        type: 'Running',
        difficulty: 'Beginner',
        durationMinutes: 25,
        description: 'An easy interval run to build a consistent cardio routine.',
        target: 'Cardio',
      },
      {
        title: 'Full Body Basics',
        type: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        description: 'A balanced bodyweight circuit for strength and stability.',
        target: 'Strength',
      },
      {
        title: 'Mobility Reset',
        type: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 15,
        description: 'A short mobility flow for recovery after active days.',
        target: 'Flexibility',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
