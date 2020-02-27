const express = require('express');

function routes(Activity) {
  const activityRouter = express.Router();


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
      activity.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(activity);
      });
    });

  activityRouter.use('/api/activity/:activityId', (req, res, next) => {
    Activity.findById(req.params.activityId, (err, activity) => {
      if (err) {
        return res.send(err);
      }
      if (activity) {
        req.activity = activity;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  activityRouter.route('/api/activity/:activityId')
    .get((req, res) => res.json(req.activity))
    .delete((req, res) => {
      req.activity.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    .put((req, res) => {
      req.activity.title = req.body.title;
      req.activity.created_by = req.body.created_by;
      req.activity.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.activity);
      });
    })
    .patch((req, res) => {
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        req.activity[key] = value;
      });
      req.activity.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.activity);
      });
    });

  return activityRouter;
}

module.exports = routes;
