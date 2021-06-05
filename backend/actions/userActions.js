const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/User')
const {login} = require('../actions/dashboardActions')

class UserActions{
    async saveUser(req,res){
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // walidacja

        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please enter all fields' });
        }

        if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (password.length < 5) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }

        if (name.length > 15) {
            errors.push({ msg: 'Name must be at least 15 characters' });
        }

        if (errors.length > 0) {
            res.render('register', {
            errors,
            name,
            email,
            password,
            password2
            });
        } else {
            //znaleziennie usera poprzez name
            User.findOne({ name: name }).then(user => {
            //warunek ktory sprawdza czy name jest juz
            if (user) {
                errors.push({ msg: 'Name already exists' });
                res.render('register', {
                errors,
                name,
                email,
                password,
                password2
                });
            } else {
                //tworzenie usera
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //zakrywanie hasła usera
                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                        );
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
                });
            }
            });
        }
    }

    //sprawdzanie wprowadzonych danych
    checkUser(req,res,next){
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlashY: true
        })(req,res,next)
    }

    //wylogowywanie
    logout(req,res){
        req.logout()
        global.login = false
        req.flash('success_msg', 'You are logged out')
        res.redirect('/users/login')
    }

    //pobieranie top 100 użytkowników
    async getTop100User(req,res){
        const topUsers15  = []
        const topUsers60  = []
        await User.find({ }, (err,docs) =>{
          docs.forEach((item,index) =>{
            //dodawanie najleszych 100 użytkowników do tablic
            topUsers15.push({
                name: item.name,
                bestWPM15: item.bestWPM15,
                _id: item._id,
                accuracy15: item.accuracy15
            })
            topUsers15.sort((a,b) => b.bestWPM15-a.bestWPM15)
            topUsers60.push({
                name: item.name,
                bestWPM60: item.bestWPM60,
                _id: item._id,
                accuracy60: item.accuracy60})
            topUsers60.sort((a,b) => b.bestWPM60-a.bestWPM60)

            //ustawiona maksymalna liczba użytkowników
            if(topUsers15.length > 100){
            //   topUsers15.pop()
                return console.log('array cannot be longer')
            }

            if(topUsers60.length > 100){
            //   topUsers60.pop()
                return console.log('array cannot be longer')
            }
          })

        })

        res.json({
          topUsers15,
          topUsers60
        })
    }
}

module.exports = new UserActions();