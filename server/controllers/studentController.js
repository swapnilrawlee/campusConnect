const connectDB = require("../config/mysqlConfig");
const bcrypt = require("bcrypt");

const fetchQuery = async (query, params = []) => {
  const connection = await connectDB;
  const [result] = await connection.execute(query, params);
  return result;
};

// Helper function for database queries
const executeQuery = async (query, params, res, successMessage) => {
  const connection = await connectDB;
  try {


    const [result] = await connection.execute(query, params); // Execute the query


    if (result.affectedRows > 0) {
      // Retrieve the studentid (assuming it's the auto-increment field)
      const studentid = result.insertId;
      return res
        .status(200)
        .send({ message: successMessage, studentid: studentid });
    } else {
      return res.status(400).send({ message: "Failed to insert record." });
    }
  } catch (err) {
    console.error("Database Error: ", err);
    return res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};

// Create student profile
module.exports.studentprofile = async (req, res) => {
  
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    mobileNumber,
    email,
    Course,
    permanentAddress,
    rollNumber,
    enrollmentYear,
    yearOfStudy,
    currentSemester,
  } = req.body;

  const dob = new Date(dateOfBirth);
  const dd = String(dob.getDate()).padStart(2, "0"); // Day with leading zero
  const mm = String(dob.getMonth() + 1).padStart(2, "0"); // Month with leading zero
  const yyyy = dob.getFullYear();
  const plainPassword = `${dd}${mm}${yyyy}`; // Combine into `ddmmyyyy`
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // Salt rounds = 10

  const query = `
      INSERT INTO studentprofile 
      (firstName, lastName,password, dateOfBirth, gender, mobileNumber, email, stream, permanentAddress, rollNumber, enrollmentYear,yearOfStudy,currentSemester) 
      VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

  await executeQuery(
    query,
    [
      firstName,
      lastName,
      hashedPassword,
      dateOfBirth,
      gender,
      mobileNumber,
      email,
      Course,
      permanentAddress,
      rollNumber,
      enrollmentYear,
      yearOfStudy,
      currentSemester,
    ],
    res,
    "Student profile created successfully"
  );
};

// Add academic details
module.exports.academicdetails = (req, res) => {
  const {
    academicAchievements,
    extracurricularActivities,
    certifications,
    studentId,
  } = req.body;

  const query = `
    INSERT INTO academicdetails 
    (academicAchievements, extracurricularActivities, certifications,studentId) 
    VALUES (?, ?, ?,?) `;

  executeQuery(
    query,
    [
      academicAchievements,
      extracurricularActivities,
      certifications,
      studentId,
    ],
    res,
    "Academic details created successfully"
  );
};

// Add emergency contact
module.exports.emergencycontact = (req, res) => {
  const {
    emergencyContactName,
    emergencyContactRelation,
    emergencyContactNumber,
    studentId,
  } = req.body;

  const query = `
    INSERT INTO emergencycontact 
    (ContactName, ContactRelation, ContactNumber,studentId) 
    VALUES (?, ?, ?,?)`;

  executeQuery(
    query,
    [
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
      studentId,
    ],
    res,
    "Emergency contact created successfully"
  );
};

// Add skills and languages
module.exports.skillsandlanguages = (req, res) => {
  const { skills, languagesKnown, studentId } = req.body;

  const query = `
    INSERT INTO skillsandlanguages 
    (Skills, LanguagesKnown, StudentId) 
    VALUES (?, ?,?)`;

  executeQuery(
    query,
    [skills, languagesKnown, studentId],
    res,
    "Skills and languages created successfully"
  );
};

// Fetch full student details
module.exports.studentfulldetail = async (req, res) => {
  
  const rollNumber = req.query.rollNumber; // Retrieve rollNumber from query parameters

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
    WHERE sp.rollNumber = ?`;

  try {
    const result = await fetchQuery(query, [rollNumber]); // Execute the query

    if (result.length === 0) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Destructure and exclude the password field
    const { password, ...studentWithoutPassword } = result[0];

    // Return the student details without the password
    return res.status(200).send({
      message: "Student details fetched successfully",
      data: studentWithoutPassword,
    });
  } catch (err) {
    console.error("Database Error: ", err);
    return res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};

module.exports.studentCount = async (req, res) => {
  const query = "SELECT COUNT(*) as totalStudents FROM studentprofile";

  try {
    const result = await fetchQuery(query);
    return res
      .status(200)
      .send({
        message: "Total Students fetched successfully",
        data: result[0],
      });
  } catch (err) {
    console.error("Database Error: ", err);
    return res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};
