window.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('user_email');
    if(userEmail){
        console.log(userEmail)
    }else{
        console.log('userEmail not found');
        
    }
    const projectDetails: any[] = [];

    fetch('http://localhost:4600/project/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: any[]) => {
            projectDetails.push(...data); 
            const user_project = projectDetails.filter(project=>project.AssignedUserEmail === userEmail)
            console.log(user_project);

            const projectBriefs = document.querySelector('.projectItem') as HTMLElement;
            user_project.forEach(project => {

                const projectName = document.createElement('li');
                projectName.classList.add('projectName');
                projectName.textContent = project.projectName; 

                const projectDescription = document.createElement('li');
                projectName.classList.add('projectDetails');
                projectDescription.textContent = project.projectDescription

                const project_Assignee = document.createElement('li');
                projectName.classList.add('projectDetails');
                project_Assignee.textContent = `Assigned User: ${project.AssignedUserName}`
               
                const project_End_Date = document.createElement('li');
                projectName.classList.add('projectDetails');
                project_End_Date.textContent = `Project End Date:   ${project.endDate}`


                const project_Assignee_Email= document.createElement('li');
                projectName.classList.add('projectDetails');
                project_Assignee_Email.textContent = `Assigned User Email:  ${project.AssignedUserEmail}`
               
                projectBriefs.appendChild(projectName);
                projectBriefs.appendChild(projectDescription);
                projectBriefs.appendChild(project_End_Date)
                projectBriefs.appendChild(project_Assignee)
                projectBriefs.appendChild(project_Assignee_Email)
                
            });
            const submit_Task_Button = document.querySelector('.submitTaskButton') as HTMLButtonElement
            submit_Task_Button.addEventListener('click',(e)=>{
                alert('do you wish to submit')
            })
    
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
});
