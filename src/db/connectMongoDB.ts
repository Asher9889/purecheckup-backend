import mongoose, { Connection } from "mongoose";
import { config } from "../config/index";
import { ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

async function connectMongoDB(): Promise<Connection | undefined> {
    try {
        const mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}:${config.mongoPort}/${config.dbName}?authSource=${config.mongoAuthSource}`;
        
        await mongoose.connect(mongoUrl);

        const connection = mongoose.connection;
        console.log(`MongoDB connected to ${connection.name} database`);
        return connection;
    } catch (error) {
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to connect to MongoDb");
    }
}

mongoose.connection.on("connecting", () => {
    console.log("trying to connect");
});

mongoose.connection.on("connected", () => {
    console.log("Successfully connected");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default connectMongoDB;
