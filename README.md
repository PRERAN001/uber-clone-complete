# 🚗 Uber Clone — Full-Stack Ride-Sharing Application

A full-stack, real-time ride-sharing web application inspired by Uber. It supports two types of users — **Passengers** and **Drivers** — with live ride matching, interactive maps, and real-time trip status updates via WebSockets.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
  - [User Endpoints](#user-endpoints)
  - [Driver Endpoints](#driver-endpoints)
  - [Location Endpoints](#location-endpoints)
  - [Socket.io Events](#socketio-events)
- [Data Models](#-data-models)
- [Authentication](#-authentication)
- [Maps & Location](#-maps--location)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## ✨ Features

### Passenger (User)
- Register & login with JWT-based authentication
- Search pickup and drop-off locations with autocomplete
- Select vehicle type (bike, car, van, etc.) with estimated fare
- Real-time driver matching via Socket.io
- Live map with driver location markers (MapLibre GL)
- Track ride status: searching → driver assigned → arrived → trip started → completed
- Secure logout with server-side token blacklisting

### Driver (Captain)
- Register with vehicle details (color, plate number, capacity, type)
- Toggle online/offline availability
- Receive incoming ride requests in real time
- Accept or ignore ride requests
- Notify passenger at each trip stage: arrived → started → completed
- Profile management with vehicle information

### Real-time Communication
- Socket.io for live two-way communication between passengers and drivers
- Ride request broadcasting to all available online drivers
- Trip lifecycle events managed via the server

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime environment |
| Express.js | v5.1.0 | HTTP server framework |
| MongoDB | — | NoSQL database |
| Mongoose | v9.0.0 | MongoDB ODM |
| Socket.io | v4.8.1 | Real-time bidirectional communication |
| JSON Web Token | v9.0.2 | Authentication tokens |
| bcrypt | v6.0.0 | Password hashing |
| express-validator | v7.3.1 | Request body validation |
| axios | v1.13.2 | HTTP client for external APIs |
| Razorpay | v2.9.6 | Payment gateway (configured) |
| dotenv | — | Environment variable management |
| cors | — | Cross-Origin Resource Sharing |
| cookie-parser | — | Cookie parsing middleware |
| nodemon | v3.1.11 | Dev server auto-restart |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | v19.2.0 | UI framework |
| Vite | v7.2.4 | Build tool & dev server |
| Tailwind CSS | v4.1.17 | Utility-first CSS framework |
| React Router DOM | v7.9.6 | Client-side routing |
| Socket.io Client | v4.8.1 | Real-time communication |
| MapLibre GL | v5.14.0 | Interactive maps |
| GSAP | v3.13.0 | Animations |
| axios | v1.13.2 | HTTP client |
| Remixicon | v4.7.0 | Icon library |
| ESLint | v9.39.1 | Code linting |

### External APIs
- **MapTiler API** — Geocoding & reverse geocoding for location search
- **Geoapify API** — Nearby places search
- **OpenRouteService (ORS)** — Route & distance calculation
- **Razorpay** — Payment processing

---

## 📁 Project Structure

```
uber-clone-complete/
├── backend/
│   ├── config/                   # Configuration utilities
│   ├── controller/
│   │   ├── user.controller.js    # User auth & profile handlers
│   │   ├── caption.controller.js # Driver auth & profile handlers
│   │   └── senddetails.controller.js  # Location lookup handler
│   ├── db/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js    # JWT auth middlewares
│   ├── models/
│   │   ├── user.model.js         # Passenger schema
│   │   ├── caption.model.js      # Driver schema
│   │   └── blacklisttoken.model.js  # Token blacklist schema
│   ├── routes/
│   │   ├── user.route.js         # User routes
│   │   ├── caption.route.js      # Driver routes
│   │   └── senddetails.route.js  # Location routes
│   ├── services/
│   │   ├── user.service.js       # User business logic
│   │   ├── caption.service.js    # Driver business logic
│   │   └── maps.service.js       # Maps & geocoding logic
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Socket.io server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx              # Landing page
    │   │   ├── Userregister.jsx      # Passenger sign-up
    │   │   ├── Userlogin.jsx         # Passenger login
    │   │   ├── Strart.jsx            # Main ride booking interface
    │   │   ├── Riding.jsx            # Passenger active ride screen
    │   │   ├── Captionregister.jsx   # Driver sign-up
    │   │   ├── Captionlogin.jsx      # Driver login
    │   │   ├── Captionhome.jsx       # Driver ride request dashboard
    │   │   ├── Captionriding.jsx     # Driver active ride screen
    │   │   ├── Captiondetails.jsx    # Driver profile & status
    │   │   └── Userprotectroute.jsx  # Auth guard component
    │   ├── context/
    │   │   ├── Usecontext.jsx        # Passenger state management
    │   │   ├── Captioncontext.jsx    # Driver state management
    │   │   └── Allocateddrivercontext.jsx  # Allocated driver state
    │   ├── utils/
    │   │   ├── socket.js             # Socket.io client setup
    │   │   ├── location.js           # Geolocation API wrapper
    │   │   └── fnddsusngcordinates.js  # Haversine distance calculator
    │   ├── App.jsx                   # Route definitions
    │   └── main.jsx                  # React entry point
    ├── components/
    │   ├── Ubermap.jsx               # MapLibre GL map component
    │   ├── LoacationSearchpannel.jsx # Location autocomplete
    │   ├── Vechiclepannel.jsx        # Vehicle type selection
    │   ├── Selectedvechicle.jsx      # Confirm vehicle & pricing
    │   ├── Lookingfordriver.jsx      # Searching driver UI
    │   ├── Allocateddriver.jsx       # Driver assigned UI
    │   ├── Waitingfordriver.jsx      # Driver on-the-way UI
    │   ├── ConfirmRidePopup.jsx      # Driver ride confirmation popup
    │   └── Ridepopup.jsx             # Ride details display
    ├── public/                       # Static assets
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud URI)
- API keys for [MapTiler](https://www.maptiler.com/), [Geoapify](https://www.geoapify.com/), and [OpenRouteService](https://openrouteservice.org/)

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create an .env file (see Environment Variables section below)
cp .env.example .env  # or create .env manually

# 4. Start the development server (auto-reloads on file changes)
npm start
```

The backend server will start on **http://localhost:3000**.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create an .env file (see Environment Variables section below)

# 4. Start the Vite development server
npm run dev
```

The frontend will be available at **http://localhost:5173**.

#### Additional frontend scripts

```bash
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `port` | Port for the Express server | `3000` |
| `dbconnectionstring` | MongoDB connection URI | `mongodb://127.0.0.1:27017/mydatabase` |
| `jwtsecret` | Secret key for signing JWT tokens | `your_strong_secret_here` |
| `lonandlatapi` | API key for longitude/latitude lookup | `your_maptiler_key` |
| `geoapifyapi` | Geoapify API key for places search | `your_geoapify_key` |
| `maptilerapi` | MapTiler API key for map rendering | `your_maptiler_key` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_BASEURL` | Backend base URL | `http://localhost:3000` |
| `VITE_BASEURL_client` | Backend base URL (alternate) | `http://localhost:3000` |
| `VITE_BASEURL_senddetails` | Location endpoint URL | `http://localhost:3000/api/sd` |
| `VITE_ORS_KEY` | OpenRouteService API key (Base64 encoded) | `your_ors_key` |

> ⚠️ **Security Note:** Never commit your `.env` files to version control. Add them to `.gitignore`.

---

## 📡 API Reference

### User Endpoints

Base path: `/api/user`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/userregister` | ❌ | Register a new passenger |
| `POST` | `/userlogin` | ❌ | Login and receive a JWT |
| `GET` | `/profile` | ✅ | Get authenticated user's profile |
| `GET` | `/logout` | ✅ | Logout and blacklist the JWT |

**Register body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### Driver Endpoints

Base path: `/api/caption`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/captionregister` | ❌ | Register a new driver with vehicle info |
| `POST` | `/captionlogin` | ❌ | Login driver and receive a JWT |
| `GET` | `/profile` | ✅ | Get authenticated driver's profile |
| `GET` | `/logout` | ✅ | Logout and blacklist the JWT |

**Register body:**
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "AB1234",
    "capacity": 4,
    "vehicletype": "car"
  }
}
```

Supported `vehicletype` values: `bike`, `car`, `van`, `truck`, `bus`

---

### Location Endpoints

Base path: `/api/sd`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/senddetails` | ❌ | Convert a location name to coordinates |

---

### Socket.io Events

#### Client → Server

| Event | Sender | Description |
|---|---|---|
| `driverconnect` | Driver | Register driver's socket for ride matching |
| `lookingfordriver` | Passenger | Broadcast ride request to all online drivers |
| `rideaccepted` | Driver | Accept a specific ride request |
| `ridefinallyaccepetd` | Driver | Confirm acceptance after user notification |
| `captionarrived` | Driver | Notify passenger that driver has arrived |
| `tripstarted` | Driver | Notify passenger that the trip has started |
| `tripcompleted` | Driver | Notify passenger that the trip is complete |
| `rideFinished` | Driver | Clean up ride session after completion |

#### Server → Client

| Event | Receiver | Description |
|---|---|---|
| `rideacceptedbydriver` | Passenger | Driver has accepted the ride |

---

## 🗄 Data Models

### User (Passenger)

```javascript
{
  firstname: String,   // required, min 3 characters
  lastname:  String,   // optional, min 3 characters
  email:     String,   // required, unique, min 5 characters
  password:  String,   // required, hashed with bcrypt (hidden by default)
  socketid:  String    // Socket.io connection ID
}
```

### Driver (Captain)

```javascript
{
  firstname: String,   // required, min 3 characters
  lastname:  String,   // optional, min 3 characters
  email:     String,   // required, unique, min 5 characters
  password:  String,   // required, hashed with bcrypt (hidden by default)
  socketid:  String,   // Socket.io connection ID
  status:    String,   // enum: 'online' | 'offline'
  vehicle: {
    color:       String,  // required, min 3 characters
    plate:       String,  // required, min 3 characters
    capacity:    Number,  // required, min 1
    vehicletype: String   // enum: 'bike' | 'car' | 'van' | 'truck' | 'bus'
  },
  location: {
    latitude:  Number,
    longitude: Number
  }
}
```

### Blacklisted Token

```javascript
{
  token:          String,  // required, the JWT token string
  blacklistedAt:  Date     // auto-set, document expires after 24 hours (TTL index)
}
```

---

## 🔒 Authentication

The app uses **JWT (JSON Web Token)** authentication with a 24-hour expiration.

- Tokens are issued on login and must be sent in the `Authorization: Bearer <token>` header or as a cookie.
- On logout, the token is added to a **MongoDB blacklist collection** with a TTL of 24 hours, preventing reuse.
- Two separate auth middlewares protect user and driver routes independently.
- Passwords are hashed using **bcrypt** with 10 salt rounds and are never returned in API responses.

---

## 🗺 Maps & Location

- **MapLibre GL** renders the interactive map in the browser.
- **MapTiler API** is used for geocoding (location name → coordinates) and reverse geocoding.
- **Geoapify API** is used to search nearby places.
- **OpenRouteService (ORS)** handles route distance calculations.
- The **Haversine formula** is used client-side to calculate the straight-line distance between two coordinates for quick fare estimation.
- The browser's **Geolocation API** is used to detect the user's current position.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open-source. Feel free to use it as a learning resource or starting point for your own projects.
