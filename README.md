[![CircleCI](https://circleci.com/gh/alburdette619/InstaClone/tree/master.svg?style=svg)](https://circleci.com/gh/alburdette619/InstaClone/tree/master)

# InstaClone

A limited functionality Instagram Clone for personal image viewing. The application allows users to upload pictures from their camera and gallery to view in the app. The user has an account page where they can change their username and avatar.

---

### Running the app

#### iOS

Due to a recent policy change by Apple, Expo is no longer able to share apps across users on iOS. Therefore, to be able to use the app on iOS the source must be cloned and run on a simulator. This is less than ideal as **the camera CANNOT be acessed from the simulator**. Please see [the corresponding Medium article from Expo](https://blog.expo.io/upcoming-limitations-to-ios-expo-client-8076d01aee1a)

* Clone the source
* cd to the root directory of the app
* Execute `yarn/npm install`
* Execute `yarn ios`
* Agree to run on Expo

#### Android

Download [the Expo Client App](http://onelink.to/jcpnyt). Once installed, you can then find the app at the following link or by scanning the provided QR code with the Expo Client App.

[InstaClone on Expo](https://expo.io/@alburdet619/instaclone)

![QR]

[qr]: ./resources/images/expo_qr.png

---

### Testing the app

Simply run `yarn test` in the root directory of the app to have the snapshots tested.
