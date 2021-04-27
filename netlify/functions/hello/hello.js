const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  console.log(event.queryStringParameters);  // query string parameter取得可能
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
    const file = fs.readFileSync(path.join(__dirname, fileName));  // response bodyにファイルを使用可能
    return {
      statusCode: 200,
      headers: {
        "Content-Disposition": `attachment;filename="download-${fileName}"`,  // downloadファイル名指定可能
        "Content-Type": 'text/csv'
      },
      body: `${file}`
    }
  }

  if (typ === 'css') {
    const fileName = event.queryStringParameters['file'] || 'styles.css';
    const file = fs.readFileSync(path.join(__dirname, fileName));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": 'text/css'
      },
      body: `${file}`
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "default" }),
  };
};