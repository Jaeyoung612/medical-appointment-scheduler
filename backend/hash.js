const bcrypt = require('bcrypt');
bcrypt.hash('test1234', 10, (err, hash) => {
    console.log(hash);
});