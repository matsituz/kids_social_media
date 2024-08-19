const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc: "src/shared/helpers/serviceWorker/sw.js",
      swSrc: "./src/service-worker.js",
      // swDest: 'service-worker.js',
    },
  },
  //...
});

// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const path = require("path");
// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new MonacoWebpackPlugin({
//         languages: ["python", "javascript", "html", "css"],//configure your languages here
//         features: ["coreCommands", "find"],
//       }), // Place it here
//     ],
//   },
//   chainWebpack: (config) => {
//     config.resolve.alias.set(
//       "vscode",
//       path.resolve(
//         "./node_modules/monaco-languageclient/lib/vscode-compatibility"
//       )
//     );
//   },
//   pwa: {
//     workboxPluginMode: 'InjectManifest',
//     workboxOptions: {
//       swSrc: 'src/shared/helpers/serviceWorker/sw.js',
//       swDest: 'service-worker.js',
//     },
//   },
// };
