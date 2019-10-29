// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');

// const User = require('../models/user');

// //Validation Schema
// const userSchema = Joi.object().keys({
//   email: Joi.string().email().required(),
//   username: Joi.string().required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
//   confirmationPassword: Joi.any().valid(Joi.ref('password')).required()

// });

// router.route('/register')
//   .get((req, res) => {
//     res.render('register');
//   })
//   .post(async (req,res,next) => {
//     try{
//     //console.log('req.body',req.body);
//       const result = Joi.validate(req.body, userSchema);
//       console.log('result',result);
      
//       if(result.error){
//         req.flash('error','Data is not valid. please try again');
//         res.redirect('/users/register');
//         return;
//       }
      
//       // if email is already taken
//       const user = await User.findOne({ 'email': result.value.email });
//       if(user){
//         req.flash('error', 'Email is already in use.');
//         res.redirect('/users/register');
//         return;
//       }

//       //Password hashing
//       const hash = await User.hashPassword(result.value.password);
//       // console.log('hash',hash);

//       //Save user to db
//       delete result.value.confirmationPassword;
//       result.value.password = hash;
//       // console.log('new values', result.value);
      
//       const newuser = await new User(result.value)
//       await newuser.save();

//     }catch(error){
//     next(error);
//     }

//   });

// router.route('/login')
//   .get((req, res) => {
//     res.render('login');
//   });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passport = require('passport');
const randomstring = require('randomstring');
const mailer = require('../misc/mailer');
const User = require('../models/user');




// Validation Schema
const userSchema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  contactno :Joi.number().min(1000000000).max(9999999999).required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

const passwordCheck = Joi.object().keys({
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

// Authorization 
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Sorry, but you must be registered first!');
    res.redirect('/');
  }
};

const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Sorry, but you are already logged in!');
    res.redirect('/');
  } else {
    return next();
  }
};

const isloggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.redirect('/users/login');
  }
};

router.route('/register')
  .get(isNotAuthenticated, (req, res) => {
    res.render('register');
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema);
      console.log(req.body);
      if (result.error) {
        req.flash('error', 'Data is not valid. Please try again.');
        res.redirect('/users/register');
        return;
      }

  

      // Checking if email is already taken
      const user = await User.findOne({ 'email': result.value.email });
      console.log(user);
      if (user) {
        req.flash('error', 'Email is already in use.');
        res.redirect('/users/register');
        return;
      }

      const usrname = await User.findOne({ 'username': result.value.username });
      if (usrname) {
        req.flash('error', 'Username is already in use.');
        res.redirect('/users/register');
        return;
      }

      // Hash the password
      const hash = await User.hashPassword(result.value.password);

      //generate secretToken
      const secretToken = randomstring.generate();

      result.value.secretToken = secretToken;

      //flag the account as inactive
      result.value.active = false;


      // Save user to DB
      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await new User(result.value); 
      console.log('newUser', newUser);
      await newUser.save();

      //Compose an email
      const html = `Hi, there,
      <br/>
      Thank you for registering!
      <br/><br/>
      please verify your email by typing the folloeing token:
      <br/>
      Token: <b>${secretToken}</b>
      <br/>
      On the following page:
      <a href="http://localhost:5000/users/verify">http://localhost:5000/users/verify</a>
      Have a pleasant day!`;

      //Send the Email
      const abc = await mailer.sendEmail('sahilchoudhary74306@gmail.com', result.value.email, 'Please Verify your Email', html);
      console.log('abc',abc);
      req.flash('success', 'Please check your email.');
      res.redirect('/users/login');
    } catch(error) {
      next(error);
    }
  });


router.route('/editProfile')
  .get(isloggedIn, (req,res) =>{
    data = req.user;
    id = data.id;
    firstname = req.user.firstname
    res.render('editProfile', {firstname: firstname, contactno: req.user.contactno, lastname: req.user.lastname, address: req.user.address , id: id} );
  })
  .post(async (req,res,next) => {
    try{
    //console.log(req.query);
      
    const id = req.query.id;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const contactno = req.body.contactno;
      const address = req.body.address;

      if (!firstname || !lastname || !contactno || !address) { 
            req.flash('error', 'One or more fields are empty');
            return res.redirect('editProfile');
        }

      var contact = String(contactno);
      if(contact.length != 10){
        req.flash('error', 'Enter valid mobile number');
        
        return res.redirect('editProfile');
      }

      //id = req.user.id;

      console.log(req.query.id);
      
      //console.log(user);
      User.findByIdAndUpdate(req.query.id,{
        $set:{firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        contactno: req.body.contactno
        }
      },function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });

    return res.render('dashboard');
    }catch(error){
      next(error);
    }

  })


router.route('/forgetPassword')
  .get((req,res) => {
    res.render('password');
  })
  .post(async (req,res,next) => {
    try{
        const user = await User.findOne({ 'email': req.body.email });
        console.log(user);
        if (!user) {
          req.flash('error', 'Email does not exist.');
          res.redirect('/users/forgetPassword');
          return;
        }
        const html = `Hi, there,
        <br/>
       
        <br/>
        On the following page:
        <a href="http://localhost:5000/users/checkPassword">http://localhost:5000/users/checkPassword</a>
        Have a pleasant day!`;

      //Send the Email
      const abc = await mailer.sendEmail('sahilchoudhary74306@gmail.com', req.body.email, 'Please Verify your Email', html);
      console.log('abc',abc);
      req.flash('success', 'Please check your email.');
      res.redirect('/users/dashboard');
    }catch(error){
      next(error);
    }

  })


router.route('/checkPassword')
  .get(isloggedIn,(req,res) => {
    console.log(req.user.username);
    res.render('checkPassword', {username: req.user.username});
  })
  .post(async (req,res,next) => {
    try{
     
      username = req.query.username;
      console.log(username);
      const result = Joi.validate(req.body, passwordCheck);
      console.log(req.body);
      if (result.error) {
        req.flash('error', 'Data is not valid. Please try again.');
        res.redirect('/users/checkPassword');
        return;
      }

      
      const hash = await User.hashPassword(req.body.password);

     
        
      delete result.value.confirmationPassword;
      result.value.password = hash;

      //console.log(secretToken);

      const usr = User.findOneAndUpdate({ 'username':username},{
        $set:{password: hash}
      },function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
        
      console.log(usr);

      req.flash('success','Now you may login!!!');
      res.redirect('logout');
      

      
      
    }catch(error){
      next(error);
    }
  })
  
router.route('/login')
  .get(isNotAuthenticated, (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

router.route('/dashboard')
  .get(isAuthenticated, (req, res) => {
    res.render('dashboard', {
      username: req.user.username
    });
  });


router.route('/verify')
  .get(isNotAuthenticated, (req,res) =>{
    res.render('verify');
  })
  .post(async (req,res,next) => {
    try{

    
      const { secretToken } = req.body;

      //Account that matches the secretToken
      const user = await User.findOne({ 'secretToken': secretToken });
      if(!user){
        req.flash('error','No user found.');
        res.redirect('/users/verify');
        return;
      }
      user.active = true;
      user.secretToken = ''
      await user.save();

      req.flash('success', 'Thank you! Now you may log in.');
      res.redirect('/users/login');
    }catch(error){
      next(error);
    }

  });


router.route('/logout')
  .get(isAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out. Hope to see you soon!');
    res.redirect('/');
  });


  
module.exports = router;