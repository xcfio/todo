export const login = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
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
        input[type="text"], input[type="password"] {
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
        .register {
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
        <h1>Login</h1>
        <input type="text" id="username" placeholder="Enter your username" required>
        <input type="password" id="password" placeholder="Enter your password" required>
        <button onclick="login()">Login</button>
        <div class="error" id="error"></div>
        <div class="register" onclick="redirectToRegister()">Don't have an account? Register</div>
    </div>

    <script>
        function getCookie(name) {
            const value = \`;\${document.cookie}\`;
            const parts = value.split(\`;\${name}=\`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        document.addEventListener("DOMContentLoaded", () => {
            const authCookie = getCookie('auth');
            if (authCookie) {
                window.location.href = '/todo';
            }
        });

        async function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const errorElement = document.getElementById("error");
            errorElement.innerText = "";

            if (!username || !password) {
                return (errorElement.innerText = "Please fill in all fields");
            }

            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                });

                switch (response.status) {
                    case 200:
                        document.cookie = "auth=true; path=/"; // Set the auth cookie
                        window.location.href = '/todo';
                        break;

                    case 400:
                        errorElement.innerText = "Invalid username or password";
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

        function redirectToRegister() {
            window.location.href = '/register';
        }
    </script>
</body>
</html>
`
