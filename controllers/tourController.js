const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.postTourMiddleware = (req, res, next) => {
  console.log(req.body)
  next()
}

exports.addTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: tourId }, req.body);

  tours.push(newTour);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);

  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "invalid tour id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "invalid tour id",
    });
  }

  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: "<Updated tour here>",
  });
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);

  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: "invalid tour id",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};