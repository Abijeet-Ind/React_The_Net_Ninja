const {
    promisify
} = require('util');
const userModel = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const {
    decode
} = require('punycode');

createSendToken = (res, user, status) => {
    const token = jwtSignin(user.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRESIN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    // console.log(res.cookie('jwt', token, cookieOptions))
    res.status(200).json({
        status: 'success',
        token,
        user
    })
}

const jwtSignin = (id) => {
    // {id} =  { id: '63d4e361f7b741db6d1cfbad' }
    // id = 63d4e361f7b741db6d1cfbad
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await userModel.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });


    createSendToken(res, newUser, 200);
})

exports.login = catchAsync(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    console.log(req.body);
    // checking if the body contains email or password
    if (!email || !password) {
        return console.log('password or email is empty');
    }

    const user = await userModel.findOne({
        email
    }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
        // console.log('YOU AREN\'T LOGIN PLEASE LOGIN');
        res.status(200).json({
            status: 'failed',
            message: 'YOU AREN\'T LOGIN PLEASE LOGIN'
        })
    } else {
        createSendToken(res, user, 200)
    }
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let findUser = await userModel.findById(decoded.id);

    if (!findUser) {
        console.log('CANNOT FIND USER PLEASE LOGIN');
    }

    // for password recently change is remaining

    req.user = findUser;
    next();
});

// FOR RENDER PAGE
exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        let token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        const findUser = await userModel.findById(decoded.id);
        if (!findUser) {
            console.log('PLEASE SIGNUP')
        }
        // password recently change is required

        res.locals.user = findUser;
        return next();
    }
    next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const user = req.user;

    // console.log(user)

    const userFind = await userModel.findById(user.id).select('+password');

    if (!(userFind.checkPassword(req.body.password, userFind.password))) {
        console.log('PASSWORD DOES NOT MATCH');
    }

    userFind.password = req.body.newPassword;
    userFind.passwordConfirm = req.body.confirmNewPassword;
    userFind.save();

    createSendToken(res, userFind, 200);
})