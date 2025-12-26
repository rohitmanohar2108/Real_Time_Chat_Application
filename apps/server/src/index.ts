import http from "http";
import { Server as IOServer } from "socket.io";

async function init() {
    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000

    const io = new IOServer(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.id);

        socket.on("event: message", (payload) => {
            console.log("Received from client:", payload);
            const message = typeof payload === 'object' && payload !== null ? payload.message ?? payload : payload;
            io.emit("message", message);
        });

        socket.on("disconnect", (reason) => {
            console.log("Client disconnected", socket.id, reason);
        });
    });

    httpServer.listen(PORT , () => console.log(`HTTP Server started at PORT:${PORT}`));
}

init();