const http = require("http");
const app = require("./app.js");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const driverConnections = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("driverconnect", (driverId) => {
    driverConnections[driverId] = socket.id;
    console.log(`Driver ${driverId} connected with socket ID: ${socket.id}`);
  });

  socket.on("lookingfordriver", (data) => {
    console.log(data);

    const allDrivers = Object.values(driverConnections);

    if (allDrivers.length > 0) {
      const driverSocketId = allDrivers[0];
      socket.to(driverSocketId).emit("popupdata", data);
      console.log(`Sent popup to driver ${driverSocketId}`);
    } else {
      console.log("No drivers online");
    }
  });
  socket.on("rideaccepted", (data) => {
    console.log("Driver accepted ride:", data);
    const driverId = data.driverId || data.ride?.driverId;
    
    if (driverId) {
      // Broadcast ride acceptance to all connected clients (passenger will receive it)
      io.emit("rideacceptedbydriver", {
        ride: data.ride,
        driverId: driverId,
        driverSocketId: socket.id
      });
      console.log(`Driver ${driverId} accepted ride. Notified passengers.`);
    } else {
      console.log("Driver ID not found in accepted ride data");
    }
  });


  socket.on("disconnect", () => {
    for (let driverId in driverConnections) {
      if (driverConnections[driverId] === socket.id) {
        delete driverConnections[driverId];
        console.log(`Driver ${driverId} disconnected`);
        break;
      }
    }
  });
});
const port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
