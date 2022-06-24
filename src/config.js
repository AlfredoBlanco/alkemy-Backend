
module.exports = {
    SECRET : process.env.SECRET || 'littleSecret',
    DB_USER : process.env.DB_USER || 'postgres',
    DB_PASSWORD : process.env.DB_PASSWORD || 'Alfredo',
    DB_HOST : process.env.DB_HOST || 'localhost:5432',
    SENDGRID_API_KEY : process.env.SENDGRID_API_KEY || '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',
    SENDER : process.env.SENDER || 'alfre.blanco@icloud.com'
}
