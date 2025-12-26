import express from 'express';
import cookieParser from "cookie-parser";
import { config } from './config/index';
import cors from 'cors';
import apiRoutes from "./routes/index";
import { checkRouteExists, globalErrorHandler } from './utils/index';
import connectMongoDB from './db/connectMongoDB';
import path from 'path';
import compression from "compression";
import { authMiddleware } from './middlewares';
// import { authMiddleware } from './middlewares';

const app = express();

connectMongoDB().catch((err) => {
    console.log(err)
})


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174",  "https://purecheckup.com"],
  credentials: true
//   exposedHeaders: ["Content-Range", "X-Total-Count"],
}));


// Handle OPTIONS preflight for all routes




app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded());
app.use(cookieParser()); 

app.use(compression());


app.use("/api", apiRoutes)
app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});
console.log(path.join(__dirname, '../uploads'))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// app.use('/temp', express.static(path.join(__dirname, '../temp')));

app.use(checkRouteExists);
app.use(globalErrorHandler as any);

app.listen(config.port, () => {
    console.log(`Server is ruuning on Port ${config.port}`);
})