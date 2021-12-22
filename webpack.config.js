const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const path = require("path");

// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    main: "./src/index",
  },
  // mode: "development",
  mode: "production",
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "dist"),
    // },
    port: 3002,
  },
  // cache: false,
  // devtool: "source-map",

  optimization: {
    // minimize: false,
    minimize: true,

  },

  output: {
    // publicPath: "http://localhost:3002/",
    filename: "index.js",
    path: path.resolve("dist"),
    clean:true
    // filename: "index.js",
    // path: path.resolve("dist"),
    // publicPath: "https://main--stupefied-kare-218880.netlify.app/",
  },

  resolve: {
    alias: {
      src: path.resolve("src"),
    },
    extensions: [".jsx", ".js", ".json"],
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },

  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   loader: require.resolve("babel-loader"),
      //   exclude: /node_modules/,
      //   options: {
      //     rootMode: "upward",
      //     presets: [require.resolve("@babel/preset-react")],
      //   },
      // },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "app2",
      library: {
        type: "var",
        name: "app2",
      },
      filename: "remoteEntry.js",
      exposes: {
        "./Title": "./src/Title",
      },
      // shared: ["react", "react-dom"],
      shared:{
        react:{
          eager:true,
          singleton:true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"],
    }),
  ],
};