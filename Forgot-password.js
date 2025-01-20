function handleForgotPassword(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    const email = document.getElementById('email').value;
    
    if (email) {
        alert(`Password reset instructions have been sent to ${email}`);
    } else {
        alert('Please enter your email address.');
    }
}
