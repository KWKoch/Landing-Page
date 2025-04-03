const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { email } = JSON.parse(event.body);

  const API_KEY = "YOUR_API_KEY";
  const GROUP_ID = "150427646489003530";

  try {
    // Step 1 – Create subscriber
    await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY,
      },
      body: JSON.stringify({ email, type: "active" }),
    });

    // Step 2 – Add subscriber to group
    await fetch(`https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY,
      },
      body: JSON.stringify({ email }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Signup failed" }),
    };
  }
};