
import path from "node:path";
import express, { Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config({ path: ".env", quiet: true });

const app = express();

// Set up routes
app.use(express.static(path.join("src", "assets")));
app.use(express.static(path.join("dist", "assets")));
app.use("/shared", express.static(path.join("dist", "shared")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.resolve(".", "src", "assets", "pages", "index.html"));
});

// Set up server
const port = process.env.PORT;
const httpServer = createServer(app);

httpServer.listen(port);
console.log(`Listening to port ${port}`);
