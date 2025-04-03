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
  const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDM0OTllMjEzNDdmZWZlNTQ5ZWZlN2MyYjAwMDE0NDk1YjIwNWU1ZmZiODYwMmZjMDZiZmUwNTE1NzgxZTg4ZDc2NWZjZDk3M2UxY2RhNWIiLCJpYXQiOjE3NDM2NDU0MjQuNTU4OTAyLCJuYmYiOjE3NDM2NDU0MjQuNTU4OTA1LCJleHAiOjQ4OTkzMTkwMjQuNTU0MDIzLCJzdWIiOiIxNDM1MDczIiwic2NvcGVzIjpbXX0.YWd4liPKmoet9_trbnCn6dlh-CZ4qNJRgZqz3FRmx3KE8P7ZLo1OyhOE9ZoLJsOY2pTXoDFy_PlpZU_h1erk0kLkVF2Q7ivetDL_Ht70BmQGEBsB-ETEwPIZPzSmM6kK8u7KqoSSvonJ-Ry4WkuOUKpBgrmdfXtYg7IrR5OLx76OWrhVHZDpJ6hyWM0SCabud6PGg4G1OdXwxbXRawS8pCXxJCgbu3qSItIY4I8Jn_k8xP5LVgOrzn-1vWusFlby52Hhmj7XSxN0iEg1zcvOYF3Bh3mbNnLQ7HkDxJQZNwDbNt0kh8MjgYhQlTNmHonfUXMsq-rOCRz3iB44Nn5TVOp90USFmza2Xw47hodbjRQKxw8OmHOLzFthXJ2RqdrtcbT4PyWGVzCpP8FVRMDCKtqiTtXrTMYuAbfyQ3TVyrkKLEeZyCx6RoLtczBoB4g7vWBe40X5SDEB0hh-VAciRZWoJbBjLwlGv-T4kBQIcvduaD7Of7IhRjlnaWex_-AKaF3PT77h5DldvPRwbpWdAwbAE8gz7BRKmk8fGY8fvmP3avpO_PMZR6evG4DU1r8pTdBbh86C0HKaUy3LDZ8hYy3xtAZnhSDFrf6-2jCylvYJYbfTymAtasSJ_YicaV_YpXBPsA0aCJl5QIe8MNtZXFCzbDbyWHzB3m1DI6J64NE";
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
