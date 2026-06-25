import "dotenv/config";
import dns from "dns";

import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const seedUsers = [
  [
    "seed_alex_chen",
    "Rohan Singh",
    "rohan.singh@example.com",
    "https://i.pravatar.cc/150?img=1",
  ],
  [
    "seed_sam_taylor",
    "Aman Kumar",
    "aman.kumar@example.com",
    "https://i.pravatar.cc/150?img=2",
  ],
  [
    "seed_jordan_lee",
    "Priya Sharma",
    "priya.sharma@example.com",
    "https://i.pravatar.cc/150?img=3",
  ],
  [
    "seed_maya_patel",
    "Neha Verma",
    "neha.verma@example.com",
    "https://i.pravatar.cc/150?img=4",
  ],
  [
    "seed_casey_morgan",
    "Rahul Yadav",
    "rahul.yadav@example.com",
    "https://i.pravatar.cc/150?img=5",
  ],
  [
    "seed_riley_kim",
    "Sneha Gupta",
    "sneha.gupta@example.com",
    "https://i.pravatar.cc/150?img=6",
  ],
  [
    "seed_taylor_brooks",
    "Vikash Kumar",
    "vikash.kumar@example.com",
    "https://i.pravatar.cc/150?img=7",
  ],
  [
    "seed_jamie_wilson",
    "Pooja Singh",
    "pooja.singh@example.com",
    "https://i.pravatar.cc/150?img=8",
  ],
  [
    "seed_morgan_reed",
    "Arjun Raj",
    "arjun.raj@example.com",
    "https://i.pravatar.cc/150?img=9",
  ],
  [
    "seed_avery_scott",
    "Anjali Kumari",
    "anjali.kumari@example.com",
    "https://i.pravatar.cc/150?img=10",
  ],
  [
    "seed_quinn_parker",
    "Saurabh Mishra",
    "saurabh.mishra@example.com",
    "https://i.pravatar.cc/150?img=11",
  ],
  [
    "seed_drew_hayes",
    "Kavita Sharma",
    "kavita.sharma@example.com",
    "https://i.pravatar.cc/150?img=12",
  ],
  [
    "seed_skyler_evans",
    "Deepak Kumar",
    "deepak.kumar@example.com",
    "https://i.pravatar.cc/150?img=13",
  ],
  [
    "seed_harper_lane",
    "Nisha Verma",
    "nisha.verma@example.com",
    "https://i.pravatar.cc/150?img=14",
  ],
  [
    "seed_charlie_bennett",
    "Abhishek Singh",
    "abhishek.singh@example.com",
    "https://i.pravatar.cc/150?img=15",
  ],
  [
    "seed_emerson_gray",
    "Shweta Kumari",
    "shweta.kumari@example.com",
    "https://i.pravatar.cc/150?img=16",
  ],
  [
    "seed_finley_price",
    "Ravi Kumar",
    "ravi.kumar@example.com",
    "https://i.pravatar.cc/150?img=17",
  ],
  [
    "seed_rowan_blake",
    "Aarti Devi",
    "aarti.devi@example.com",
    "https://i.pravatar.cc/150?img=18",
  ],
  [
    "seed_sage_cooper",
    "Manish Yadav",
    "manish.yadav@example.com",
    "https://i.pravatar.cc/150?img=19",
  ],
  [
    "seed_reese_carter",
    "Ricky Roushan",
    "ricky.roushan@example.com",
    "https://i.pravatar.cc/150?img=20",
  ],
];

async function seedDatabase() {
  await connectDB();

  const result = await User.bulkWrite(
    seedUsers.map(([clerkId, fullName, email, profilePic]) => ({
      updateOne: {
        filter: { clerkId },
        update: {
          $set: { clerkId, fullName, email, profilePic },
        },
        upsert: true,
      },
    })),
  );

  console.log(
    `Seeded users. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`,
  );
}

seedDatabase()
  .catch((error) => {
    console.error("Failed to seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
