# To-do

- Make custom hook for `handleDeletePost`.
- `cursor:"pointer"` where ever necessary.
- Add Actions to the comments.
- Remove `showToast` from `useEffect dependencies` if not necessary
- Add delete comment functionality.
- Implement `Debouncing`

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
