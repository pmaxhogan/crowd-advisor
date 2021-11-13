module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: "AIzaSyD1RZFCHTu6HCEZV34HJZxIyY4Igi7LbVw",
                    authDomain: "financial-analyzer.firebaseapp.com",
                    // databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
                    projectId: "financial-analyzer",
                    storageBucket: "financial-analyzer.appspot.com",
                    messagingSenderId: "1020474248539",
                    appId: "1:1020474248539:web:8e369bb2b2a50b53f0de7e"
                }
            }
        }
    ]
}
