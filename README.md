# EmployeeReviewSystem
#ADMIN CREDENTIALS : email : admin@theonelogic.in, password : administrator
This application has following features 
1. ADMIN VIEW
```sh

ADD EMPLOYEE :
REMOVE EMPLOYEE  :
EDIT EMPLOYEE   :
SHOW REVIEW(PENDING + COMPLETED)  :
ASSIGN REVIEW  :
EDIT PENDING REVIEW  :
VIEW EMPLOYEE LIST   :
SELECT PENDING REVIEWS(Reviewr and EndDate) :
```
2. EMPLOYEE VIEW
```sh
LIST OF COMPLETED REVIEW
LIST OF PENDING REVIEW
COMPLETE A REVIEW
```
3. SIGN IN USING USERNAME PASSWORD
```sh
PASSPORT_LOCAL_STRAGETY WITH EXPRESS SESSION
```
4. SIGN IN + REGISTER USING GOOGLE
```sh
PASSPORT_GOOGLE_OAUTH_STRAGETY WITH EXPRESS SESSION
```


## How to setup on local machine
1. For usage of this repository your machine needs [node](https://nodejs.org/en/), npm, [monogodb](https://docs.mongodb.com/manual/installation/) and [git](https://git-scm.com/downloads). 
```go
node --16.18.0
npm --8.19.2
git --2.40.0
```
2.  Clone  repository
```go
git clone https://github.com/master-rahul/EmployeeReviewSystem.git
```
3. Change directory to Ecomerce-API
```go
cd EmployeeReviewSystem.
```

3. Install dependencies
```go
npm install --save
```
4. Start Monogo DB
```go
sudo systemctl start mongod
```
5. That's... it  run the application
```go
npm start
```

## File structure
here you are looking at directory structure with root level files only.
```sh
EmployeeReviewSystem.
├── assets
│   ├── images
│   ├── js
│   ├── css
├── node-modules
├── configs
├── controllers
├── index.js
├── models
├── package-lock.json
├── package.json
├── readme.md
├── routers
└── views
    ├── admin.ejs
    └── emplyoyeeHome.ejs
    ├── employeeReview.ejs
    └── employeeView.ejs
    ├── login.ejs
    └── register.ejs    
```



