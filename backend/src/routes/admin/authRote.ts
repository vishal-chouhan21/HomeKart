import type { FastifyInstance } from "fastify";
import {
  registerUser,
  loginUser,
} from "../../controllers/frontend/authcontroller";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", registerUser);

  app.post("/login", loginUser);
}
