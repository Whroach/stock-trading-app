const bcrypt = require('bcryptjs')


module.exports = {

    register: async(req,res) =>{
        const { username, password, account_type, first_name, last_name, age} = req.body,
            db = req.app.get('db')

        let userExists = await db.auth.check_user(username)

        if(userExists[0]){
            return res.status(406).send('Sorry, username is unavailable')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

       await db.auth.register_account({username, password: hash, account_type, first_name, last_name, age})

        req.session.user = {username, first_name, last_name }


        res.status(201).send(req.session.user)

    },

    login: async(req, res) => {
        const { username, password } = req.body,
            db = req.app.get('db')

        const foundUser = await db.auth.check_user(username)
        let user = foundUser[0]
 
        if (!user) {
          return res.status(401).send('Username cannot be found, please try again or register a new account');
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password);
        if (!isAuthenticated) {
          return res.status(403).send('Incorrect password');
        }
        req.session.user = {username: user.username };

        console.log(req.session.user)
        return res.send(req.session.user);
      },






};