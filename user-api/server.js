const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

const userService = require("./user-service.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

/* TODO Add Your Routes Here */

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

jwtOptions.secretOrKey = process.env.JWT_SECRET;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    if (jwt_payload) {
        next(null, { _id: jwt_payload._id,
            userName: jwt_payload.userName });
    } else {
        next(null, false);
    }
});

passport.use(strategy);

//POST /api/user/register
// app.post("/api/user/register", (req,res)=>{
//     userService.registerUser(req.body).then(()=>{
//         res.json({message: "User successfully registered"});
//     }).catch(err=>{
//         res.status(422).json({message: err});
//     });
// });

//POST /api/user/login
app.post("/api/user/login", (req,res)=>{
    userService.checkUser(req.body).then(user=>{

        let token = jwt.sign({
            _id: user._id,
            userName: user.userName
        }, jwtOptions.secretOrKey);

        res.json({message: "login successful", token: token});

    }).catch(err=>{
        res.status(422).json({message: err});
    });
});

//GET /api/user/favourites
app.get("/api/user/favourites", passport.authenticate('jwt', { session: false }), (req,res)=>{
    userService.getFavourites(req.user._id).then((data)=>{
        res.json(data);
    }).catch(err=>{
        res.status(422).json({message: err});
    });
});

//PUT /api/user/favourites/:id
app.put("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req,res)=>{
    userService.addFavourite(req.user._id, req.params.id).then((data)=>{
        res.json(data);
    }).catch(err=>{
        res.status(422).json({message: err});
    });
});

//DELETE /api/user/favourites/:id
app.delete("/api/user/favourites/:id", passport.authenticate('jwt', { session: false }), (req,res)=>{
    userService.removeFavourite(req.user._id, req.params.id).then((data)=>{
        res.json(data);
    }).catch(err=>{
        res.status(422).json({message: err});
    });
});

userService.connect()
.then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
.catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
});
