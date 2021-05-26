module.exports = function override(config) {
  const forkTsPlugin = config.plugins.find((plugin) => {
    return plugin.constructor.name === 'ForkTsCheckerWebpackPlugin';
  });

  if (forkTsPlugin) {
    forkTsPlugin.async = true;
    forkTsPlugin.checkSyntacticErrors = false;
  }

  return config;
};
