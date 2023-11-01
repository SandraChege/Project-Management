-- use projectManagementSystem
-- drop procedure deleteProject
CREATE PROCEDURE deleteProject
    @projectID VARCHAR(300),
    @userRole VARCHAR(50)
AS
BEGIN
    -- Check if the user's role is 'admin'
    IF @userRole = 'admin'
    BEGIN
        -- Check if the project exists
        IF EXISTS (
            SELECT 1
            FROM Projects
            WHERE projectID = @projectID
        )
        BEGIN
            -- Delete the project
            DELETE FROM Projects
            WHERE projectID = @projectID;

            SELECT 1 AS DeletionResult; -- Project deleted successfully
        END
        ELSE
        BEGIN
            SELECT -2 AS DeletionResult; -- Project with the provided ID does not exist
        END
    END
    ELSE
    BEGIN
        SELECT -1 AS DeletionResult; -- User does not have the 'admin' role
    END
END

