const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const data = req.body.data;
  const user_id = "john_doe_17091999"; // Replace with dynamic user_id generation if needed
  const email = "john@xyz.com"; // Replace with actual email
  const roll_number = "ABCD123"; // Replace with actual roll number

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet =
    alphabets.length > 0
      ? [
          alphabets
            .sort((a, b) =>
              a.localeCompare(b, undefined, { sensitivity: "base" })
            )
            .pop(),
        ]
      : [];

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

module.exports = app;
module.exports.handler = serverless(app);
