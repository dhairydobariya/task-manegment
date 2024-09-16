my env file 

PORT=
JWT_SECRET=
MONGO_URI=









# task-manegment-app
****************************************************its task manegment app and its create on roll base 

****************************************************useble dependancy

    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "cookie": "^0.6.0",
    "cookie-parser": "^1.4.6",
    "cookies": "^0.9.1",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.6.2",
    "nodemon": "^3.1.4"

*****************************************************two type of schema add
first user schema (name,password,roll)

second is task schema (taskname ,status,description,createdby,assignedTo,category)

*****************************************************url wich use in post men direct 

register = http://localhost:4010/register?name=hii&password=1111&roll=user

login = http://localhost:4010/login?name=hii&password=1111

addtask for user = http://localhost:4010/tasks/user?taskname=third&status=complete&description=adslgas;glakgj;lkdfj

get all tasks of user = http://localhost:4010/tasks/admin/66e8ad2b5aebdf021f65cda8

update task = http://localhost:4010/tasks/id

delete task = http://localhost:4010/tasks/id

********************************************************admin side handle
GET    =     http://localhost:4010/tasks
POST   =     http://localhost:4010/tasks
PATCH  =     http://localhost:4010/tasks/:id
DELETE  =    http://localhost:4010/tasks/:id

GET   =    http://localhost:4010/users
GET  =     http://localhost:4010/users/:id
PATCH  =   http://localhost:4010/users/:id
DELETE  =  http://localhost:4010/users/:id
