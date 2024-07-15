import { connection } from "@/utility/db";
import { User } from "@/utility/model/users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connection);
    data = await User.find();
  } catch (error) {
    data = { result: "Error" };
    success = false;
  }
  // console.log(data);
  return NextResponse.json({ result: data, success });
}

export async function POST(request) {
  let payload = await request.json();
  payload = payload.userData;
  console.log(payload.name);

  if (
    !payload.name ||
    !payload.email ||
    !payload.gender ||
    !payload.mobile ||
    !payload.password
  ) {
    return NextResponse.json({
      result: "All fields are required!",
      success: false,
    });
  } else {
    // await mongoose.connect(connection);
    // let user = new User(payload);
    // const result = await user.save();
    return NextResponse.json({
      result: "New Record Added Successfully",
      success: true,
    });
  }
}
