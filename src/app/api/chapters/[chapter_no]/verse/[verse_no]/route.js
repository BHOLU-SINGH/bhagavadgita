import { NextResponse } from "next/server";

export async function GET(res, req) {
  const chapter_no = req.params.chapter_no;
  const verse_no = req.params.verse_no;

  try {
    const response = await fetch(`https://bhagavadgitaapi.in/slok/${chapter_no}/${verse_no}/`);
    const data = await response.json();
    return NextResponse.json({
      result: { data },
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      result: "Something went wrong, Please try again!",
      success: false,
    });
  }
}
