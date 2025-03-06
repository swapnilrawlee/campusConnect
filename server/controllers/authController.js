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
  
  
  const name = user.first_name  || user.FirstName ; 
  const id = user.RollNumber || user.employee_id;
  const Student_year = user.YearOfStudy
  
  // Assuming your users have a StudentID or EmployeeID
  return jwt.sign({ id , name, role,Student_year }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
module.exports.Login = async (req, res) => {
  const { uniqueId, role, password } = req.body;

  if (!uniqueId || !role || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const connection = await connectDB;
    let query = "";
    let params = [];

    // Determine query based on role
    if (role.toLowerCase() === "student") {
      query = "SELECT * FROM studentprofile WHERE rollnumber = ?";
      params = [uniqueId.trim()];
    } else if (role.toLowerCase() === "teacher" || role.toLowerCase() === "hod") {
      query = "SELECT * FROM staffbasicinfo WHERE LOWER(role) = LOWER(?) AND employee_id = ?";
      params = [role.trim(), uniqueId.trim()];
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Execute the query
    const [rows] = await connection.execute(query, params);

    if (rows.length > 0) {
      
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user, role);
        console.log("Login successful. Token generated.");
        const { password, ...userDetails } = user;

        return res.status(200).json({
          message: "Login successful",
          token,
          userDetails,
        });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).send({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
    }
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

