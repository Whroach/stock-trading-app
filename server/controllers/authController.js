const bcrypt = require('bcryptjs');


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

        const newUser = await db.auth.register_account({username, password: hash, account_type, first_name, last_name, age });
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);

        // console.log(req.session)

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


        delete foundUser[0].password;
        req.session.user = foundUser[0];

        res.status(202).send(req.session.user);
      },

      getSession: (req,res) =>{
        
        if(req.session.user){ 
          res.status(200).send(req.session.user)
        }

        else{
          res.sendStatus(200)

        }


      },






};