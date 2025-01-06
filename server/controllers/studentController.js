const pool = require("../config/mysqlConfig");

// Helper function for database queries
// Helper function for database queries
const executeQuery = async (query, params, res, successMessage) => {
    const connection = await pool.getConnection(); // Get a connection from the pool
    try {
        console.log("Executing Query: ", query);
        console.log("With Params: ", params);

        const [result] = await connection.execute(query, params); // Execute the query

        console.log("Query Result: ", result);

        if (result.affectedRows > 0) {
            // Retrieve the studentid (assuming it's the auto-increment field)
            const studentid = result.insertId;
            return res.status(200).send({ message: successMessage, studentid: studentid });
        } else {
            return res.status(400).send({ message: "Failed to insert record." });
        }
    } catch (err) {
        console.error("Database Error: ", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    } finally {
        connection.release(); // Always release the connection back to the pool
    }
};

  // Create student profile
  module.exports.studentprofile = (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, mobileNumber, email, Course, permanentAddress, rollNumber, enrollmentYear } = req.body;
  
    const query = `
      INSERT INTO studentprofile 
      (firstName, lastName, dateOfBirth, gender, mobileNumber, email, course, permanentAddress, rollNumber, enrollmentYear) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    executeQuery(query, [firstName, lastName, dateOfBirth, gender, mobileNumber, email, Course, permanentAddress, rollNumber, enrollmentYear], res, "Student profile created successfully");
  };
  
// Add academic details
module.exports.academicdetails = (req, res) => {
  const { academicAchievements, extracurricularActivities, certifications,studentId } = req.body;

  const query = `
    INSERT INTO academicdetails 
    (academicAchievements, extracurricularActivities, certifications,studentId) 
    VALUES (?, ?, ?,?) `;

  executeQuery(query, [academicAchievements, extracurricularActivities, certifications,studentId], res, "Academic details created successfully");
};

// Add emergency contact
module.exports.emergencycontact = (req, res) => {
  const { emergencyContactName, emergencyContactRelation, emergencyContactNumber ,studentId} = req.body;
  console.log(req.body);
  

  const query = `
    INSERT INTO emergencycontact 
    (ContactName, ContactRelation, ContactNumber,studentId) 
    VALUES (?, ?, ?,?)`;

  executeQuery(query, [emergencyContactName,  emergencyContactRelation ,emergencyContactNumber,studentId], res, "Emergency contact created successfully");
};

// Add skills and languages
module.exports.skillsandlanguages = (req, res) => {
  const { skills, languagesKnown,studentId } = req.body;

  const query = `
    INSERT INTO skillsandlanguages 
    (Skills, LanguagesKnown, StudentId) 
    VALUES (?, ?,?)`;

  executeQuery(query, [skills, languagesKnown,studentId], res, "Skills and languages created successfully");
};

// Fetch full student details
module.exports.studentfulldetail = (req, res) => {
  const { studentId } = req.body;

  const query = `
    SELECT 
      sp.*, 
      ad.academicAchievements, ad.extracurricularActivities, ad.certifications,
      ec.ContactName AS emergencyContactName, ec.ContactRelation AS emergencyContactRelation, ec.ContactNumber AS emergencyContactNumber,
      sl.Skills, sl.LanguagesKnown
    FROM studentprofile sp
    LEFT JOIN academicdetails ad ON sp.studentId = ad.studentId
    LEFT JOIN emergencycontact ec ON sp.studentId = ec.studentId
    LEFT JOIN skillsandlanguages sl ON sp.studentId = sl.studentId
    WHERE sp.studentId = ?`;

  pool.query(query, [studentId], (err, result) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student details fetched successfully", data: result[0] });
  });
};
