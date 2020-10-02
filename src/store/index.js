import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence();

Vue.use(Vuex);
/**
 * Dynamically import store elements.
 */
const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key !== "./index.js") {
    modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
  }
});

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
});
