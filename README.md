# Motio

### About

Motio is a healthcare companion app, using the sensors on your device you can count almost any workouts. No wearables needed.

![alt text](https://i.imgur.com/kHYGeuS.png)

## Setup

- environment setup please follow this `getting started` step by step tutorial https://facebook.github.io/react-native/docs/getting-started.html
- run `npm install` or `yarn` to download modules
- run `react-native link` to link native dependency and assets
- start packager with `react-native start`, `yarn start` or `npm start`
- run `react-native run-android` or `react-native run-ios` to deploy it to emulator / device

## Environment 

- Copy and rename `local.example.js` to `local.js`
- Add these lines to `local.js` 
```
export const firebaseConfig = {
    apiKey: "<YOUR API KEY>",    
    authDomain: "<YOUR AUTH DOMAIN>",
    databaseURL: "<YOUR DATABASE URL>",
    storageBucket: "<YOUR STORAGE BUCKET>"
};
```

- Replace everything inside the "" with your own firebase config 

## Linting

### vscode
install `eslint` extension from `EXTENSIONS` menu

### command line
follow these step https://eslint.org/docs/user-guide/command-line-interface

## Contributing Guide

- make a new branch : `git checkout -b "#issue_number-issue_title"` i.e: `git checkout -b "#1-create-login-page`
- make a clear commit message related with the issue: `git commit -m "#issue_number commit_message"` i.e.: `git commit -m "#1 add login button"`
- push to your branch : `git push origin <your_branch>`
- pull/merge request: describe what you've done within the issue, and add issue reference to your description with `#issue_number`
- attach screenshot for what you've done
