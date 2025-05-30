import { connectDB } from "@/db/index";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next";
import bcrypt from "bcryptjs";


import mongoose from "mongoose";

// Connect to the database
connectDB();

export default const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // add salt to password and Hash the resrult
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
