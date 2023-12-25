export default () => ({
    port: process.env.PORT || 3001,
    databaseURI: process.env.DATABASE_URI,
    appBaseURL: process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3001}`,
    jwtSecret: process.env.JWT_SECRET
})
