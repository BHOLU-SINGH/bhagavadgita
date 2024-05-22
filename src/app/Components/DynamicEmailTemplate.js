import GetCurrYear from "./GetCurrYear";

function DynamicEmailTemplate({ name, message }) {
  const currentYear = GetCurrYear();
  const backgroundImage = "/emailTemplateBg2.jpg";
  const defaultImage = "https://unsplash.com/photos/purple-and-white-abstract-illustration-mjl0yIdSi18";
  return `
<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personalized Email</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; margin: 10px; padding: 0; color: #333; background: url('${backgroundImage || defaultImage}') no-repeat center center / cover; min-height: 96vh;">
        <div style="max-width: 600px; margin: 20px auto; background: transparent; padding: 20px;border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h1>Hello, ${name}!</h1>
          <p>${message}</p>
          <a style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; user-select: none;" href="https://www.youtube.com/@freeprojects1?sub_confirmation=1">Subscribe</a>
          <p style="text-align: center; font-size: 12px; color: #777;">© ${currentYear} FreeProjects1. All rights reserved.</p>
        </div>
      </body>
    </html>
    `;
}

export default DynamicEmailTemplate;
