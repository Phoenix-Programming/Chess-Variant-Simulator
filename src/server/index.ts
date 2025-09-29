import path from "node:path";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config({ path: ".env", quiet: true });

const app = express();

// Set up routes
app.use("/assets", express.static(path.join("dist", "assets")));
app.use("/shared", express.static(path.join("dist", "shared")));
app.use("/public", express.static(path.join("public")));

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.resolve(".", "dist", "index.html"));
});

// Set up server
const port = process.env.PORT;
const httpServer = createServer(app);

httpServer.listen(port);
console.log(`Listening to port ${port}`);
