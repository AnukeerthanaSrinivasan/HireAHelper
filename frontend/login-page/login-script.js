// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically send this data to your server for authentication
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, just redirect to a dashboard or home page
    alert('Login successful!');
    window.location.href = '../landing-page/index.html'; // Redirect to home page after login
});

// Handle Google login
document.querySelector('.google-login').addEventListener('click', function() {
    // Here you would implement Google OAuth login
    console.log('Google login clicked');
    alert('Google login functionality would be implemented here');
});

// Handle forgot password link
document.querySelector('.forgot-password').addEventListener('click', function(event) {
    event.preventDefault();
    // Redirect to password reset page
    window.location.href = '../reset-password-page/reset-password.html';
});