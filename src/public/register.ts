export const register = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .container {
            background: #fff;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
            width: 350px;
            transition: all 0.3s ease-in-out;
        }
        .container:hover {
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }
        h1 {
            margin-bottom: 25px;
            color: #333;
            font-size: 24px;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            width: calc(100% - 20px);
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }
        button:hover {
            background-color: #0056b3;
        }
        .error {
            color: red;
            font-size: 14px;
            margin-top: 10px;
        }
        .login {
            margin-top: 10px;
            font-size: 14px;
            color: #007bff;
            cursor: pointer;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Register</h1>
        <input type="text" id="username" placeholder="Enter your username" required>
        <input type="email" id="email" placeholder="Enter your email" required>
        <input type="password" id="password" placeholder="Enter your password" required>
        <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
        <button onclick="register()">Register</button>
        <div class="error" id="error"></div>
        <div class="login" onclick="redirectToLogin()">Already have an account? Login</div>
    </div>

    <script>
        async function register() {
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const errorElement = document.getElementById("error");
            errorElement.innerText = "";

            if (!username || !email || !password || !confirmPassword) {
                return (errorElement.innerText = "Please fill in all fields");
            }

            if (password !== confirmPassword) {
                return (errorElement.innerText = "Passwords do not match");
            }

            try {
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, email, password })
                });

                switch (response.status) {
                    case 200:
                        alert("Registration successful");
                        window.location.href = '/login';
                        break;

                    case 400:
                        errorElement.innerText = "Invalid input. Please check your details.";
                        break;

                    default:
                        errorElement.innerText = "An error occurred. Please try again.";
                        break;
                }
            } catch (error) {
                console.error("Error:", error);
                errorElement.innerText = "An error occurred. Please try again.";
            }
        }

        function redirectToLogin() {
            window.location.href = '/login';
        }
    </script>
</body>
</html>
`
