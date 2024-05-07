const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path')
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const projectRoot =  path.resolve(__dirname);

const config = {
  projectRoot,
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../../'),
      path.resolve(__dirname, '../../node_modules'),
    ]
  },
  watchFolders: [
    path.resolve(__dirname, '../../'),
    path.resolve(__dirname, '../../node_modules'),
  ]    
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
