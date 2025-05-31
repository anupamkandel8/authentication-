import { connectDB } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

//for app router
export async function POST(req: Request) {
  const user = await req.json();
  const { username, password } = user;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    //create token
    const tokenData = {
      userId: existingUser._id,
      username: existingUser.username,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set token in cookies and return it via response
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
