
module.exports = {
    SECRET : process.env.SECRET || 'littleSecret',
    DB_USER : process.env.DB_USER || 'postgres',
    DB_PASSWORD : process.env.DB_PASSWORD || 'Alfredo',
    DB_HOST : process.env.DB_HOST || 'localhost:5432',
    SENDGRID_API_KEY : process.env.SENDGRID_API_KEY || 'Your Sendgrip Api Key',
    SENDER : process.env.SENDER || 'Your sender address'
}
