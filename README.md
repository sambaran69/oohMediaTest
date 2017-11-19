# ooh-Media Test
Protected API route built using Open API (Swagger) and JWT (Json Web Tokens)

## How to run this

1) Start the server by running `npm start`

2) Check the swagger-ui on `http://localhost:3000/docs`

3) GET `http://localhost:3000/api/unprotected` should work without any authorization.

4) All other routes other than login should NOT work.

5) POST `http://localhost:3000/api/login/user` with the following body
``
{
"username": "username",
"password": "password"
}
``
 and take the token that you get in the response and click on the `Authorize` button on the UI
 and paste it AFTER the text `Bearer `.

6) Alternatively you can call any API again with the following header
``Authorization: Bearer _TOKEN_``, replacing `_TOKEN_ ` with the value you got from request #5

7) There are two roles: `admin` and `user`. Only Admin can create, modify and delete shopping centers.
Try logging in as an admin and accessing the admin-only route.
