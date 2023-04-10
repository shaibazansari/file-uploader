# Sign In using Google and File Uploader

This project is a web application that allows users to sign in using their Google account and upload any kind of file on the web server. After logging in, users can view all the uploaded files and download them by clicking on the file name.

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Multer (for handling file uploads)
- Bootstrap (for styling)


## Getting Started

### Server
To get started with the server part of this project, follow these steps:
- Clone the repository to your local machine.
- Install the necessary dependencies by running npm install in the project directory.
- Rename the .env.demo file to .env.local and update the environment variables as required.
- Start the development server by running npm run dev in the server directory.
- The server is now running and can be accessed at [http://localhost:9000](http://localhost:9000).

### Client
To get started with the client part of this project, follow these steps:
- Navigate to the client directory by running cd client in your terminal.
- Install the necessary dependencies by running npm install in the client directory.
- Start the development server by running npm start in the client directory.
- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- Google Authentication: Allows users to sign in using their Google account.
- File Uploader: Allows users to upload any type of file on the web server.
- File Browser: Allows users to view all the uploaded files and download them by clicking on the file name.

## Security

This project has been designed with security in mind. We use Google's OAuth for authentication and the uploaded files are stored securely in a local directory.

## Contributing

If you want to contribute to this project, feel free to open a pull request. We welcome all contributions.

## License

[MIT](https://choosealicense.com/licenses/mit/)