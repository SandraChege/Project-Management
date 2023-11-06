
-- -- use projectManagementSystem
-- select * from Projects
-- -- drop procedure assignProject
-- delete from Projects
-- where  AssignedUserEmail = 'cylvonnen@gmail.com'



-- CREATE PROCEDURE assignProject
--     @projectID VARCHAR(300),
--     @projectName VARCHAR(250),
--     @projectDescription VARCHAR(500),
--     @endDate DATE,
--     @AssignedUserEmail VARCHAR(250),
--     @AssignedUserName VARCHAR(250)
-- AS
-- BEGIN
--     -- Check if the user exists in the Users table
--     IF EXISTS (
--         SELECT 1
--         FROM Users
--         WHERE email = @AssignedUserEmail
--     )
--     BEGIN
--         -- Check if the user is already assigned to a project that is not completed
--         IF EXISTS (
--             SELECT 1
--             FROM Projects
--             WHERE AssignedUserEmail = @AssignedUserEmail
--               AND isCompleted = 0
--         )
--         BEGIN
--             SELECT -1 AS AssignmentResult; -- User is already assigned to an active project
--         END
--         ELSE
--         BEGIN
--             -- Insert the project if the user is not assigned to any active project
--             INSERT INTO Projects (projectID, projectName, projectDescription, endDate, AssignedUserEmail, AssignedUserName)
--             VALUES (@projectID, @projectName, @projectDescription, @endDate, @AssignedUserEmail, @AssignedUserName);

--             SELECT @projectID AS AssignedProjectID;
--         END
--     END
--     ELSE
--     BEGIN
--         SELECT -2 AS AssignmentResult; -- User doesn't exist in the Users table
--     END
-- END

-- 

