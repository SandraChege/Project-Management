"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const projectDetails = [];
    fetch('http://localhost:4600/project/')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        console.log('All Project Details:', projectDetails);
    })
        .catch(error => {
        console.error('Error fetching projects:', error);
    });
});
