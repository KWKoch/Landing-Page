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
  const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOTUyZWUzNTJkM2ExOGVjZmMwZmZjZjAyM2I2NTRjNzg1NWU4NTQ1MDVjZjYyYTg0NmJkNjhmMjk5NTE4MjNlMjY4MzcxOWE2MTFmOTY4ZDkiLCJpYXQiOjE3NDM2NDcxODYuNzcyMTQ4LCJuYmYiOjE3NDM2NDcxODYuNzcyMTUsImV4cCI6NDg5OTMyMDc4Ni43Njg2OTUsInN1YiI6IjE0MzUwNzMiLCJzY29wZXMiOltdfQ.Yq6apG0FLetVw4K-TUJ_r4O5aEn_qj31hxLQPDJPiNHIKxw2D2oA_KG8u7QNLJvZgsBeLaNeB243LCTZ6Cz3EbrSQONNCJlEu2uNecv2eEqRKq0bmumYiAM1psXs3Ud1bcVGDv7blm3tarZywVRbguaXl_eHgCOJogue8Ow65vo96FPQng_zESggejtq6zkIeHBLEDxwOJF91BXojdxWi7iVIKm4U3FEnd3FI-dS9JCyqEpxgphZRTcyvYXtPVzugtt8-o-7QEPMOI22hsfJvpr_KgMDqWDtAOul7dTtusNDYhh-iKI4u7ASllnPCvqOJfhopS3hNe5Pj_2s9GEK4tYz2ZVpU5fvw23lFtPb24C4OE_o3r0iO7pNggn5HI0miDDEH9eZfbjyTyxFTy40w-jl4k774VshI58MZN3oCxJWuDWL53t6ZemvBM49TAdbtz650JppkqcwGPIfHzpiYIO0PmiHtPUP9eg_P4y_Q5pxZdIt-C3NVUzYv-THGSpksAoakOr3jiqKl0f27RioioBZwBem4A6vE37F3tXC7aarF31061Vo9jZDwaJm6yh1S8Q3Shimi2R9K7ZvMNA7p6ilUrP62G72_kHqAInt4v9UszmI6BxT1HCt5LJAPMn4OEsuOFM8rf7yqqR-ZkTSjMQKX0cyjgevFBwqbEdb9Gs";
  const GROUP_ID = "150427646489003530";

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        groups: [GROUP_ID],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MailerLite API error:", data);
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, error: data }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
