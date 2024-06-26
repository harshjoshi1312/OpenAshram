# Open Ashram

Open Ashram is a web platform designed to facilitate affordable homestay bookings for customers, integrated with mapping features for easy navigation and exploration. This platform aims to provide a seamless user experience for finding and booking homestays.

Visit the live application: [Open Ashram](https://openashram-1.onrender.com/listing)

![Open Ashram Screenshot](./ssone.png)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Homestay Listings**: Customers can browse available homestays.
- **Interactive Map**: Integrated map feature for location visualization.
- **Booking System**: Allows customers to book homestays directly through the platform.
- **User Profiles**: Customers can create and manage their profiles.
- **Secure Authentication**: Utilizes Passport.js for secure user authentication.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/harshjoshi1312/OpenAshram.git
    cd OpenAshram
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add the following:
    ```bash
    SESSION_SECRET=your_session_secret
    ```

4. **Configure MongoDB**:
    - For **local setup**, ensure MongoDB is running.
    - For **cloud setup**, use your MongoDB connection string:
      ```bash
      MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/open-ashram?retryWrites=true&w=majority
      ```

5. **Start the Application**:
    ```bash
    npm start
    ```

6. **Access the Application**:
    Open your browser and go to:
    ```bash
    http://localhost:3000
    ```

## Usage

1. **Sign Up**: Register a new account.
2. **Explore Listings**: Browse available homestays and view details.
3. **Book a Homestay**: Select a homestay and proceed with booking.
4. **Map Feature**: Use the integrated map for location and directions.

## Dependencies

- [express](https://www.npmjs.com/package/express) `^4.19.2`
- [express-session](https://www.npmjs.com/package/express-session) `^1.18.0`
- [mongoose](https://www.npmjs.com/package/mongoose) `^8.3.3`
- [passport](https://www.npmjs.com/package/passport) `^0.7.0`
- [passport-local](https://www.npmjs.com/package/passport-local) `^1.0.0`
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose) `^8.0.0`

## Contributing

We welcome contributions from the community. Here’s how you can contribute:

1. **Fork the Repository**: Fork the repository on GitHub.
2. **Create a New Branch**: Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make Your Changes**: Commit your changes with a descriptive message:
    ```bash
    git commit -m "Add your feature description"
    ```
4. **Push Your Branch**: Push your branch to GitHub:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Create a Pull Request**: Create a pull request to merge your changes into the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For questions, suggestions, or feedback, please contact:

- **Your Name**
  - GitHub: [harshjoshi1312](https://github.com/harshjoshi1312)
  - Email: joshiharsh1312@gmail.com

---

Ensure to replace `your_session_secret` and update the MongoDB connection string (`MONGO_URI`) with your actual values in the `.env` file and application setup as necessary. For more detailed instructions or additional configurations, refer to the respective documentation or resources. Happy coding!
