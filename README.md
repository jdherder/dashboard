#Dashboard
A time and weather dashboard for use as a new tab or lock screen.

###Up and Running:

To get started, run the following commands at project root:
* 'npm install'
    * Install required dependencies.
* 'npm run start'
    * Start the app locally on port 3000. This should open a new tab to localhost:3000 in your browser.

Building files to place on server:
* 'npm run build'
    * This will create a 'build' folder at project root. Copy these files within this folder to the web server site root after successful build to deploy for production.
    
###Configuration:

If you would like to set your location for weather data, simply use a query param. Examples:

http://localhost:3000?location=66086
http://localhost:3000/?location=Pittsburg,%20KS

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).