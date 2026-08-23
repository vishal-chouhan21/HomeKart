import type { FastifyRequest, FastifyReply } from "fastify";
import Admin from "../../models/admin";
import bcrypt from "bcrypt";

//register admin
export const registerAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      reply.status(400).send("Admin with this email already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    reply.status(201).send(admin);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error registering admin");
  }
};

export const loginAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      reply.status(400).send("Admin not found");
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      reply.status(400).send("Invalid password");
      return;
    }

    // Create JWT token
    const accessToken = await (reply as any).jwtSign(
      {
        id: admin._id,
        email: admin.email,
      },
      { expiresIn: "15m" },
    );

    reply.status(200).send({
      message: "Login successful",
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error logging in admin");
  }
};

// Get Admin Profile (For GET /admin/me)
export const getAdminProfile = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = (request as any).user; // Decoded from JWT
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return reply.status(404).send({ message: "Admin not found" });
    }

    return reply.status(200).send({
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ message: "Error retrieving admin profile" });
  }
};
