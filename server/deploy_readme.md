## Steps to deploy to vercel

1. import your project
2. Edit the root directory to `server` , there will be also `pages` directory dont select that
3. After that you have to set environment variables. The environment variable formats are
    ```
    CONNECTION_URL="mongodb+srv://your mongodb url"
    SECRET_KEY="your_very_long_and_random_secret_key_here"
    ```

4. then deploy the server .
5. after that put the deployed url in the `Baselink.js` file. For now it uses my deployed url.