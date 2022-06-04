# Beauty Salon

## This is a website which offers the possibility for users to create appointments at a beauty salon.

### Technologies used on BE:
 - Python
 - Fast API
 - PostgreSQL
 - JWT token - for authentication

### Technologies used on FE:
 - ReactJS


### Needed dependencies to run the project
 - node
 - python


### Steps to run the project
 - Create database
 - Configure the postgresql link in database.py file
 - Execute create_db.py file - this will create the necessary table structure
 - Create the necessary data:
 ```
   insert into user_type  (type) values ('admin');
   insert into user_type  (type) values ('client'); 
   insert into service_type (type) values ('hair removal');
   insert into service_type (type) values ('lash');
 ```
 - Create users and change some of these users manually to be ```workers``` (change ```user_type``` to ```1```)
 - Open the python project and run the follow command: 
 ```
 uvicorn main:app --reload
 ```
 - Open the FE project and run the following commands:
 ```
 npm install
 npm start
 ```
 - FE project should automatically open on ```localhost:3000```
 - BE project should automatically run on ```http://127.0.0.1:8000```
 - Accessing ```http://127.0.0.1:8000/docs#/``` will open the SwaggerUI documentation for the BE project

