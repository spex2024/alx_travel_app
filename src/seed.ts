import { connectDatabase, disconnectDatabase } from './database';
import User from './models/User';

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 25
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    age: 35
  },
  {
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    age: 28
  }
];

const seedDatabase = async () => {
  try {
    await connectDatabase();
    console.log('Connected to database for seeding...');
    
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');
    
    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Successfully seeded ${users.length} users:`);
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
};

seedDatabase();