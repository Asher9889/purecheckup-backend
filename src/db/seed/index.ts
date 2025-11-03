import { connectDB, disconnectDB, mongoUrl } from "../connectMongoDB";
import seedRoles from "./role.seed";
import seedSuperAdmin from "./superAdmin.seed";

async function seedAllData() {
    await connectDB(mongoUrl)
    await seedRoles();
    await seedSuperAdmin();
    disconnectDB();
}

seedAllData().then(()=>{
    console.log("All data seeded successfully")
}).catch((error)=>{
    console.log("Error seeding data", error)
}).finally(()=> {
    process.exit(0);
})