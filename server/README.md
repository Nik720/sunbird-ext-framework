### 1. Setup 
  1. Download & install `Apache Cassandra` v3.7 or higher
  2. Download & install `Elasticsearch` v6.1
  3. Download & install `Node.Js` v6.4 or higher
  4. install nodemon globally: `npm i nodemon -g`
  5. install Gulp cli globally: `npm install gulp-cli -g` (Optional)
  
### 2. To see in Action

To run the demo app with default plugins. Follow the instructions.

1. Clone the repo.
2. Start the `Cassandra` and `Elasticsearch` server.
3. cd `ext-framework/server` and run `npm install`.
4. create `dist` for server framework. `cd server` and run `npm run build`,
5. go to `demo`>`app` folder (Node.Js app) and run `npm install`.
6. link `ext-framework` library to the demo app. go to `demo`>`app` and run `npm link ../../server/dist`

// Plugins

7. go to plugins folder `demo/plugins/<plugin-name>/server` and run `npm install`
8. link `ext-framework` library to the plugin, run `npm link ../../server/dist`
9. create `dist` of the plugin by running `npm run build`

// link each plugin to demo app

(NOTE: `demo/app/index.ts` has Framework configuration to decide which plugin to load from the app. Change this file accordingly to load the plugins)

10.   `cd demo/app` and run `npm link ../plugins/<plugin-name>/server/dist`
11.   And run `npm run start`. Demo application starts by loading the demo plugin (profile-server).

### 3. Debugging:
Demo app runs in `debug` mode enabled. Latest `node.js` supports `--inspect` flag to run the app in debug mode. To debug the app, start the demo app and open the `chrome` developer console and search for `node.js` icon next to `Elements` tab and click on it. It opens devTool for node.js in a new window.


### 4. Testing:
cd `server` and run `npm run test`. It generates `HTML` reporter inside folder `server/mochawesome-report` using `mochawesome` reporter. 


### 5. `npm link` vs `npm install` for local modules:
 To save development time, we have to link the local dependencies such as plugins and framework libraries rather than installing it as a dependency by declaring it in the `package.json`. If we declare local dependencies in `package.json`, it will install only once and when we make any changes to local modules, we need to re-install the dependencies again by `npm install`.

 `npm link` creates symbolic link to actual module. Any changes to source module is immediately reflected and saves our time.

 However, this is not the case when publishing the library. Each plugin should have `peerDependencies` section where it should declare `ext-framework` as its dependency with its version no.  

### 6. Text editor:
This project was built using [Visual Source Code](https://code.visualstudio.com/). Contributors are recommended to use this editor and install the "recommended" extensions from the `VScode Extensions`.