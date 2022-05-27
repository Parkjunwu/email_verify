module.exports = {
  client:{
    service:{
      includes:["./src/**/*.{ts,tsx}"],
      tagName:"gql",
      name:"instaclone-backend",
      url:process.env.NODE_ENV==="production" ? process.env.REACT_APP_URI : "http://localhost:4000/graphql",
    }
  }
}