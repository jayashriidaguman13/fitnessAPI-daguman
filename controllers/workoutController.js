const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ message: 'Name and duration are required' });
    }

    const workout = new Workout({
      userId: req.user.id,
      name,
      duration,
      status: "pending"
    });

    await workout.save();

    res.status(201).json({
        userId: workout.userId,
        name: workout.name,
        duration: workout.duration,
        status: workout.status,
        _id: workout._id,
        dateAdded: workout.dateAdded,
        __v: workout.__v
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyWorkouts = async (req, res) => {
  try {
    const userId = req.user.id; 

    const workouts = await Workout.find({ userId });

    res.status(200).json({
      workouts: workouts.map(workout => ({
        _id: workout._id,
        userId: workout.userId,
        name: workout.name,
        duration: workout.duration,
        status: workout.status,
        dateAdded: workout.dateAdded,
        __v: workout.__v
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, status } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { name, duration, status },
      { new: true }
    );

    if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });

    res.json({ message: 'Workout updated successfully', updatedWorkout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) return res.status(404).json({ message: 'Workout not found' });

    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeWorkoutStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });

    workout.status = 'completed';
    await workout.save();

    res.json({ message: 'Workout status updated successfully', workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};