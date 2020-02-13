const express = require('express');

function routes(Activity) {
  const activityRouter = express.Router();

  activityRouter.use('/api/', (req, res, next) => {
    // middleware
    next();
  });

  activityRouter.route('/api/activity')
    .get((req, res) => {
      Activity.find(req.query, (err, activities) => {
        if (err) {
          return res.send(err);
        }
        return res.json(activities);
      });
    })
    .post((req, res) => {
      const activity = new Activity(req.body);
      activity.save();
      return res.status(201).json(activity);
    });

  activityRouter.route('/api/activity/:activityId')
    .get((req, res) => {
      Activity.findById(req.params.activityId, (err, activity) => {
        if (err) {
          return res.send(err);
        }
        return res.json(activity);
      });
    });

  return activityRouter;
}

module.exports = routes;
