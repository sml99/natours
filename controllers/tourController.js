const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = async (req, res, next) => {
    req.query = { ...req.query, limit: 5, sort: 'ratingsAverage,price', fields: 'name,price,ratings,summary,difficulty' };
    next();
};

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
        const tours = await features.query;
        //RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Error: Invalid data sent!`,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Error: Invalid data sent!`,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: {},
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Error: Invalid data sent!`,
        });
    }
};
