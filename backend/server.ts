import fastify from "fastify";
import userRoutes from "./src/routes/frontend/user";
import { connectDatabase } from "./src/database/database";
import fastifyJwt from "@fastify/jwt";
import authRoutes from "./src/routes/admin/authRote";
import cors from "@fastify/cors";

// Create a Fastify instance
const app = fastify({ logger: true });

// Register CORS plugin
app.register(cors, {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies to be sent
});

// Register authentication hook
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

//connect to database
connectDatabase();

// Define a simple route
app.get("/", async (request, reply) => {
  reply.send("Hello, vishal your server is running successfully");
});

//frontend routes
app.register(authRoutes, { prefix: "/auth" });

//admin routes
app.register(userRoutes, { prefix: "/api" });

// Start the server
app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
