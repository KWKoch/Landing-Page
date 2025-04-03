const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const { email } = JSON.parse(event.body);
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email is required" }),
      };
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERLITE_API_TOKEN}`,
    };

    // STEP 1: Check if subscriber already exists
    const checkRes = await fetch(`https://connect.mailerlite.com/api/subscribers/${email}`, {
      method: "GET",
      headers,
    });

    if (checkRes.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Already subscribed." }),
      };
    }

    // STEP 2: Create new subscriber
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        groups: ["150427646489003530"],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: data.message, errors: data.errors }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscribed successfully", data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};
