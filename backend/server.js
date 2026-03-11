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
  socket.on("driverconnect", (driverId) => {
    driverConnections[driverId] = socket.id;
  });

  socket.on("lookingfordriver", (data) => {
    const allDrivers = Object.values(driverConnections);

    if (allDrivers.length > 0) {
      const driverSocketId = allDrivers[0];
      socket.to(driverSocketId).emit("popupdata", data);
    }
  });
  socket.on("rideaccepted", (data) => {
    const driverId = data.driverId || data.ride?.driverId;
    
    if (driverId) {
      
      io.emit("rideacceptedbydriver", {
        ride: data.ride,
        driverId: driverId,
        driverSocketId: socket.id
      });
    }
  });
  socket.on("ridefinallyaccepetd", (data) => {
    io.emit("laststep", {
      ride: data?.ride || data,
    });
  });

  socket.on("rideFinallyAccepted", (data) => {
    io.emit("laststep", {
      ride: data?.ride || data,
    });
  });

  socket.on("captionarrived", (data = {}) => {
    io.emit("captionarrived", data);
  });

  socket.on("tripstarted", (data = {}) => {
    io.emit("tripstarted", data);
  });

  socket.on("tripcompleted", (data = {}) => {
    io.emit("tripcompleted", data);
  });

  socket.on("rideFinished", (data = {}) => {
    io.emit("rideFinished", data);
  });

  socket.on("disconnect", () => {
    for (let driverId in driverConnections) {
      if (driverConnections[driverId] === socket.id) {
        delete driverConnections[driverId];
        break;
      }
    }
  });
  
});
const port = process.env.port || 3000;
server.listen(port, () => {
});
