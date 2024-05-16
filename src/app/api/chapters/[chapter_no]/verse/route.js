import { NextResponse } from "next/server";

export async function GET(res, req) {
    const chapter_no = req.params.chapter_no;
  try {
    const response = await fetch(`https://bhagavadgitaapi.in/slok/${chapter_no}/1/`);
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