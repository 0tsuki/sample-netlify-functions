import { Handler, HandlerResponse } from "@netlify/functions";
import * as fs from "fs";
const fetch = require("node-fetch");

const handler: Handler = async (event, context) => {
  console.log(event.queryStringParameters);
  if (event.queryStringParameters === null || Object.keys(event.queryStringParameters).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "error" }),
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
    const file = fs.readFileSync(require.resolve(`./${fileName}`));
    return {
      statusCode: 200,
      headers: {
        "Content-Disposition": `attachment;filename="${fileName}"`,
        "Content-Type": 'text/csv'
      },
      body: `${file}`
    }
  }

  if (typ === 'css') {
    const fileName = event.queryStringParameters['file'] || 'styles.css';
    const res = await fetch(`https://objective-wing-b70022.netlify.app/assets/css/${fileName}`);
    if (res.status >= 400) {
      return {
        statusCode: res.status,
        body: JSON.stringify({message: 'error'}),
      }
    }
    const body = await (await res.blob()).text()
    return {
      statusCode: 200,
      headers: {
        "Content-Type": 'text/css'
      },
      body: body
    } as HandlerResponse;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "default" }),
  };
};

export { handler };
