import { connectDB } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connectDB();

//for app router
export async function POST(req: Request) {
  const user = await req.json();
  const { email, username, password } = user;

  //check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  //hash password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "User signed up successfully" });
}
