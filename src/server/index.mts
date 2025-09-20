
import path from "node:path";
import express, { Request, Response } from "express";
import { createServer } from "http";

const app = express();

// Set up routes
app.use(express.static(path.join("src", "assets")));
app.use(express.static(path.join("dist", "assets")));
app.use("/shared", express.static(path.join("dist", "shared")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.resolve(".", "src", "assets", "pages", "index.html"));
});

// Set up server
const httpServer = createServer(app);

httpServer.listen(8000);
console.log("Listening to port 8000");
