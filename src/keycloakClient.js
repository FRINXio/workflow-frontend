import KeycloakAdminClient from "keycloak-admin";
import {Issuer} from 'openid-client';

// TODO: place client in a shared location (not workflow-frontend)

// NOTE: if requests are too slow, we can cache user ID instead of getUser()
// every time. Just make sure to invalidate frequently.

// NOTE: consider having separate clients per tenant, instead of using master?

const REFRESH_TOKEN_TIME = 55 * 1000; // 55 seconds

// TODO: don't hardcode
const kcAdminClient = new KeycloakAdminClient({
  baseUrl: "http://auth.localtest.me:8080/auth",
});

// TODO: don't hardcode
// TODO: don't use "master" client w/ full priviledge, create a service client
async function init() {
  await kcAdminClient.auth({
    username: "admin",
    password: "admin",
    grantType: "password",
    clientId: "admin-cli",
  });
  const keycloakIssuer = await Issuer.discover(
    "http://auth.localtest.me:8080/auth/realms/master"
  );
  // openid-client demands a secret, even though grantType is "password".
  // The contents of the secret don't matter, we just need something there.
  const client = new keycloakIssuer.Client({
    client_id: "admin-cli", // Same as `clientId` passed to client.auth()
    client_secret: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
  });
  let tokenSet = await client.grant({
    grant_type: 'password',
    username: 'admin',
    password: 'admin',
  });
  // Periodically using refresh_token grant flow to get new access token here
  setInterval(async () => {
    const refreshToken = tokenSet.refresh_token;
    tokenSet = await client.refresh(refreshToken);
    kcAdminClient.setAccessToken(tokenSet.access_token);
  }, REFRESH_TOKEN_TIME);
}

function setTenant(tenant) {
  kcAdminClient.setConfig({ realmName: tenant });
}

async function getUser(username) {
  return (await kcAdminClient.users.find({ username }))[0];
}

async function getGroupsForTenant(tenant) {
  kcAdminClient.setConfig({ realmName: tenant });
  return await kcAdminClient.groups.find();
}

async function getGroupsForUser(username, tenant) {
  setTenant(tenant);
  const user = await getUser(username);
  const groups = await kcAdminClient.users.listGroups({ id: user.id })
  return groups;
}

async function getRolesForUser(username, tenant) {
  setTenant(tenant);
  const user = await getUser(username);
  const roles = await kcAdminClient.users.listRealmRoleMappings({ id: user.id });
  return roles;
}

export default {
  init,
  getGroupsForTenant,
  getGroupsForUser,
  getRolesForUser,
};
