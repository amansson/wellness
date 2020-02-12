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
    });

  return activityRouter;
}

module.exports = routes;
