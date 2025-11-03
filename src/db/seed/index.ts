import { connectDB, disconnectDB, mongoUrl } from "../connectMongoDB";
import seedRoles from "./role.seed";

async function seedAllData() {
    await connectDB(mongoUrl)
    await seedRoles();
    disconnectDB();
}

seedAllData().then(()=>{
    console.log("All data seeded successfully")
}).catch((error)=>{
    console.log("Error seeding data", error)
})