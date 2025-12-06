const express = require('express');
const router = express.Router();
const auth = require('../auth.js');
const workoutController = require('../controllers/workoutController');

router.post('/addWorkout', auth, workoutController.addWorkout);

router.get('/getMyWorkouts', auth, workoutController.getMyWorkouts);

router.put('/updateWorkout', auth, workoutController.updateWorkout);

router.delete('/deleteWorkout', auth, workoutController.deleteWorkout);

router.patch('/completeWorkoutStatus', auth, workoutController.completeWorkoutStatus);

module.exports = router;