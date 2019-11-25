var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const router = require('express').Router();
const util = require('util');
const passportConf = require('../passport');
const passport = require('passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
var ObjectId = require('mongodb').ObjectID;
const models = require('../models/models');
const nodemailer = require('nodemailer');
// const passport = require('../config/passport');
const users = require('../routes/users');
const JSON = require('circular-json');
// var itemController = require('./itemController');
Profile= models.profile;
Food = models.food;
Item = models.item;
Executive = models.executive;


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: { 
        user: 'projectlenity365@gmail.com',
        pass: 'lenity1234'
    }
  });


router.get('/', (req, res, next) => {
    res.json("Item donate form here");

});

router.post('/', passportJWT, urlencodedParser, async (req, res, next) => {
    try{
    console.log('entered item page');
    console.log(req.body);
    console.log('-------------');
    await req.user;
    // console.log(req.user);
    name1 = req.body.name;
    category1 = req.body.category;
    quantity1 = req.body.quantity;
    location1 = req.body.location;
    description1 = req.body.description;
    age1 = req.body.age;
    delivery_location1 = req.body.delivery_location;

    var item1 = new Item({
        donatedBy: name1,
        category: category1,
        location: location1,
        description: description1,
        quantity: quantity1,
        age : age1,
        delivery_location: delivery_location1,
        status: 0
    });

    await item1.save().then(async function(){
        await Profile.findOne({'local.username': req.user.local.username}).then(async function(record){
            await record.item.push(item1);
            await record.save();
        });
    });

    var pro1 = await Profile.findById(req.user.id);
    console.log(pro1);
    res.json({ profile1: pro1});
}

catch(error){
    next(error);
  }
    
});

router.get('/item-donate/:name',passportJWT, async (req, res, next) => {
    try{
    console.log('entered item donate page');
    await req.params.name;
    console.log(req.params.name);
    Item1 = Item.find({}).sort({$natural:-1})
    
    var item1=await Item1.findOne({'donatedBy': req.params.name}, async function(err, data){
        if (err) throw err;
        await Executive.findOne({'address': data.location.toLowerCase()}).then(async function(record){
          if(record){
            record.item.addToSet(data);
            record.save();
          }
          else{
            record =  await Executive.findOne({"address": "jaipur"});
            record.item.addToSet(data);
            record.save();
          }
//-----   
  
const html = `Hi, Executive ${record.name},
You have been assigned to pick up the ${data.category} donated by:
     ${data.donatedBy} at ${data.location} 
     description: ${data.description}
     quantity : ${data.quantity}
     delivery location: ${data.delivery_location}
Please reach there asap and confirm after successful delivery.
Have a pleasant day!`;

    const mailOptions = {
      from: 'projectlenity365@gmail.com',
      to: record.email,
      subject: 'Delivery notification',
      text: html
    };

    await transporter.sendMail(mailOptions, function(error, info){
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent' + info.response);
      }
      
    });
    //--------
            console.log(record);
        console.log(data.location);
        await req.user;
        res.json({ donation:data, username:req.user.local.username, executive1: record });
    });

});
    }
    catch(error){
        next(error);
      }
    


    



});

module.exports = router;
