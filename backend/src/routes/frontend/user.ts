import type { FastifyInstance } from "fastify";
import {
  registerUser,
  loginUser,
} from "../../controllers/frontend/authcontroller";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/user/register", registerUser);
  fastify.post("/user/login", loginUser);
};

export default userRoutes;
