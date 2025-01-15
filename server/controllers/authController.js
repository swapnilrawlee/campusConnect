const bcrypt = require("bcrypt");
const connectDB = require("../config/mysqlConfig");
require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports.adminLogin = (req, res) => {
  const { uniqueId, password } = req.body;

  if (!uniqueId || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (
    uniqueId === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

const generateToken = (user, role) => {
  const name = user.FirstName + " " + user.LastName; // Or use any other name field structure
  const id = user.StudentID || user.EmployeeID; // Assuming your users have a StudentID or EmployeeID
  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports.Login = async (req, res) => {
  const { uniqueId, role, password } = req.body;

  if (!uniqueId || !role || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const connection = await connectDB;
    let query = '';
    let params = [];
    
    if (role === "teacher") {
      query = "SELECT * FROM staffbasicinfo WHERE role = ? AND employee_id = ?";
      params = ["teacher", uniqueId];
    } else if (role === "student") {
      query = "SELECT * FROM studentprofile WHERE studentid = ?";
      params = [uniqueId];
    } else if (role === "hod") {
      query = "SELECT * FROM staffbasicinfo WHERE role = ? AND employee_id = ?";
      params = ["hod", uniqueId];
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const [rows] = await connection.execute(query, params);

    if (rows.length > 0) {
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user, role);
        const { password, ...userDetails } = user;
        return res.status(200).json({ message: "Login successful", token: token,userDetails: userDetails });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
