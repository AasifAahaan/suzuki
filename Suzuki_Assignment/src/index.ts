import express, { Express } from 'express';
import helmet from 'helmet';
import "dotenv/config";
import dotenv from "dotenv";
import { createServer } from 'http';
import cors from "cors";
import { connectToDatabase } from '../config/database';
import userRoutes from "../src/routes/index"
import { config } from '../config/config';

const port = config.PORT || 4000;

dotenv.config();
dotenv.config({
    path: ".env",
    override: true,
});

// Use Helmet to help secure Express apps with various HTTP headers
const app: Express = express();
createServer(app);
app.use(helmet());
app.use(express.json());
app.use(cors())

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static('public'));

app.use(
    cors({
        origin: config.ALLOWED_DOMAINS?.split(" "),
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

// CREATE AN ARRAY OF ALL ROUTES ... 
app.use("/api", userRoutes)

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
});
