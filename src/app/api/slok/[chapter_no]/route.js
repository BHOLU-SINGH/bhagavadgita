import { NextResponse } from "next/server";

export async function GET(res, req) {
  const apiKey = process.env.API_KEY;
  const apiHost = process.env.API_HOST;
  const chapter_no = req.params.chapter_no;

  try {
    const url =
      `https://${apiHost}/v2/chapters/${chapter_no}/verses/`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${apiKey}`,
        "x-rapidapi-host": `${apiHost}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    return NextResponse.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      result: "Something went wrong, Please try again!",
      success: false,
    });
  }
}
