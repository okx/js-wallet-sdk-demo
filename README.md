# Getting Started with OKX Wallet SDK Demo

## Learn More

For more details of SDK Usage, please refer to [OKX JS Wallet SDK](https://github.com/okx/js-wallet-sdk).

For more details of OKX Build, please refer to [OKX Build](https://www.okx.com/web3/build/docs/home/welcome).

### Polyfill

For applications that are bootstrapped by create-react-app like this demo page, please consider to install react-app-rewired and reference config-overrides.js at the root folder to polyfill necessary node core modules required for the OKX Wallet SDK.
For applications that are using Webpack 5 as bundler, please consider to update webpack.config.js resolve.fallback to polyfill necessary node core modules required for the OKS Wallet SDK.
For applications that are using Vite as bundler, please consider to update vite.config.js build.rollupOptions.external to polyfill necessary node core modules required for the OKS Wallet SDK.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
