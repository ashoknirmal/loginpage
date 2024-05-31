$(document).ready(function(){
    // Function to handle login form submission
    function login(event) {
        event.preventDefault(); // Prevent form submission

        // Get the input values
        var username = $('#username').val();
        var password = $('#password').val();

        // Send POST request to Node.js server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "success.html"; // Redirect to success page
            } else {
                alert("Invalid username or password. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to redirect to create account page
    // function redirectToCreateAccount() {
    //     window.location.href = "create.html"; // Redirect to create account page
    // }

    // Submit create account form using AJAX
    $('#createAccountForm').submit(function(e){
        e.preventDefault(); // prevent the default form submission
        var formData = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        
        $.ajax({
            type: 'POST',
            url: '/create-account',
            data: formData,
            success: function(response){
                console.log(response);
                // Handle success response
            },
            error: function(error){
                console.error('Error:', error);
                // Handle error
            }
        });
    });
});
