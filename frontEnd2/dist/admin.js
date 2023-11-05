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
            checkbox.id = 'uniqueCheckboxId';
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
            //view tasks
            viewTaskButton.addEventListener('click', (e) => {
                e.preventDefault();
                const currentProjectID = project.projectID;
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
                let dates = new Date(project.endDate);
                const formattedEndDate = dates.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                });
                projectInfoDetails.innerHTML = `
                    
                        <li><strong>Project ID:</strong> ${project.projectID}</li>
                        <li><strong>Project Name:</strong> ${project.projectName}</li>
                        <li><strong>Description:</strong> ${project.projectDescription}</li>
                        <li><strong>End Date:</strong> ${formattedEndDate}</li>
                        <li><strong>Assigned User Email:</strong> ${project.AssignedUserEmail}</li>
                        <li><strong>Assigned User Name:</strong> ${project.AssignedUserName}</li>
                        <li><strong>Project Status:</strong> ${project.projectStatus}</li>
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
                //delete project
                deleteTaskButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
                    e.preventDefault();
                    alert('do you want to delete the project');
                    const deleteID = currentProjectID;
                    console.log(`this is it${deleteID}`);
                    try {
                        const response = yield fetch('http://localhost:4600/project/deleteProject', {
                            method: "DELETE",
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                "deleteID": deleteID
                            })
                        });
                        if (response.ok) {
                            console.log("deleted");
                        }
                        else {
                            const errorData = yield response.json();
                            console.log(`"Project deletion failed. Server returned:${errorData}`);
                            // assignError.textContent = `project Assignment failed :${JSON.stringify({ errorData })}`
                        }
                        console.log("fvfvf");
                    }
                    catch (error) {
                        console.error(error);
                    }
                }));
            });
        });
        console.log('All Project Details:', projectDetails);
    })
        .catch(error => {
        console.error('Error fetching projects:', error);
    });
});
// Fetch employees 
function fetchEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:4600/project/getUsers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            const selectEmployee = document.getElementById('userName');
            const emailInput = document.getElementById('email');
            data.forEach((employee) => {
                const option = document.createElement('option');
                option.value = employee.userName;
                option.textContent = employee.userName;
                option.setAttribute('data-email', employee.Email);
                selectEmployee.appendChild(option);
            });
            selectEmployee.addEventListener('change', () => {
                const selectedOption = selectEmployee.options[selectEmployee.selectedIndex];
                const selectedUserName = selectedOption.value;
                const selectedEmail = selectedOption.getAttribute('data-email');
                emailInput.value = selectedEmail || '';
            });
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
    });
}
fetchEmployees();
//assign task
const formContainer = document.getElementById('formContainer');
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.style.display = 'block';
    const backgroundOverlay = document.getElementById('backgroundOverlay');
    backgroundOverlay.style.display = 'block';
    const closeFormProject = document.getElementById('closeProjectForm');
    closeFormProject.addEventListener('click', (e) => {
        formContainer.style.display = 'none';
        backgroundOverlay.style.display = 'none';
    });
    let selectEmployee = document.getElementById('userName');
    let project_name = document.getElementById('project_name');
    let project_details = document.getElementById('project_details');
    let end_date = document.getElementById('endDate');
    let employee_email = document.getElementById('email');
    let assignError = document.getElementById('response');
    let assign_form = document.getElementById('project-form');
    selectEmployee.addEventListener('change', (e) => {
        let selectedOption = selectEmployee.options[selectEmployee.selectedIndex];
        let selectedUserName = selectedOption.value;
        let selectedEmail = selectedOption.getAttribute('email');
    });
    assign_form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        let projectName = project_name.value.trim();
        let projectDescription = project_details.value.trim();
        let endDate = end_date.value.trim();
        let AssignedUserName = selectEmployee.value.trim();
        let AssignedUserEmail = employee_email.value.trim();
        if (AssignedUserName === '' || AssignedUserEmail === '' || projectDescription === '' || endDate === '' || projectName === '') {
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
                    "projectDescription": projectDescription,
                    "endDate": endDate
                })
            });
            if (response.ok) {
                const data = yield response.json();
                console.log(data);
                assignError.textContent = 'project assigned successfully';
                assignError.style.color = 'blue';
                setTimeout(() => {
                    assignError.style.display = 'none';
                }, 3000);
                return;
            }
            else {
                const errorData = yield response.json();
                console.log("Project Assignation failed. Server returned:", errorData);
                assignError.textContent = `project Assignment failed :${JSON.stringify({ errorData })}`;
            }
            return;
        }
        catch (error) {
            const { message } = error;
            console.log(message);
            console.error("An error occurred during project assignment:", error);
        }
    }));
});
