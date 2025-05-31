//remove cookies on logout
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration date to the past
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
