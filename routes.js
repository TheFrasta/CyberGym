module.exports = (app) =>{

    require('./routes/index')(app);
    require('./routes/register')(app);
    require('./routes/login')(app);
    require('./routes/usuarios')(app);
}