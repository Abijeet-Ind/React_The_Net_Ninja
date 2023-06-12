const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    destinationName: {
        type: String,
        unique: true,
        required: [true, 'A DESTINATION MUST HAVE ITS NAME'],
    },
    destinationImages: {
        type: [String],
        required: [true, 'A DESTINATION MUST HAVE IMAGES']
    },
    destinationMainImage: {
        type: String,
        // unique: true,
        required: [true, 'A DESTINATION MUST HAVE MAIN IMAGE']
    },
    destinationFooterImage: {
        type: String,
        // unique: true,
        required: [true, 'A DESTINATION MUST HAVE FOOTER IMAGE']
    },
    price: {
        type: Number,
        required: [true, 'A DESTINATION MUST HAVE ITS PRICE']
    },
    // location:{
    //     type:[String],
    //     required: [true, 'ENTER LOCATION CO-ORDINATES']
    // },
    duration: {
        type: Number,
        // unique: true,
        required: [true, 'ENTER LOCATION CO-ORDINATES']
    },
    maxIndividuals: {
        type: Number,
        required: [true, 'ENTER MAX TRAVELLERS AT ONCE']
    },
    registeredIndividuals: {
        type: Number,
        required: [true, 'ENTER MAX TRAVELLERS AT ONCE']
    },
    goingDate: {
        type: [String]
    },
    sub_destinations: {
        type: [String]
    },
    slug: {
        type: String
    },

})


destinationSchema.pre('save', function (next) {
    this.destinationName = this.destinationName.toLowerCase();
    this.slug = this.destinationName.toLowerCase();
    next();
})

const destinationModel = mongoose.model('destinationModel', destinationSchema);
module.exports = destinationModel;