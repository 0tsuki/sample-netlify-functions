import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  console.log(event.queryStringParameters);
  if (event.queryStringParameters === null) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
  }

  const typ = event.queryStringParameters['type'] || 'json';
  if (typ === 'json') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "json" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "default" }),
  };
};

export { handler };
