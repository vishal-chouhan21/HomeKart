import type { FastifyInstance } from "fastify";
import {
  createUser,
  getAllUsers,
} from "../../controllers/admin/UserController";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/user", getAllUsers);
  fastify.post("/user", createUser);
};

export default userRoutes;
