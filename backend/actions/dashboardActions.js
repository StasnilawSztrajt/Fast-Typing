const User = require('../models/User')
const express = require('express')
const app = express()

global.login = false
let _id = ''



class DashboardActions {
    getInfoUser(req,res){
        try{
            _id = req.user._id
                res.render('dashboard', {
                    name: req.user.name,
                    email: req.user.email,
                    date: req.user.date,
                    bestWPM15: req.user.bestWPM15,
                    bestWPM60: req.user.bestWPM60,
                    accuracy15: req.user.accuracy15,
                    accuracy60: req.user.accuracy60,
                    _id
                })
                global.login = true
        } catch(err){
            console.log(err)
            global.login = false
            _id = ''
        }
    }

    async getInfoUserJson(req,res,next){
        if(!global.login) _id = ''
        console.log(global.login, login, _id)
        try{
            const user = await User.findOne({ _id: _id })
            res.json({
                user
            })
        } catch(err){
            res.json({
                _id: ''
            })
        }

    }

    async getInfoUserJsonById(req,res){
        try{
            const id = req.params.id;
            const user = await User.findOne({ _id: id })

            res.json(user)
        } catch(err){
            console.log('Cannot find id ', err)
        }
    }

    async putInfoUserJsonById(req,res){
        try{
            const id = req.params.id;
            const bestWPM15 = req.body.bestWPM15;
            const bestWPM60 = req.body.bestWPM60;
            const accuracy15 = req.body.accuracy15;
            const accuracy60 = req.body.accuracy60;


            const user = await User.findOne({ _id: id })
            user.bestWPM15 = bestWPM15;
            user.bestWPM60 = bestWPM60;
            user.accuracy15 = accuracy15;
            user.accuracy60 = accuracy60;

            await user.save()

            res.status(201).json(user)
        } catch(err){
            console.log(err)
        }
    }
}



module.exports = {
    DashboardActions: new DashboardActions(),
    login,
    _id
}