import { connectDB, disconnectDB, mongoUrl } from "../connectMongoDB";
import seedRoles from "./role.seed";
import seedSuperAdmin from "./superAdmin.seed";

async function seedAllData() {
  try {
    await connectDB(mongoUrl);

    await seedRoles();
    await seedSuperAdmin();

    console.log("All data seeded successfully");
  } catch (error) {
    console.error("Error seeding data", error);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

seedAllData().finally(() => process.exit(0));
