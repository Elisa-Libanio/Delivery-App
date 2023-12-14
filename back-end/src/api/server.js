const app = require('./app'); // import app from app.js

const PORT = process.env.API_PORT || 3001; // import PORT from .env file

app.listen(PORT, () => console.log(`Rodando na  ${PORT}`)); // listen on PORT or 3000