"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('DOMContentLoaded', () => {
    const projectDetails = [];
    const projectItemsContainer = document.getElementById("projectItems");
    const completedCard = document.getElementById('completed');
    const uncompletedCard = document.getElementById('uncompleted');
    const projectInfo = document.getElementById('projectInfo');
    const formContainer = document.getElementById('formContainer');
    const addTaskButton = document.getElementById('addTaskButton');
    fetch('http://localhost:4600/project/')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        data.forEach((project) => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('projectItem');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkboxx');
            const projectNameSpan = document.createElement('span');
            projectNameSpan.textContent = project.projectName;
            const projectID = document.createElement('li');
            projectID.textContent = project.projectID;
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('buttonContainer');
            const viewTaskButton = document.createElement('button');
            viewTaskButton.classList.add('viewTaskButton');
            viewTaskButton.innerHTML = '<i class="fas fa-eye"></i>';
            projectItem.appendChild(checkbox);
            projectItem.appendChild(projectNameSpan);
            buttonContainer.appendChild(viewTaskButton);
            projectItem.appendChild(buttonContainer);
            projectItemsContainer.appendChild(projectItem);
            const taskItem = document.createElement('li');
            taskItem.textContent = project.projectName;
            const truth = project.isCompleted;
            console.log(`Answer: ${truth}`);
            if (truth === true) {
                completedCard.appendChild(taskItem);
            }
            else {
                uncompletedCard.appendChild(taskItem);
            }
            //assign task
            addTaskButton.addEventListener('click', (e) => {
                formContainer.style.display = 'block';
                const backgroundOverlay = document.getElementById('backgroundOverlay');
                backgroundOverlay.style.display = 'block';
                const closeFormProject = document.getElementById('closeProjectForm');
                closeFormProject.addEventListener('click', (e) => {
                    formContainer.style.display = 'none';
                    backgroundOverlay.style.display = 'none';
                });
                let project_name = document.getElementById('project_name');
                let project_details = document.getElementById('project_details');
                let end_date = document.getElementById('endDate');
                let employee_email = document.getElementById('email');
                let employee_name = document.getElementById('name');
                let assignError = document.getElementById('response');
                let assign_form = document.getElementById('project-form');
                assign_form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
                    event.preventDefault();
                    let projectName = project_name.value.trim();
                    let projectDetails = project_details.value.trim();
                    let endDate = end_date.value.trim();
                    let AssignedUserName = employee_name.value.trim();
                    let AssignedUserEmail = employee_email.value.trim();
                    if (AssignedUserName === '' || AssignedUserEmail === '' || projectDetails === '' || endDate === '' || projectName === '') {
                        assignError.textContent = 'please fill all fields';
                        return;
                    }
                    try {
                        const response = yield fetch('http://localhost:4600/project/assignProject', {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                "projectName": projectName,
                                "AssignedUserName": AssignedUserName,
                                "AssignedUserEmail": AssignedUserEmail,
                                "projectDetails": projectDetails,
                                "endDate": endDate
                            })
                        });
                        if (response.ok) {
                            const data = yield response.json();
                            console.log(data);
                            gotoLogin();
                        }
                        else {
                            const errorData = yield response.json();
                            console.log("Project Assignation failed. Server returned:", errorData);
                            assignError.textContent = `project Assignment failed :${JSON.stringify({ errorData })}`;
                        }
                    }
                    catch (error) {
                        const { message } = error;
                        console.log(message);
                        console.error("An error occurred during project assignment:", error);
                    }
                }));
                function gotoLogin() {
                    location.href = 'admin.html';
                }
            });
            viewTaskButton.addEventListener('click', (e) => {
                e.preventDefault();
                const backgroundOverlay = document.getElementById('backgroundOverlay');
                backgroundOverlay.style.display = 'block';
                projectInfo.innerHTML = '';
                projectInfo.style.display = 'block';
                const projectDetailsDiv = document.createElement('div');
                const projectInfoButtons = document.createElement('div');
                projectInfoButtons.classList.add('infoButtons');
                const closeProjectInfo = document.createElement('button');
                closeProjectInfo.textContent = 'Close';
                const deleteTaskButton = document.createElement('button');
                deleteTaskButton.innerHTML = '<i class="fas fa-trash"></i>';
                const projectInfoTitle = document.createElement('h2');
                projectInfoTitle.textContent = 'Project Details';
                projectDetailsDiv.appendChild(projectInfoTitle);
                const projectInfoDetails = document.createElement('ul');
                projectInfoDetails.classList.add('details');
                projectInfoDetails.innerHTML = `
                        <li><strong>Project ID:</strong> ${project.projectID}</li>
                        <li><strong>Project Name:</strong> ${project.projectName}</li>
                        <li><strong>Description:</strong> ${project.projectDescription}</li>
                        <li><strong>End Date:</strong> ${project.endDate}</li>
                        <li><strong>Assigned User Email:</strong> ${project.AssignedUserEmail}</li>
                        <li><strong>Assigned User Name:</strong> ${project.AssignedUserName}</li>
                        <li><strong>Is Completed:</strong> ${truth ? 'Yes' : 'No'}</li>
                    `;
                projectDetailsDiv.appendChild(projectInfoDetails);
                projectInfoButtons.appendChild(closeProjectInfo);
                projectInfoButtons.appendChild(deleteTaskButton);
                projectInfo.appendChild(projectDetailsDiv);
                projectInfo.appendChild(projectInfoButtons);
                closeProjectInfo.addEventListener('click', (e) => {
                    projectInfo.style.display = 'none';
                    backgroundOverlay.style.display = 'none';
                });
            });
        });
        console.log('All Project Details:', projectDetails);
    })
        .catch(error => {
        console.error('Error fetching projects:', error);
    });
});
