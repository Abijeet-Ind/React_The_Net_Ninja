const bookingModel = require('./../model/bookDestination');
const destinationModel = require('./../model/destinationCreator');

dateConverter = (startDate, tourDate, month, day) => {
    day = 0;
    let datete;
    let dateSplit = startDate.split(' ')[1] * 1 + tourDate;
    console.log('date', dateSplit);
    if (dateSplit > 30) {
        let extractingMonth = dateSplit % 30;
        month += 1;
        day = extractingMonth;
        let datesConbine = `${month} ${day}`;
        return datesConbine;
    } else {
        return dateSplit;
    }
    // console.log(dateSplit)
}

exports.createDestination = async (req, res, next) => {
    let tourStartDate = req.body.selectedDate;
    let month = new Date().getMonth();
    let day = new Date().getDate();

    const user = res.locals.user;
    const destination = await destinationModel.findOne({
        slug: req.body.slug
    });

    // finding the ending date of the tour
    let functionDates = dateConverter(tourStartDate, destination.duration, month, day);

    if (destination.registeredIndividuals >= destination.maxIndividuals) {
        return console.log('max individual');
    }

    const registration = await bookingModel.create({
        destinationId: destination.id,
        userObjectId: user.id,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        date: req.body.selectedDate,
        endingDate: functionDates
    });

    destination.registeredIndividuals += 1;
    destination.save();

    res.status(200).json({
        status: 'success',
        message: 'created',
        registration
    })
}