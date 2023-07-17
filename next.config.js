const { withExpo } = require("@expo/next-adapter");
const withTM = require("next-transpile-modules")(["react-native-web"]);
const withImages = require("next-images");
const withFonts = require("next-fonts");

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    disableStaticImages: true,
  },
};

module.exports = () => {
  const plugins = [withImages, withFonts, withTM, withExpo];
  return plugins.reduce((config, plugin) => plugin(config), nextConfig);
};
