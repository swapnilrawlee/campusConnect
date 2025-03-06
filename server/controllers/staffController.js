const  connectDB  = require("../config/mysqlConfig");

const bcrypt = require("bcrypt");
const fetchQuery = async (query, params = []) => {
    const connection = await connectDB;
    const [result] = await connection.execute(query, params);
    return result;
  };

const executeQuery = async (query, params, res, successMessage,extradata) => {
    const connection = await connectDB;
    try {
        const [result] = await connection.execute(query, params); // Execute the query

        if (result.affectedRows > 0) {
            // Retrieve the studentid (assuming it's the auto-increment field)
            const employeeID = result.insertId;
            return res.status(200).send({ message: successMessage, ...extradata});
        } else {
            return res.status(400).send({ message: "Failed to insert record." });
        }
    } catch (err) {
        console.error("Database Error: ", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    } 
};

module.exports.staffbasicinfo = (req, res) => {
  
  const {
    employeeID,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    mobileNumber,
    email,
    role,
  } = req.body;

  const date = new Date(dateOfBirth);
  const dd = String(date.getDate()).padStart(2, '0'); // Day with leading zero
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero
  const yyyy = date.getFullYear();
  const plainPassword = `${dd}${mm}${yyyy}`; // Combine into `ddmmyyyy`
  const hashedPassword = bcrypt.hashSync(plainPassword, 10); // Salt rounds = 10
 
  


  const query = `
    INSERT INTO staffbasicinfo
    (employee_id, first_name,password, last_name, date_of_birth, gender, mobile_number, email,role)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;
  
  
  executeQuery(query, [
    employeeID,
    firstName,
    hashedPassword,
    lastName,
    dateOfBirth,
    gender,
    mobileNumber,
    email,
    role
  ], res, "Staff basic info created successfully",{employeeID});
};

module.exports.staffadditionalinfo = (req, res) => {

    // Destructure fields with fallback defaults
    const {
        department = "",
        designation = "",
        qualification = "",
        specialization = "",
        experienceYears = "",
        joiningDate = "",
        emergencyContactName = "",
        emergencyContactNumber = "",
        employeeID = ""
    } = req.body;

    // Check if required fields are missing
    if (!employeeID) {
        return res.status(400).send({ message: "Employee ID is required." });
    }

    // SQL query
    const query = `
        INSERT INTO staffadditionalinfo
        (employee_id, department, designation, qualification, specialization, experience_years, joining_date, emergency_contact_name, emergency_contact_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

   

    // Execute query with parameters
    executeQuery(
        query,
        [
            employeeID,
            department,
            designation,
            qualification,
            specialization,
            experienceYears,
            joiningDate,
            emergencyContactName,
            emergencyContactNumber
        ],
        res,
        "Staff additional info created successfully"
    );
};

// Fetch full details of a staff member
module.exports.staffFullDetails = async (req, res) => {
  
    const  employeeID  =  req.query.employeeID;
    
   
    
    
  
    if (!employeeID) {
      return res.status(400).send({ message: "Employee ID is required." });
    }
  
    const query = `
      SELECT 
        sb.employee_id, sb.first_name, sb.last_name, sb.date_of_birth, sb.gender, sb.mobile_number, sb.email,
        sa.department, sa.designation, sa.qualification, sa.specialization, sa.experience_years, sa.joining_date, 
        sa.emergency_contact_name, sa.emergency_contact_number
      FROM staffbasicinfo sb
      LEFT JOIN staffadditionalinfo sa ON sb.employee_id = sa.employee_id
      WHERE sb.employee_id = ?
    `;
  
    try {
      const result = await fetchQuery(query, [employeeID]);
      if (result.length === 0) {
        return res.status(404).send({ message: "Staff member not found." });
      }
      return res.status(200).send({ message: "Staff details fetched successfully", data: result[0] });
    } catch (err) {
      console.error("Database Error: ", err);
      return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
  };
  
  // Get the total count of staff
  module.exports.staffCount = async (req, res) => {
    const query = "SELECT COUNT(*) AS totalStaff FROM staffbasicinfo";
  
    try {
      const result = await fetchQuery(query);
      return res.status(200).send({ message: "Total staff count fetched successfully", data: result[0] });
    } catch (err) {
      console.error("Database Error: ", err);
      return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
  };
  module.exports.staffdetails = async (req, res) => {
    const query = "SELECT * FROM staffbasicinfo";

    try {
      const result = await fetchQuery(query);
      return res.status(200).send({ message: "Staff details fetched successfully", data: result });
    } catch (err) {
      console.error("Database Error: ", err);
      return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
  }
  