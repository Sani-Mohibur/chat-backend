# Chat Backend

This is a **_real-time chat backend_** server for a chat application, built with Node.js and Socket.IO. It manages user connections, broadcasts chat messages instantly to all connected clients, and saves chat history to a JSON file for persistence.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

> **⚠️ Important Note**  
> This is the **backend only**. It provides the API and real-time server that the frontend consumes.  
> To view the frontend, visit the [chat-frontend repository](https://github.com/Sani-Mohibur/chat-frontend).


## Features

* **WebSocket Server:** Establishes and manages real-time, bi-directional communication with clients using Socket.IO.
* **Message Broadcasting:** Receives messages from one client and instantly broadcasts them to all other clients in the chat.
* **User Activity Management:**
    * Maintains a list of currently active users.
    * Broadcasts updates when a new user joins.
    * Notifies clients when a user disconnects.
* **"Typing" Indicator:** Relays typing status events between clients.
* **CORS Enabled:** Configured with the `cors` middleware to allow requests from the frontend application running on a different origin.

## Technologies Used

* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Real-Time Engine:** Socket.IO
* **Middleware:** CORS
* **Development Utility:** Nodemon (for automatic server restarts)

## Socket.IO Events

The server listens for and emits the following events:

| Event Name          | Triggered By                                     | Action                                                              |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| **`connection`** | A new client connects to the server.             | Logs the new connection and sets up other event listeners for them. |
| **`message`** | A client sends a chat message.                   | Emits `messageResponse` to all clients with the message data.       |
| **`typing`** | A client starts/stops typing.                    | Broadcasts `typingResponse` to other clients.                       |
| **`newUser`** | A new user joins the chat with a username.       | Adds the user to the list and emits `newUserResponse` to all.       |
| **`disconnect`** | A client disconnects (e.g., closes the browser). | Removes the user and broadcasts the updated user list.              |

## Getting Started Locally

### Prerequisites

* Node.js (v18 or later)
* npm (Node Package Manager)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Sani-Mohibur/chat-backend.git
    cd chat-backend
    ```

2.  **Install Dependencies:**
    ```sh
    npm install
    ```

3.  **Run the Server (Development Mode):**
    This command uses `nodemon` to automatically restart the server whenever you save a file.
    ```sh
    npm run dev
    ```

4.  **Run the Server (Production Mode):**
    ```sh
    npm start
    ```

5.  **Confirmation:**
    The server will start, and you will see a confirmation message in your terminal:
    `Server is running on port 3000`

The backend is now ready to accept connections from the `chat-frontend` application.

## Live Server

You can access the deployed backend server here:  
https://chat-backend-production-35bd.up.railway.app

## Author

**Mohibur Rahman Sani**  
GitHub: [@Sani-Mohibur](https://github.com/Sani-Mohibur)
