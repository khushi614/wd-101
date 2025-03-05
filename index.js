// Form and Table
const form = document.getElementById("user_form");
const tableBody = document.getElementById("entries_table_body");

// Function to get age from date of birth
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Form Submission Handler
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    // Validate date of birth (18-55 years)
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    // Store data in local storage
    const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    userEntries.push({ name, email, password, dob, terms });
    localStorage.setItem("userEntries", JSON.stringify(userEntries));

    // Add data to the table
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${name}</td>
        <td class="border border-gray-300 px-4 py-2">${email}</td>
        <td class="border border-gray-300 px-4 py-2">${password}</td>
        <td class="border border-gray-300 px-4 py-2">${dob}</td>
        <td class="border border-gray-300 px-4 py-2">${terms}</td>
    `;
    tableBody.appendChild(row);

    // Reset the form
    form.reset();
});

// Load existing entries from local storage
document.addEventListener("DOMContentLoaded", () => {
    const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    userEntries.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${entry.name}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.email}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.password}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.dob}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.terms}</td>
        `;
        tableBody.appendChild(row);
    });
});
