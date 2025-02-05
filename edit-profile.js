document.getElementById('editProfileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = 'USER_ID_HERE'; 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        const response = await fetch(`/api/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.success);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error updating user details:', error);
        alert('An error occurred while updating user details.');
    }
});
