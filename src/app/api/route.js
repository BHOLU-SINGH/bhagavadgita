import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://bhagavadgitaapi.in/chapters/");
    const data = await response.json();
    return NextResponse.json({
      result: {data},
      success: true,
    })
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      result: "Something went wrong, Please try again!",
      success: false,
    });
  }
}