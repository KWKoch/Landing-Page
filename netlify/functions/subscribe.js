const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Method Not Allowed",
    };
  }

  const { email } = JSON.parse(event.body);
  const API_KEY = process.env.MAILERLITE_API_KEY;
  const GROUP_ID = "150427646489003530";

  try {
    // Step 1 – Create subscriber
    const createResponse = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY,
      },
      body: JSON.stringify({ email, type: "active" }),
    });

    const createData = await createResponse.json();

    if (!createResponse.ok) {
      console.error("Failed to create subscriber:", createData);
      throw new Error("Create subscriber failed");
    }

    // Step 2 – Add subscriber to group
    const groupResponse = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiKey": API_KEY,
        },
        body: JSON.stringify({ email }),
      }
    );

    const groupData = await groupResponse.json();

    if (!groupResponse.ok) {
      console.error("Failed to add to group:", groupData);
      throw new Error("Add to group failed");
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("MailerLite signup error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
};
