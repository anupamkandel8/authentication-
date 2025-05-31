import { connectDB } from "@/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Find the user with the provided token and check if it is still valid
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update the user's email verification status
    user.isVerified = true;
    user.verifyToken = undefined; // Clear the token after verification
    user.verifyTokenExpiry = undefined; // Clear the expiry after verification
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
