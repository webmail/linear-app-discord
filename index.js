// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const Discord = require("webhook-discord");

const Discord = new webhook.Webhook(
  "https://discordapp.com/api/webhooks/724483491449798716/1RRbFpcgUE72FhJNw_TSMO7GFDSKnIusk8NS1B7C-GDAOFD2dFQoCq-fPZL-5eyoGZhY"
);

// Initializing express app
const app = express();

// Setting port
const port = process.env.PORT || 3000;

// Parse the request body
app.use(bodyParser.json());

// Receive HTTP POST requests
app.post("/linear", (req, res) => {
  const payload = req.body;
  console.log(req.body);
  console.log(`Labels: ${req.body.data.labels}`);
  const { action, data, type, createdAt } = payload;

  // Logging data to see how hook formatting should be handled
  console.log(payload);
  console.log(`Payload Action: ${action}`);
  console.log(`Payload Data: ${data}`);
  console.log(`Payload Type: ${type}`);
  console.log(`Payload Created Time: ${createdAt}`);

  if (action == "create" && type == "issue") {
    newIssue(payload);
  }

  function newIssue(payload) {
    // Defining Discord embed
    const msg = new webhook.MessageBuilder()
      .setName("Linear")
      .setColor("#606CCC")
      .setTitle("New Issue Created")
      .setURL(payload.url)
      .addField("Title", payload.data.title, true)
      .addField("Number", payload.data.number, false)
      .addField("Priority", payload.data.priority, true)
      .addField("Points", payload.data.estimate, false)
      .setFooter(
        "Linear App",
        "https://pbs.twimg.com/profile_images/1121592030449168385/MF6whgy1_400x400.png"
      );

    // Sending Discord embed
    Discord.send(msg);
  }

  // Finally, respond with a HTTP 200 to signal all good
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`My webhook consumer listening on port ${port}!`)
);

// Job to send webhooks
function sendWebhook(msg) {}

// Event I want handled
// - Archive issue
// - Create issue
// - Edited issue
// - Create project
// - Edit project
// - Archive project
