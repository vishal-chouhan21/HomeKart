import type { FastifyInstance } from "fastify";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../../controllers/admin/authController";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", registerAdmin);

  app.post("/login", loginAdmin);

  app.get("/me", getAdminProfile);
}
