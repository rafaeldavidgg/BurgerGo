const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
require('./utils/cron');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
})
.catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});
