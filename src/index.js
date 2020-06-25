import express from "express";
import kClient from "keycloak-client";

const RETRY_TIME = 5 * 1000; // 5 seconds

const app = express();
const port = 5000;

function userInfoMiddleware(req, res, next) {
  const username = req.get("From");
  const tenant = req.get("x-tenant-id");
  if (!username || !tenant) {
    console.log("Recieved request missing username or tenant");
    res.send(401);
  }
  req.user = { username, tenant };
  next();
};

app.use(userInfoMiddleware);

app.get("/", (req, res) => {
  (async () => {
    const username = req.user.username;
    const tenant = req.user.tenant;
    // NOTE: don't await in series
    const groups = await kClient.getGroupsForUser(username, tenant);
    const roles = await kClient.getRolesForUser(username, tenant);
    const response = [
      "Response from Workflow Frontend:",
      "<br />",
      `Username: ${req.user.username}`,
      `Tenant: ${req.user.tenant}`,
      `User's Groups: ${JSON.stringify(groups.map(x => x.name))}`,
      `User's Roles: ${JSON.stringify(roles.map(x => x.name))}`
    ].join("<br />");
    res.send(response);
  })();
});

// repeatedly try to init the client
async function tryStart() {
  kClient
    .init()
    .then(() => {
      // start listening once the client works
      app.listen(port, () =>
        console.log(`Listening at http://localhost:${port}`)
      );
    })
    .catch(err => {
      // important because when starting all the containers,
      // keycloak isn't immediately available
      console.log("Couldn't initilize keycloak client, trying again in 5 sec.");
      console.log(err);
      setTimeout(tryStart, RETRY_TIME);
    })
}

tryStart();
