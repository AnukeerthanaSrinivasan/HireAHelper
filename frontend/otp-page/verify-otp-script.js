// Auto-focus to next input when a digit is entered
document.addEventListener('DOMContentLoaded', function() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        // Focus on next input after entering a digit
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        // Handle backspace to go to previous input
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
    
    // Handle submit button click
    document.getElementById('submitOtp').addEventListener('click', function() {
        let otp = '';
        let isComplete = true;
        
        // Collect OTP from all inputs
        otpInputs.forEach(input => {
            if (input.value.length === 0) {
                isComplete = false;
            }
            otp += input.value;
        });
        
        if (!isComplete) {
            alert('Please enter the complete OTP');
            return;
        }
        
        // Here you would typically send the OTP to your server for verification
        console.log('Verifying OTP:', otp);
        
        // For demo purposes, show success and redirect to a new password page
        alert('OTP verified successfully!');
        // Redirect to a page where user can set a new password
        // window.location.href = 'new-password.html';
        
        // For now, just redirect back to login
        window.location.href = 'login.html';
    });
});