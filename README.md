<mark>my env file</mark> 

PORT=       <br>
JWT_SECRET=   <br>
MONGO_URI=   <br>




<mark>how to run</mark> 
you can run this file using  <mark> nodemon index.js</mark>




# task-manegment-app
****************************************************<mark>its task manegment app and its create on roll base</mark> 

****************************************************<mark>useble dependancy</mark>

    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "cookie": "^0.6.0",
    "cookie-parser": "^1.4.6",
    "cookies": "^0.9.1",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.6.2",
    "nodemon": "^3.1.4"

*****************************************************<mark>two type of schema add</mark> <br>
<b>first user schema (name,password,roll)</b>

<b>second is task schema (taskname ,status,description,createdby,assignedTo,category)</b>

*****************************************************<mark>url wich use in post men direct</mark> 

register = http://localhost:4010/register?name=hii&password=1111&roll=user

login = http://localhost:4010/login?name=hii&password=1111

addtask for user = http://localhost:4010/tasks/user?taskname=third&status=complete&description=adslgas;glakgj;lkdfj

get all tasks of user = http://localhost:4010/tasks/admin/66e8ad2b5aebdf021f65cda8

update task = http://localhost:4010/tasks/id

delete task = http://localhost:4010/tasks/id

********************************************************<mark>admin side handle</mark>
GET    =     http://localhost:4010/tasks
POST   =     http://localhost:4010/tasks
PATCH  =     http://localhost:4010/tasks/:id
DELETE  =    http://localhost:4010/tasks/:id

GET   =    http://localhost:4010/users
GET  =     http://localhost:4010/users/:id
PATCH  =   http://localhost:4010/users/:id
DELETE  =  http://localhost:4010/users/:id


<mark>vercel link </mark> :: <b>https://vercel.com/dhairy-dobariyas-projects/taskmanegment/DzFUD78DGmmPjs88HEEpBmiYZbAn/source</b>
