import dotenv from "dotenv";
dotenv.config();
import express from "express"
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import path from "path";

// MongoDB Connection
import connectToDb from "./Config/db.js";

// Routes
import indexRouter from './Routes/Index.js';
import FileRouter from './Routes/File.js';
import AuthRouter from './Routes/Auth.js';

// --- MIDDLEWARES ---
// ✅ Cookie parser FIRST
app.use(cookieParser());
// ✅ CORS
const corsOptions = {
    origin: ["https://team-collab-sable.vercel.app/","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// JSON & URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Express Session (after cookieParser, before passport)
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    },
}));

// serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


connectToDb(); // ✅ wait for MongoDB before loading routes

// Routes
app.use("/", indexRouter);
app.use("/file", FileRouter);
app.use("/auth", AuthRouter);

// --- START SERVER AFTER DB CONNECTS ---
const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
