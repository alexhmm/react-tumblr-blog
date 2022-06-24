# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tutorial

### General Information

- Custom theming: `https://www.tumblr.com/docs/de/custom_themes` doesn't seem to work.
- Tumblr Editor doesn't recognize template variables including ':' symbols (e.g. {block:ifMetaTag} won't work).
- Usage of the Tumblr API V2: `https://www.tumblr.com/docs/en/api/v2` is necessary.

Create your environment files to declare global variables:

```
REACT_APP_API_KEY=YOUR_TUMBLR_API_KEY
REACT_APP_API_URL=https://api.tumblr.com/v2/blog/YOUR_TUMBLR_URL
```

- .env.development (used with `npm run start` in development mode)
- .env.production (used with `npm run build` for a production build)

### Routing

Common Tumblr endpoints are used with _react-router-dom_ in this project:

- /page/:pageNumber
- /post/:postId
- /post/:postId/:caption
- /tagged/:tag
- /tagged/:tag/page/:pageNumber

Parameters get extracted and will fetch the according posts.

## Deployment on Tumblr

- Run `npm run build` to build a production build
- Move `<script defer="defer" src="/static/js/main.xxx.js"></script>` from `<head>` to the end of the `<body>` tag to prevent `Error: Minified React error #200;`
- Run `npm run inline` to inline _index.html_ that creates an _inline.html_ for deployment
- Copy the complete content from _build/inline.html_ and paste it into the Tumblr Editor
- Preview in Tumblr Editor might be unavailable

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
