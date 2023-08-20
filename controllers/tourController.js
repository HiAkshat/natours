const Tour = require("./../models/tourModel")

exports.getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find()

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "couldnt get tours collection"
    })
  }
};

exports.addTour = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body)
    
    res.status(201).json({
      status: "success",
      message: "New tour created!",
      data: {
        tour: newTour
      }
    })

  } catch (err) {
    console.log(err)

    res.status(400).json({
      status: "failed",
      message: "Invalid tour data!"
    })
  }
};

exports.getTour = async (req, res) => {
  try{
    // This is equivalent to
    // Tour.findOne({_id: req.params.id})
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "couldnt find the tour"
    })
  }
};

exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message
    })
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      data: null
    })

  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message
    })
  }
};