module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@c": `${__dirname}/src/components`,
        "@v": `${__dirname}/src/views`,
        "@/": `${__dirname}/src/`
      }
    }
  }
};
