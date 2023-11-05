-- use projectManagementSystem
-- SELECT * FROM Projects

create procedure projectCompleted
@projectID VARCHAR(300)
as
begin
update Projects
set isCompleted = 1
where isCompleted = 0 and projectID = @projectID
end

drop PROCEDURE projectCompleted