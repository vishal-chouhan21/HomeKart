import type { FastifyRequest, FastifyReply } from "fastify";
import User from "../../models/user";

export const getAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error fetching users");
  }
};

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };
    const user = new User({ name, email, password });
    await user.save();
    reply.status(201).send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error creating user");
  }
};

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await User.findById(id);
    if (!user) {
      reply.status(404).send("User not found");
      return;
    }
    reply.send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error fetching user");
  }
};

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true },
    );
    if (!user) {
      reply.status(404).send("User not found");
      return;
    }
    reply.send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error updating user");
  }
};

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      reply.status(404).send("User not found");
      return;
    }
    reply.send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error deleting user");
  }
};

export const softDeleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const user = await User.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true },
    );
    if (!user) {
      reply.status(404).send("User not found");
      return;
    }
    reply.send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error soft-deleting user");
  }
};
