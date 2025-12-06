const express = require('express');
const router = express.Router();
const auth = require('../auth.js');
const workoutController = require('../controllers/workoutController');

router.post('/addWorkout', auth, workoutController.addWorkout);

router.get('/getMyWorkouts', auth, workoutController.getMyWorkouts);

router.put('/updateWorkout:id', auth, workoutController.updateWorkout);

router.delete('/deleteWorkout:id', auth, workoutController.deleteWorkout);

router.patch('/completeWorkoutStatus/:id', auth, workoutController.completeWorkoutStatus);

module.exports = router;