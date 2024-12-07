import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 7 trains with different sources, destinations, and seat details
  const trains = [
    {
      trainNumber: '12345',
      trainName: 'Rajdhani Express',
      trainType: 'Superfast',
      totalSeats: 100,
      seatsAvailable: 100,
      bookedSeats: 0,
      source: 'New Delhi',
      destination: 'Mumbai',
    },
    {
      trainNumber: '54321',
      trainName: 'Shatabdi Express',
      trainType: 'Express',
      totalSeats: 150,
      seatsAvailable: 150,
      bookedSeats: 0,
      source: 'Kolkata',
      destination: 'Bangalore',
    },
    {
      trainNumber: '67890',
      trainName: 'Duronto Express',
      trainType: 'Duronto',
      totalSeats: 200,
      seatsAvailable: 200,
      bookedSeats: 0,
      source: 'Chennai',
      destination: 'Hyderabad',
    },
    {
      trainNumber: '11223',
      trainName: 'Nizamuddin Express',
      trainType: 'Express',
      totalSeats: 120,
      seatsAvailable: 120,
      bookedSeats: 0,
      source: 'Delhi',
      destination: 'Lucknow',
    },
    {
      trainNumber: '33456',
      trainName: 'Mysore Express',
      trainType: 'Superfast',
      totalSeats: 80,
      seatsAvailable: 80,
      bookedSeats: 0,
      source: 'Mysore',
      destination: 'Bangalore',
    },
    {
      trainNumber: '78901',
      trainName: 'Mumbai Local',
      trainType: 'Local',
      totalSeats: 50,
      seatsAvailable: 50,
      bookedSeats: 0,
      source: 'Mumbai',
      destination: 'Pune',
    },
    {
      trainNumber: '65432',
      trainName: 'Chennai Express',
      trainType: 'Express',
      totalSeats: 180,
      seatsAvailable: 180,
      bookedSeats: 0,
      source: 'Chennai',
      destination: 'Madurai',
    },
  ];

  // Insert trains into the database
  for (const train of trains) {
    await prisma.train.create({
      data: train,
    });
  }

  // Create users with unique usernames
  const users = [
    {
      name: 'Admin User',
      username: 'admin',
      password: 'adminpassword', // In a real scenario, hash the password
      role: 'admin',
    },
    {
      name: 'Regular User',
      username: 'user1',
      password: 'userpassword', // In a real scenario, hash the password
      role: 'user',
    },
    {
      name: 'Regular User 2',
      username: 'user2',
      password: 'userpassword2', // In a real scenario, hash the password
      role: 'user',
    },
    {
      name: 'Regular User 3',
      username: 'user3',
      password: 'userpassword3', // In a real scenario, hash the password
      role: 'user',
    },
  ];

  // Insert users into the database
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
