# Volleyball Pre-Match Warm-Up Tracker

A web-based application designed to help referees track time and protocol during volleyball pre-match warm-ups. It features a timer, session management, and a clean interface.

## Features
- Countdown timer for warm-up protocols.
- Session management for multiple matches or courts.
- Secure, lightweight backend using Node.js and Express.
- Containerized deployment using Docker.

## Prerequisites
To run this application, you will need:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

*(Alternatively, you can run it directly using Node.js by running `npm install` and `npm start`)*

## Deployment

The application is fully containerized and can be deployed with a single command.

1. Clone the repository to your machine.
2. Navigate to the project directory:
   ```bash
   cd vb-referee-warmup-tracker
   ```
3. Start the container in detached mode using Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Access the application in your web browser at: `http://localhost:6789`

To stop the application, run:
```bash
docker-compose down
```

## Adding or Modifying Users

Authentication in this app is handled via a simple username check against a list of allowed users.

You can manage the allowed users easily through the `docker-compose.yml` file without needing to modify the code.

1. Open `docker-compose.yml` in a text editor.
2. Locate the `environment` section under the `volleyball-timer` service.
3. Update the `ALLOWED_USERS` variable with a comma-separated list of usernames you want to allow.
   ```yaml
   environment:
     - ALLOWED_USERS=warmup,newuser1,referee_john
   ```
4. Restart the Docker container to apply the changes:
   ```bash
   docker-compose up -d --force-recreate
   ```

*Note: If the `ALLOWED_USERS` environment variable is not provided, the app will fall back to the default list specified in `server.js`.*

## Architecture
- **Frontend**: Vanilla HTML/CSS/JavaScript. Found in the `/app` directory.
- **Backend**: Node.js with Express. Found in `server.js`.
- **Port Mapping**: Docker maps internal port `80` to external port `6789`.

## License
Refer to the `LICENSE` file for more details.
