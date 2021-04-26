import { Handler } from "@netlify/functions";
const fetch = require("node-fetch");

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
    const fileName = event.queryStringParameters['file'] || 'data.csv';
    const res = await fetch(`https://objective-wing-b70022.netlify.app/assets/csv/${fileName}`);
    if (res.status != 200) {
      return {
        statusCode: res.status,
        body: JSON.stringify({message: 'error'}),
      }
    }
    const csv = (await res.blob()).text()
    return {
      statusCode: 200,
      headers: {
        "Content-Disposition": `attachment;filename="${fileName}"`,
        "Content-Type": 'text/csv'
      },
      body: csv
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "default" }),
  };
};

export { handler };
