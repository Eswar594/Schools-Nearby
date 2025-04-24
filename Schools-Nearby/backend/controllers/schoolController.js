const db = require('../config/db');

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(200).json({ message: "School added successfully", schoolId: result.insertId });
  });
};

exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ message: "Invalid coordinates" });
  }

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const schools = results.map(school => ({
      ...school,
      distance: haversineDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    schools.sort((a, b) => a.distance - b.distance);
    res.json(schools);
  });
};
