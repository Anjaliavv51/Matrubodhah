## Setup instructions for backend

1. first create a `.env` file in the root of the project
    The format for the `.env` file will be -
    ```
    const uri = ;
    CONNECTION_URL="mongodb+srv://mongourl"
    SECRET_KEY="your_very_long_and_random_secret_key_here"
    CLOUD_NAME='cloudinary cred'
    API_KEY='cloudinary cred'
    API_SECRET='cloudinary cred'
    ```

2. the `cd` to server folder and install the all the packages using `npm i`

3. the go to root foler using `cd ..` and start the server using `nodemon server/api/index.js`
4. then the server will start on `http://localhost:3000` and the routes are 
    - base route - `/api/v1/`
    - auth routes - `/api/vi/auth`
        login - `/login`
        register - `/register`
    - profile routes- `/api/v1/profile`
        get profile -`/getprofile`
        delete profile - `/deleteprofile`
        edit profile - `/editprofile` and also here the req format will be `form-data`

And for deploying the server to vercel check the `deploy_readme.md`
