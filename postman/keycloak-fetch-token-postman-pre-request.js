var server       = "http://localhost:8080"; // add your Keycloak-URL here (without /auth)
var realm        = "my-app"; // the name of the realm
var grantType    = "password"; // the granttype, with password you can login as a normal user
var clientId     = "postman-client"; // the name of the client you created in Keycloak
var clientSecret = "22db8ee9-139e-45e8-ac20-abcd5b5cce6f"; // the secret you copied earlier
var username     = "user"; // the username of the user you want to test with
var password     = "user"; // the password of the user you want to test with

// creating the request URL
var url  = `${server}/auth/realms/${realm}/protocol/openid-connect/token`;
// creating the body of the request
var data = `grant_type=${grantType}&client_id=${clientId}&username=${username}&password=${password}&client_secret=${clientSecret}`;

// request to Keycloak
// read more about this here: https://www.keycloak.org/docs/latest/authorization_services/#_service_overview
pm.sendRequest({
    url: url,
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded'},
    body: {
        mode: 'raw',
        raw: data
    }
},  function(err, response) {
    // Set the environment variable for token
    var response_json = response.json();
    var token = response_json.access_token;
    pm.environment.set('token', token);
    // You can open up the console in Postman with Alt + Ctrl + C
    console.log(token);
});