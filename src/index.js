const app = require('./app');
const { sequelize } = require('./database/db');
require('./models/Characters');
require('./models/Movies');
require('./models/Genre');
require('./models/Users');



const main = async () => {
    try {
    await sequelize.sync({ force : false });

    app.listen(3000,() => {console.log('Escuchando en el 3000')});
    } catch (e) {
        console.error(e);
    }
}

main();
