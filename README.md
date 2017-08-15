# Minimal Starter with Angular on both Server and Browser Platforms

## Get Started
```sh
npm run start
```
## Developement mode
* Terminal 1: ```npm run watch```
* Wait for the build to finish
* Terminal 2: ```npm run server```

## Prod mode
Includes AoT
```sh
npm run build:prod
npm run server
```

Based on https://github.com/FrozenPandaz/ng-universal-demo.

## Differences
This example includes a simple configuration file (src/config/app.config.ts), 
a simple service that retrieves data from an external web service, and support
for LESS style files.

## Known Issues
* AOT compilation is failing because of ExtractTextPlugin in webpack.common.js