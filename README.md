# express-tea-app

# npm run dev

## Authentication and User Collections

Users

GET
GET_ALL_USERS
`{{localhost}}/users/`

Example
GET_ALL_USERS_RESPONSE
Request
cURL
`` `curl --location --globoff '{{localhost}}/users/'` ``
200 OK
Response
Body
Headers (7)
View More
json
{
"users": [
{
"_id": "677229c5148043c98c1692be",
"name": "Walter Skiles",
"email": "Dovie_Corkery@gmail.com",
"username": "Robin_Dooley9",
"password": "plHsenfTpIVcabt",
"age": 833,
"status": false,
"createdAt": "2024-12-30T05:04:05.714Z",
"__v": 0
},
{
"_id": "677229d7148043c98c1692c0",
"name": "Irma Willms",
"email": "Suzanne.Runolfsson95@gmail.com",
"username": "Layla_Baumbach40",
"password": "abft3DQTuB18qJa",
"age": 806,
"status": false,
"createdAt": "2024-12-30T05:04:23.436Z",
"__v": 0
}
],
"count": 2,
"message": "Users fetched successfully"
}
POST
ADD_NEW_USER
{{localhost}}/users/

Body
raw (json)
json
{
"name": "Angelo Thiel Jr.",
"email": "Daphne_Reichert@yahoo.com",
"username":"Thomas88",
"password": "N_ERYNTEauz8BHX",
"age": 761,
"status": true
}
Example
ADD_NEW_USER_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/' \
--data-raw '{
"name": "Pearl Bogisich Jr.",
"email": "Jett.Wuckert@hotmail.com",
"username":"Josiane.Kuvalis75",
"password": "iW1vk5cZcf6SutX",
"age": 539,
"status": true
}'
201 CREATED
Response
Body
Headers (7)
json
{
"name": "Misty Senger",
"email": "Savanah_Tremblay88@hotmail.com",
"username": "Jackie81",
"password": "sW31lga_DpPpm6i",
"age": 995,
"status": false,
"_id": "67722f6c1c9cbc44248f3539",
"createdAt": "2024-12-30T05:28:12.210Z",
"__v": 0
}
POST
ADD_MULTIPLE_NEW_USERS
{{localhost}}/users/new_users

Body
raw (json)
View More
json
[
{
"name": "Estelle Marquardt",
"email": "Rupert.Mueller@hotmail.com",
"username": "Alphonso78",
"password": "9X9In_gI6sfqWYf",
"age": 449,
"status": true
},
{
"name": "Felipe Langworth PhD",
"email": "Arden7@hotmail.com",
"username": "Dock8",
"password": "JYgX0wDB5CbFYSh",
"age": 286,
"status": true
},
{
"name": "Darrel Conroy",
"email": "Lavon45@yahoo.com",
"username": "Judah45",
"password": "Ga_qvr6kiBotTLM",
"age": 411,
"status": false
},
{
"name": "Frankie Hamill",
"email": "Benedict_Daniel@hotmail.com",
"username": "Kavon_Lebsack",
"password": "RenLEuk6Uk1lrsI",
"age": 738,
"status": true
},
{
"name": "Ken Bergstrom",
"email": "Gerry69@gmail.com",
"username": "Willie_Blick",
"password": "MHIZsUroEjJEo2R",
"age": 813,
"status": true
}
]
Example
ADD_MULTIPLE_NEW_USERS_RESPONSE
Request
View More
cURL
curl --location --globoff '{{localhost}}/users/new_users' \
--data-raw '[
{
"name": "Pablo West",
"email": "Karolann55@hotmail.com",
"username": "Elza.Spinka",
"password": "JJUm6oX3my2dXMA",
"age": "101",
"status": "false"
},
{
"name": "Marcella Mayer",
"email": "Levi17@hotmail.com",
"username": "Carlos53",
"password": "L9qushNpXaUFJOM",
"age": "172",
"status": "false"
},
{
"name": "Ray Rolfson",
"email": "Ambrose_Denesik@gmail.com",
"username": "Estel79",
"password": "v8NHzjKFKQ1_wpu",
"age": "177",
"status": "false"
},
{
"name": "Beth Barton",
"email": "Aron.Kris@gmail.com",
"username": "Madie.Feest",
"password": "0rrf8qkH2Ih2WvY",
"age": "35",
"status": "false"
},
{
"name": "Allan Wiegand",
"email": "Annie55@yahoo.com",
"username": "Abraham_Reynolds55",
"password": "WiAzkdQYu_QyYpQ",
"age": "208",
"status": "true"
}
]'
201 CREATED
Response
Body
Headers (7)
View More
json
{
"message": "5 user(s) added successfully",
"users": [
{
"name": "Kerry Jenkins",
"email": "Christine.Langworth@gmail.com",
"username": "Ahmed_Predovic",
"password": "mOYdJN5Il3GNOfv",
"age": 121,
"status": false,
"_id": "67722f801c9cbc44248f353b",
"createdAt": "2024-12-30T05:28:32.102Z",
"__v": 0
},
{
"name": "Mrs. Anthony Krajcik",
"email": "Anya_Breitenberg@hotmail.com",
"username": "Isaac.Auer19",
"password": "uua1RkiLHQLROdp",
"age": 34,
"status": false,
"_id": "67722f801c9cbc44248f353c",
"createdAt": "2024-12-30T05:28:32.102Z",
"__v": 0
},
{
"name": "Ernestine Huel",
"email": "Ida_Kulas@gmail.com",
"username": "Darien73",
"password": "tzB2zATNdXs8EOW",
"age": 27,
"status": true,
"_id": "67722f801c9cbc44248f353d",
"createdAt": "2024-12-30T05:28:32.103Z",
"__v": 0
},
{
"name": "Megan Weimann",
"email": "Stephon47@yahoo.com",
"username": "Isom_Wolf",
"password": "z6TyaqsuetEeIsO",
"age": 644,
"status": true,
"_id": "67722f801c9cbc44248f353e",
"createdAt": "2024-12-30T05:28:32.103Z",
"__v": 0
},
{
"name": "Mrs. Fred Feil",
"email": "Fausto_Sawayn91@gmail.com",
"username": "Lawrence51",
"password": "uUPa65E56M24G3l",
"age": 547,
"status": true,
"_id": "67722f801c9cbc44248f353f",
"createdAt": "2024-12-30T05:28:32.103Z",
"__v": 0
}
]
}
GET
GET_USER_BY_ID
{{localhost}}/users/677229c5148043c98c1692be

Example
GET_USER_BY_ID_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/677229c5148043c98c1692be'
200 OK
Response
Body
Headers (7)
json
{
"\_id": "677229c5148043c98c1692be",
"name": "Walter Skiles",
"email": "Dovie_Corkery@gmail.com",
"username": "Robin_Dooley9",
"password": "plHsenfTpIVcabt",
"age": 833,
"status": false,
"createdAt": "2024-12-30T05:04:05.714Z",
"\_\_v": 0
}
PUT
UPDATE_USER_BY_ID
{{localhost}}/users/677229c5148043c98c1692be

Body
raw (json)
json
{
"age":23
}
Example
UPDATE_USER_BY_ID_RESPONSE
Request
cURL
curl --location --globoff --request PUT '{{localhost}}/users/677229c5148043c98c1692be' \
--data '{
"age":23
}'
200 OK
Response
Body
Headers (7)
json
{
"\_id": "677229c5148043c98c1692be",
"name": "Walter Skiles",
"email": "Dovie_Corkery@gmail.com",
"username": "Robin_Dooley9",
"password": "plHsenfTpIVcabt",
"age": 23,
"status": false,
"createdAt": "2024-12-30T05:04:05.714Z",
"\_\_v": 0
}
DELETE
DELETE_USER_BY_ID
{{localhost}}/users/67722d97def0280d35439f22

Example
DELETE_USER_BY_ID_RESPONSE
Request
cURL
curl --location --globoff --request DELETE '{{localhost}}/users/67722d97def0280d35439f22'
200 OK
Response
Body
Headers (7)
html
User deleted successfully
DELETE
BULK_DELETE_USERS
{{localhost}}/users/

Body
raw (json)
json
{
"ids": ["67722d97def0280d35439f21", "67722d97def0280d35439f20"]
}
Example
BULK_DELETE_USERS_RESPONSE
Request
cURL
curl --location --globoff --request DELETE '{{localhost}}/users/' \
--data '{
"ids": ["67722d97def0280d35439f21", "67722d97def0280d35439f20"]
}'
200 OK
Response
Body
Headers (7)
html
2 user(s) deleted successfully
AUTHENTICATION

POST
REGISTER_USER
{{localhost}}/users/register

Body
raw (json)
json
{
"name": "Myra Dickens",
"email": "Naomi_Schoen@yahoo.com",
"username":"Vinnie_Williamson45",
"password": "sJa3BWrE94h5Xo8",
"age": "51"
}
Example
REGISTER_USER_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/register' \
--data-raw '{
"name": "Miss Hannah Stamm",
"email": "Richmond_Simonis48@yahoo.com",
"username":"Jensen_Donnelly",
"password": "ntKoItbHnHmfdPz",
"age": "267"
}'
201 CREATED
Response
Body
Headers (7)
View More
json
{
"message": "User registered successfully",
"user": {
"name": "Patti Thompson",
"email": "Constance.Torp6@yahoo.com",
"username": "Belle_Heaney",
"password": "$2a$10$yL0jlFFBNkCNPDDcwN5DIOsBsA.3t0zunA3gn8lV2KZDYsq6XlAFe",
"age": 412,
"\_id": "67723ffd654a12788dc45f72",
"createdAt": "2024-12-30T06:38:53.632Z",
"\_\_v": 0
},
}
POST
RESET_PASSWORD
{{localhost}}/users/reset-password

Body
raw (json)
json
{
"token": "820ad7b792de9dcb1b16c588c8bf0125d4e7fa1987b8a56fc37b3c017a081da6",
"newPassword": "Constance@Torp6"
}
Example
RESET_PASSWORD_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/reset-password' \
--data-raw '{
"token": "820ad7b792de9dcb1b16c588c8bf0125d4e7fa1987b8a56fc37b3c017a081da6",
"newPassword": "Constance@Torp6"
}'
200 OK
Response
Body
Headers (7)
View More
json
{
"message": "Password reset successful",
"user": {
"\_id": "67723ffd654a12788dc45f72",
"name": "Patti Thompson",
"email": "Constance.Torp6@yahoo.com",
"username": "Belle_Heaney",
"password": "$2a$10$tBz9auWHyTdIqw8WSwoje.zsdQUQTeb8kNBnsQxyoJd.gt3eVrLkG",
"age": 412,
"createdAt": "2024-12-30T06:38:53.632Z",
"\_\_v": 0
},
"newPassword": "Constance@Torp6"
}
POST
FORGOT_PASSWORD
{{localhost}}/users/forgot-password/

Body
raw (json)
json
{
"email": "Constance.Torp6@yahoo.com"
}
Example
FORGOT_PASSWORD_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/forgot-password/' \
--data-raw '{
"email": "Constance.Torp6@yahoo.com"
}'
200 OK
Response
Body
Headers (7)
json
{
"message": "Password reset token sent to email",
"token": "820ad7b792de9dcb1b16c588c8bf0125d4e7fa1987b8a56fc37b3c017a081da6"
}
POST
LOGIN_USER
{{localhost}}/users/login

Body
raw (json)
json
{
"email": "Aiyana.Green34@gmail.com",
"password": "D0KHK34LUVkP7ZL"
}
Example
LOGIN_USER_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}/users/login' \
--data-raw '{
"email": "Constance.Torp6@yahoo.com",
"password": "XtAQ3ZV1cCQTBvj"
}'
200 OK
Response
Body
Headers (7)
View More
json
{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzIzZmZkNjU0YTEyNzg4ZGM0NWY3MiIsImlhdCI6MTczNTU0MDc3NywiZXhwIjoxNzM1NTQ0Mzc3fQ.XnGKNF0xVB8-rRj-n8qFkah-MKa-H-F5mKYpa5WWx-U"
"token": "<token>"
ADMIN

DELETE
DELETE_DB
{{localhost}}/admin

Authorization
Bearer Token
Token
GET
SERVER_STATUS
{{localhost}}

Authorization
Bearer Token
Token
<token>
Example
SERVER_STATUS_RESPONSE
Request
cURL
curl --location --globoff '{{localhost}}'
200 OK
Response
Body
Headers (7)
html
Hello World!
JUMP TO
Introduction
Users
AUTHENTICATION
ADMIN
GET
SERVER_STATUS
