# To get rid of cors error

- We can add
  `server: {
  // to get rid of cors error
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
    },
  },
},`
  in `vite.config.js` file
