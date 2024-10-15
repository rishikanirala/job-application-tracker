document.getElementById('applicationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    const table = document.getElementById('applicationTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = company;
    newRow.insertCell(1).textContent = position;
    newRow.insertCell(2).textContent = date;
    newRow.insertCell(3).textContent = status;

    document.getElementById('applicationForm').reset();
});
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    fetchApplications(); // Fetch existing applications when the page loads

    // Set up the form submission handler
    document.getElementById('applicationForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect the data from the form
        const company = document.getElementById('company').value;
        const position = document.getElementById('position').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;

        // Send the data to the server
        const response = await fetch('http://localhost:5000/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ company, position, date, status })
        });

        if (response.ok) {
            const application = await response.json();
            addApplicationToTable(application); // Add new application to the table
            document.getElementById('applicationForm').reset(); // Clear the form
        } else {
            console.error('Error adding application');
        }
    });
});

// Function to fetch existing applications from the server
async function fetchApplications() {
    const response = await fetch('http://localhost:5000/applications');
    const applications = await response.json();
    applications.forEach(addApplicationToTable); // Display each application in the table
}

// Function to add a single application to the HTML table
function addApplicationToTable(application) {
    const table = document.getElementById('applicationTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = application.company;
    newRow.insertCell(1).textContent = application.position;
    newRow.insertCell(2).textContent = application.date;
    newRow.insertCell(3).textContent = application.status;
}
// Function to add application to the table
document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    // Create a new row in the applications table
    const table = document.getElementById('applicationTable');
    const row = table.insertRow();
    row.innerHTML = `
        <td>${company}</td>
        <td>${position}</td>
        <td>${date}</td>
        <td>${status}</td>
        <td>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
    `;

    // Clear the form after adding an entry
    document.getElementById('applicationForm').reset();

    // Attach delete functionality to the new row
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        deleteApplication(row);
    });
});

// Function to delete a row
function deleteApplication(row) {
    row.remove();
    // Here, add a call to the backend to delete from the database as well.
}
// Delete an application by ID (you should pass the application ID for real applications)
app.delete('/applications/:id', (req, res) => {
    const applicationId = req.params.id;

    // Assuming you have a MongoDB collection called 'applications'
    db.collection('applications').deleteOne({ _id: new ObjectId(applicationId) }, (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting application');
        }
        res.status(200).send('Application deleted');
    });
});
