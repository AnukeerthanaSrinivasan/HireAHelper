// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// Get buttons that open the modals
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Get the close button elements
const closeBtns = document.getElementsByClassName('close');

// Redirect to login page when login button is clicked
loginBtn.addEventListener('click', () => {
    window.location.href = '../login-page/login.html';
});

// Redirect to signup page when signup button is clicked
signupBtn.addEventListener('click', () => {
    window.location.href = '../signup-page/signup.html';
});

// Close modals when close button is clicked
for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', function() {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
}

// Close modals when clicking outside of modal content
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically send this data to your server
    console.log('Signup attempt:', { fullName, email, password });
    
    // For demo purposes, just close the modal and show an alert
    alert('Signup successful!');
    signupModal.style.display = 'none';
});