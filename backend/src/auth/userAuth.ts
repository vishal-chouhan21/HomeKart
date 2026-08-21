import jwt from "@fastify/jwt";
import type { FastifyRequest, FastifyReply } from "fastify";

interface JwtPayload {
  id: string;
  email: string;
}

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload;
  }
}

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      reply.status(401).send("Authorization header missing");
      return;
    }

    //check bearer token
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
      reply.status(401).send("Invalid authorization header format");
      return;
    }

    //verify token
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    )) as JwtPayload;
    request.user = decoded;
  } catch (error) {
    reply.status(401).send("Unauthorized");
  }
};
