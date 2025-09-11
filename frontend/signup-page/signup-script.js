// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically send this data to your server for account creation
    console.log('Signup attempt:', { firstName, lastName, email, password });
    
    // For demo purposes, just redirect to login page after signup
    alert('Account created successfully!');
    window.location.href = '../login-page/login.html'; // Redirect to login page after signup
});

// Handle Google signup
document.querySelector('.google-signup').addEventListener('click', function() {
    // Here you would implement Google OAuth signup
    console.log('Google signup clicked');
    alert('Google signup functionality would be implemented here');
});