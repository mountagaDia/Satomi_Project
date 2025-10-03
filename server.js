const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const teacherData = {
  teacher1: {
    name: 'NGINGUE Moeko',
    announcements: ['Welcome back, students!', 'Homework due Friday.']
  },
  teacher2: {
    name: 'COULIBALY Fatima',
    announcements: ['Class canceled tomorrow.', 'New quiz uploaded.']
  }
};

app.get('/api/teacher-data', (req, res) => {
  const { teacherId } = req.query;
  const data = teacherData[teacherId];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
