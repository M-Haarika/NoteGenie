document.addEventListener("DOMContentLoaded", function () {
    let registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            registerUser();
        });
    }
});

function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("errorMessage");

    // Password validation
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Get existing users or create an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    let userExists = users.some(user => user.email === email);
    if (userExists) {
        errorMessage.textContent = "Email already registered.";
        return;
    }

    // Store new user
    let newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("User Registered:", newUser);
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
}
function login() {
    let email = document.getElementById("email").value.trim(); // Trim to remove extra spaces
    let password = document.getElementById("password").value;

    // Retrieve users from Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    console.log("Stored Users:", users); // Debugging log to check stored users

    if (users.length === 0) {
        alert("No users registered. Please register first.");
        return;
    }

    // Find user with matching email and password
    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert("Login Successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(validUser)); // Store logged-in user
        window.location.href = "home.html"; // Redirect
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

