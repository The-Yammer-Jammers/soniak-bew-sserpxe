import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

const path = require('path');
require('dotenv').config()

const app = express();

nunjucks.configure([
  'node_modules/govuk-frontend/dist',
  'views'
], {
  autoescape: true,
  express: app
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 28800000 } }));

app.use('/stylesheets/govuk-frontend.min.css',
  express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css'))
);
app.use('/javascripts/govuk-frontend.min.js',
  express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js'))
);
app.use('/assets', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/assets')));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get("/dashboard", async (req: express.Request, res: express.Response) => {
  res.render("dashboard.njk", req.body);
});