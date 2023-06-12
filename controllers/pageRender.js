const catchAsync = require("../utils/catchAsync");
const destinationModel = require('./../model/destinationCreator');

exports.login = catchAsync(async (req, res, next) => {
    res.status(200).render('login.pug')
})

exports.signup = catchAsync(async (req, res, next) => {
    res.status(200).render('signup.pug')
})

exports.bookDestination = catchAsync(async (req, res, next) => {
    const user = res.locals.user;
    const destination = await destinationModel.findOne({
        slug: req.params.slug
    });

    res.status(200).render('tourBooking.pug', {
        destination,
        user
    })
})

exports.getDestination = async (req, res, next) => {
    const destination = await destinationModel.findOne({
        slug: req.params.slug
    });
    console.log(destination)
    res.status(200).render('destination.pug', {
        destination
    })
}

exports.home = async (req, res, next) => {

    const destinations = await destinationModel.find();
    res.status(200).render('home.pug', {
        destinations
    })
}