const connectDB = require("../config/mysqlConfig");
const fetchQuery = async (query, params = []) => {
    const connection = await connectDB;
    const [result] = await connection.execute(query, params);
    
    return result;
  };
const executeQuery = async (query, params, res, successMessage) => {
    const connection = await connectDB;
    try {
        const [result] = await connection.execute(query, params); // Execute the query

        if (result.affectedRows > 0) {
            // Retrieve the subjectID (assuming it's the auto-increment field)
            const subjectID = result.insertId;
            return res.status(200).send({ message: successMessage });
        } else {
            return res.status(400).send({ message: "Failed to insert record." });
        }
    } catch (err) {
        console.error("Database Error: ", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
};

module.exports.CreateSubject = async function (req, res) {
    const { stream, year, sem, subjectName } = req.body;

    const checkQuery = `SELECT * FROM subjects WHERE stream = ? AND subject_name = ? AND year = ? AND semester = ?`;
    const connection = await connectDB;

    try {
        // Check if the subject already exists for the same stream, year, and semester
        const [existingSubject] = await connection.execute(checkQuery, [stream, subjectName, year, sem]);

        if (existingSubject.length > 0) {
            // Respond with a message indicating that the subject already exists in the same stream, year, and semester
            return res.status(400).send({ message: "This subject already exists in the same stream, year, and semester." });
        }

        // Proceed to insert the subject if it doesn't exist
        const query = `INSERT INTO subjects (stream, year, semester, subject_name) VALUES (?, ?, ?, ?)`;
        await executeQuery(query, [stream, year, sem, subjectName], res, "Subject created successfully");

    } catch (err) {
        console.error("Database Error: ", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
};
module.exports.ShowSubject = async (req, res) => {
try {
    console.log(
        req.query
    );
    
    const year = req.query?.year;
    
    const query = "SELECT subject_name ,stream,year,semester FROM subjects where year=?";

    try {
        const subjects = await fetchQuery(query,[year]);

        return res.status(200).send({ message: "Subjects fetched successfully.", data: subjects });
    } catch (err) {
        console.error("ShowSubject Error:", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
} catch (error) {
    console.log("something went wrong");
    
}
};
module.exports.studentSubject = async (req, res) => {
try {

    const stream = req.query?.stream;
    const year = req.query?.year;
    
    const query = "SELECT subject_name ,stream,year,semester FROM subjects where stream=? AND year=?";

    try {
        const subjects = await fetchQuery(query,[stream,year]);

        return res.status(200).send({ message: "Subjects fetched successfully.", data: subjects });
    } catch (err) {
        console.error("ShowSubject Error:", err);
        return res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
} catch (error) {
    console.log("something went wrong");
    
}
};