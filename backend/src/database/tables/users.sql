-- -- -- -- create DATABASE Project_Management
-- -- -- -- alter database Project_Management MODIFY name  = projectManagementSystem
-- -- -- -- use projectManagementSystem

-- CREATE TABLE Users (
--     userID VARCHAR(300) not null PRIMARY KEY,
--     userName VARCHAR(255) not null,
--     email VARCHAR(255) not null UNIQUE,
--     password VARCHAR(255) not null,
--     isAdmin BIT DEFAULT 0,
--     AssignedProjectID INT, 
--     EmailSent BIT  DEFAULT 0,
--     phone_no VARCHAR (250) UNIQUE,
--     role varchar(20) DEFAULT 'employee',
-- );
-- -- -- -- select * from Users
-- -- -- drop table Users

--created the admin
-- update Users 
-- set role = 'admin'
-- where email = 'michealvenum007@gmail.com'



