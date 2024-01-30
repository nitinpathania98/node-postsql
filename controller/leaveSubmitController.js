const pool = require('../db');

// Get all leave submissions
exports.getAllLeaveSubmissions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leave_submit');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leave submissions:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Insert a new leave submission
exports.createLeaveSubmission = async (req, res) => {
  try {
    const { leave_type, purpose, duration } = req.body;

    console.log('Received request body:', req.body);

    if (!leave_type || !purpose || !duration) {
      return res.status(400).json({ message: 'Incomplete leave details' });
    }

    const result = await pool.query(
      'INSERT INTO leave_submit (leave_type, purpose, duration) VALUES ($1, $2, $3) RETURNING *',
      [leave_type, purpose, duration]
    );

    console.log('Inserted leave data:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting leave submission:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
