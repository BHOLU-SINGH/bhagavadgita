import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import DynamicEmailTemplate from "@/app/Components/DynamicEmailTemplate";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("Environment variables are: "+process.env.EMAIL_USER + process.env.EMAIL_PASS);

export async function POST(req) {
  const payload = await req.json();
  const name = payload.name;
  const email = payload.email;
  const message = payload.message;

  if (!name || !email || !message) {
    return NextResponse.json({
      result: "All fields are required!",
      success: false,
    });
  } else {
    try {
      let info = await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`, // sender address
        to: `${email}`, // list of receivers
        subject: "Contact Us", // Subject line
        html: DynamicEmailTemplate({name, message}), // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    
      return NextResponse.json({
        message: "Email sent successfully!",
        status: "success",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({
        message: "Failed to send email!",
        status: "error",
      });
    }
  }
}
