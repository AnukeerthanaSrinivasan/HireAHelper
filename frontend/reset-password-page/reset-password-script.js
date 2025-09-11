// Handle reset password form submission
document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    
    // Here you would typically send this data to your server to generate and send OTP
    console.log('Reset password attempt for email:', email);
    
    // For demo purposes, redirect to OTP verification page
    alert('OTP sent to your email!');
    window.location.href = '../otp-page/verify-otp.html'; // Redirect to OTP verification page
});