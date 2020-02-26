# Smart live chat backend

Deploy all cloud functions on [GCP](cloud.google.com)(Google Cloud Platform)

You can log in with chatbuddies2019@gmail.com and go to console

1. Run locally

   ```
   cd functions
   npm run serve
   ```

2. Deploy

   ```
   firebase deploy
   ```

   To run this command, you need to install firebase CLI first, instructions can be found [here](https://firebase.google.com/docs/cli)



**Important!!!**

Do not expose the permissions.json publicly as it contains the private key to access our database.

