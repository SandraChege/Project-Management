window.addEventListener('DOMContentLoaded', () => {
    const projectDetails: any[] = [];
    const projectItemsContainer = document.getElementById("projectItems") as HTMLElement;
    const completedCard = document.getElementById('completed') as HTMLElement;
    const uncompletedCard = document.getElementById('uncompleted') as HTMLElement;
    const projectInfo = document.getElementById('projectInfo') as HTMLDivElement;
    const formContainer = document.getElementById('formContainer') as HTMLDivElement;
    const addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;



    fetch('http://localhost:4600/project/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: any[]) => {
            data.forEach((project: any) => {
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
                } else {
                    uncompletedCard.appendChild(taskItem);
                }

                //assign task
                addTaskButton.addEventListener('click', (e) => {
                    formContainer.style.display = 'block'
                    const backgroundOverlay = document.getElementById('backgroundOverlay') as HTMLDivElement;
                    backgroundOverlay.style.display = 'block';

                    const closeFormProject = document.getElementById('closeProjectForm') as HTMLButtonElement;
                    closeFormProject.addEventListener('click', (e) => {
                        formContainer.style.display = 'none';
                        backgroundOverlay.style.display = 'none';
                    });


                    let project_name = document.getElementById('project_name') as HTMLInputElement;
                    let project_details = document.getElementById('project_details') as HTMLInputElement;
                    let end_date = document.getElementById('endDate') as HTMLInputElement;
                    let employee_email = document.getElementById('email') as HTMLInputElement;
                    let employee_name = document.getElementById('name') as HTMLInputElement;
                    let assignError = document.getElementById('response') as HTMLElement

                    let assign_form = document.getElementById('project-form') as HTMLFormElement;

                    assign_form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        let projectName = project_name.value.trim();
                        let projectDetails = project_details.value.trim();
                        let endDate = end_date.value.trim();
                        let AssignedUserName = employee_name.value.trim();
                        let AssignedUserEmail = employee_email.value.trim();
                        
                       

                        if (AssignedUserName === '' || AssignedUserEmail === '' || projectDetails === '' || endDate === '' || projectName === '') {
                            assignError.textContent = 'please fill all fields'
                            return;
                        }

                      

                        try {
                            const response = await fetch('http://localhost:4600/project/assignProject', {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "projectName":projectName,
                                    "AssignedUserName": AssignedUserName,
                                    "AssignedUserEmail": AssignedUserEmail,
                                    "projectDetails": projectDetails,
                                    "endDate": endDate
                                })
                            });

                            if (response.ok) {
                                const data = await response.json();
                                console.log(data);
                                gotoLogin();
                            } else {
                                const errorData = await response.json();
                                console.log("Project Assignation failed. Server returned:", errorData);
                                assignError.textContent = `project Assignment failed :${JSON.stringify({ errorData })}`
                            }
                        } catch (error) {
                            const { message }: any
                                = error
                            console.log(message);

                            console.error("An error occurred during project assignment:", error);


                        }
                    });

                    function gotoLogin() {
                        location.href = 'admin.html';
                    }







                })


                viewTaskButton.addEventListener('click', (e) => {
                    e.preventDefault();

                    const backgroundOverlay = document.getElementById('backgroundOverlay') as HTMLDivElement;
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
