"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('user_email');
    if (userEmail) {
        console.log(userEmail);
    }
    else {
        console.log('userEmail not found');
    }
    const projectDetails = [];
    fetch('http://localhost:4600/project/')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        projectDetails.push(...data);
        const user_project = projectDetails.filter(project => project.AssignedUserEmail === userEmail);
        console.log(user_project);
        const projectBriefs = document.querySelector('.projectItem');
        user_project.forEach(project => {
            const projectName = document.createElement('li');
            projectName.classList.add('projectName');
            projectName.textContent = project.projectName;
            const projectDescription = document.createElement('li');
            projectName.classList.add('projectDetails');
            projectDescription.textContent = `Project Description :${project.projectDescription}`;
            const project_Assignee = document.createElement('li');
            projectName.classList.add('projectDetails');
            project_Assignee.textContent = `Assigned User: ${project.AssignedUserName}`;
            const project_End_Date = document.createElement('li');
            projectName.classList.add('projectDetails');
            project_End_Date.textContent = `Project End Date:   ${project.endDate}`;
            const project_Assignee_Email = document.createElement('li');
            projectName.classList.add('projectDetails');
            project_Assignee_Email.textContent = `Assigned User Email:  ${project.AssignedUserEmail}`;
            projectBriefs.appendChild(projectName);
            projectBriefs.appendChild(projectDescription);
            projectBriefs.appendChild(project_End_Date);
            projectBriefs.appendChild(project_Assignee);
            projectBriefs.appendChild(project_Assignee_Email);
        });
        //project status update
        const statusDiv = document.querySelector(".status");
        const statusOptions = ["Started", "Halfway", "Completed", "Pending"];
        statusOptions.forEach((status) => {
            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.name = "status";
            radioBtn.value = status;
            const label = document.createElement("label");
            label.textContent = status;
            statusDiv.appendChild(radioBtn);
            statusDiv.appendChild(label);
            statusDiv.appendChild(document.createElement("br"));
            radioBtn.addEventListener("click", () => {
                const selectedStatus = radioBtn.value;
                updateStatusOnServer(selectedStatus, userEmail);
            });
        });
        function updateStatusOnServer(newStatus, userEmail) {
            fetch("http://localhost:4600/project/projectStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    AssignedUserEmail: userEmail,
                    NewStatus: newStatus,
                }),
            })
                .then((response) => {
                if (response.ok) {
                    console.log("Project status updated successfully.");
                }
                else {
                    console.error("Failed to update project status.");
                }
            })
                .catch((error) => {
                console.error("Error updating project status:", error);
            });
        }
    })
        .catch(error => {
        console.error('Error fetching projects:', error);
    });
});
