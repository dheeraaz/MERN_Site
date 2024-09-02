import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";

// middlewares
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true, // allow sending cookies
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// error middleware
app.use(errorMiddleware);

// Routes Import
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import serviceRouter from "./routes/service.routes.js";
import adminRouter from "./routes/admin.routes.js"

// Routes Declaration
app.use("/", homeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/admin", adminRouter)

// app.get("/", (req, res) => {
//   res.status(200).send("check check");
// });

export { app };
