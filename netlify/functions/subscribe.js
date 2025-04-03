const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Method Not Allowed",
    };
  }

  const { email } = JSON.parse(event.body);
  const API_KEY = process.env.MAILERLITE_API_KEY;
  const GROUP_ID = "150427646489003530";

  try {
    const createRes = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY,
      },
      body: JSON.stringify({ email, type: "active" }),
    });

    const createData = await createRes.json();

    if (!createRes.ok) {
      console.error("Create subscriber error:", createData);
      return {
        statusCode: createRes.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, error: createData }),
      };
    }

    const groupRes = await fetch(
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

    const groupData = await groupRes.json();

    if (!groupRes.ok) {
      console.error("Group add error:", groupData);
      return {
        statusCode: groupRes.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, error: groupData }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Unhandled error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
