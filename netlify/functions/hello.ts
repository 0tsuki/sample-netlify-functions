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
  if (typ === 'csv') {
      return {
        statusCode: 200,
        headers: {
          "Content-Disposition": 'attachment;filename="rpa.csv"',
          "Content-Type": 'text/csv'
        },
        body: "123,日本太郎,77.5"
      }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "default" }),
  };
};

export { handler };
