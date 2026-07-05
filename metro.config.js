const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const defaultSourceExts = config.resolver.sourceExts;
const defaultAssetExts = config.resolver.assetExts;

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = defaultAssetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...defaultSourceExts, 'svg'];

module.exports = config;
