const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body || '{}');

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email is required" }),
    };
  }

  const API_URL = 'https://connect.mailerlite.com/api/subscribers';
  const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOTUyZWUzNTJkM2ExOGVjZmMwZmZjZjAyM2I2NTRjNzg1NWU4NTQ1MDVjZjYyYTg0NmJkNjhmMjk5NTE4MjNlMjY4MzcxOWE2MTFmOTY4ZDkiLCJpYXQiOjE3NDM2NDcxODYuNzcyMTQ4LCJuYmYiOjE3NDM2NDcxODYuNzcyMTUsImV4cCI6NDg5OTMyMDc4Ni43Njg2OTUsInN1YiI6IjE0MzUwNzMiLCJzY29wZXMiOltdfQ.Yq6apG0FLetVw4K-TUJ_r4O5aEn_qj31hxLQPDJPiNHIKxw2D2oA_KG8u7QNLJvZgsBeLaNeB243LCTZ6Cz3EbrSQONNCJlEu2uNecv2eEqRKq0bmumYiAM1psXs3Ud1bcVGDv7blm3tarZywVRbguaXl_eHgCOJogue8Ow65vo96FPQng_zESggejtq6zkIeHBLEDxwOJF91BXojdxWi7iVIKm4U3FEnd3FI-dS9JCyqEpxgphZRTcyvYXtPVzugtt8-o-7QEPMOI22hsfJvpr_KgMDqWDtAOul7dTtusNDYhh-iKI4u7ASllnPCvqOJfhopS3hNe5Pj_2s9GEK4tYz2ZVpU5fvw23lFtPb24C4OE_o3r0iO7pNggn5HI0miDDEH9eZfbjyTyxFTy40w-jl4k774VshI58MZN3oCxJWuDWL53t6ZemvBM49TAdbtz650JppkqcwGPIfHzpiYIO0PmiHtPUP9eg_P4y_Q5pxZdIt-C3NVUzYv-THGSpksAoakOr3jiqKl0f27RioioBZwBem4A6vE37F3tXC7aarF31061Vo9jZDwaJm6yh1S8Q3Shimi2R9K7ZvMNA7p6ilUrP62G72_kHqAInt4v9UszmI6BxT1HCt5LJAPMn4OEsuOFM8rf7yqqR-ZkTSjMQKX0cyjgevFBwqbEdb9Gs';
  const GROUP_ID = '150427646489003530';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: [GROUP_ID],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: result.message || 'Failed to subscribe', ...result }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed!', subscriber: result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message }),
    };
  }
};
