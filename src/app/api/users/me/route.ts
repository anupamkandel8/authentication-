import { connectDB } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

connectDB();

export async function GET(req: NextRequest) {
  const hashedToken = req.cookies.get("token")?.value;

  if (!hashedToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(hashedToken, process.env.JWT_SECRET!);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
  const userId = decodedToken.userId;

  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
