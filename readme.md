# Project Overview
## Firebase
* firebaseConfig.js
  * exports the config (magic numbers for hosting and stuff)
  * Content comes from https://console.firebase.google.com/u/0/project/scottland-dramas/overview
* Initialising the app - happens in 2 places?
  * src/main.js
    * It does not create an object (like the FB we page says) it is just this
    * ``firebase.initializeApp(firebaseConfig);``

