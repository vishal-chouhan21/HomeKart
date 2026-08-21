import type { FastifyRequest, FastifyReply } from "fastify";
import User from "../../models/user";
import bcrypt from "bcrypt";

//register user
export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    //check registered fields
    if (!name || !email || !password) {
      reply.status(400).send("Please fill all the fields");
      return;
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      reply.status(400).send("User already exists");
      return;
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    reply.status(201).send("User registered successfully");
  } catch (error) {
    reply.status(500).send("Internal server error");
  }
};

//login user
export const loginUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    console.log("1. LOGIN START");

    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    console.log("2. BODY:", email, password);
    //check required fields
    if (!email || !password) {
      reply.status(400).send("Please fill all the fields");
      return;
    }

    //find user by email
    const user = await User.findOne({ email });
    console.log("3. USER:", user);
    if (!user) {
      reply.status(400).send("Invalid email");
      return;
    }

    console.log("4. USER FOUND");
    if (user.deleted_at) {
      return reply.status(401).send({
        success: false,
        message: "Account has been deleted",
      });
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("5. PASSWORD:", isMatch);
    if (!isMatch) {
      reply.status(400).send("Invalid password");
      return;
    }

    console.log("6. PASSWORD VALID");

    //create JWT token
    const accessToken = await (reply as any).jwtSign(
      {
        id: user._id,
        email: user.email,
      },
      { expiresIn: "15m" },
    );

    console.log("7. TOKEN CREATED:", accessToken);

    reply.status(200).send({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("========== LOGIN ERROR ==========");
    console.error(error);
    console.error("=================================");
    reply.status(500).send("Internal server error");
  }
};
