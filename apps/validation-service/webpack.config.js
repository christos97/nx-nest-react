const { composePlugins, withNx } = require('@nrwl/webpack');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const basePackage = {
  name: 'validation-service',
  version: '0.0.1',
  main: 'main.js',
};

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins.push(new GeneratePackageJsonPlugin(basePackage));
  return config;
});
