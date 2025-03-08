import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TeacherNavbar from "./TeacherNavbar";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const TeacherAssignments = () => {
    const [notes, setNotes] = useState([]);
    const [file, setFile] = useState(null);
    const [year, setYear] = useState("1st Year"); // Default: 1st Year
    const [stream, setStream] = useState("Computer Science"); // Default: Computer Science
    const [employee_id, setEmployee_id] = useState("");
    const fileInputRef = useRef(null); // Reference for file input

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setEmployee_id(decodedToken.id);
        }
    }, []);

    useEffect(() => {
        if (employee_id) {
            fetchNotes();
        }
    }, [year, stream, employee_id]);

    const fetchNotes = async () => {
        try {
            const res = await axiosInstance.get(`/notes/${employee_id}/${year}/${stream}`);
            setNotes(res.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Select a file to upload");

        const formData = new FormData();
        formData.append("note", file);
        formData.append("employee_id", employee_id);
        formData.append("year", year);
        formData.append("stream", stream);

        try {
            await axios.post("http://localhost:3000/notes/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setFile(null); // Clear state
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset file input field
            }

            fetchNotes(); // Refresh notes list
        } catch (error) {
            console.error("Error uploading note:", error);
        }
    };

    const handleDownload = async (id, filename) => {
        try {
            const res = await axiosInstance.get(`/notes/download/${id}`, {
                responseType: "blob", // Get response as a file blob
            });

            // Create a link and trigger download
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename); // Set filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading note:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/notes/delete/${id}`);
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="flex w-screen min-h-screen">
            <TeacherNavbar />
            <div className="p-4 w-full">
                <h2 className="text-xl font-bold mb-4">Upload Notes</h2>
                <form onSubmit={handleUpload} className="mb-4 flex flex-wrap gap-2">
                    <input
                        type="file"
                        ref={fileInputRef} // Bind file input to ref
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border p-2"
                    />
                    
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border p-2"
                    >
                        {["1st Year", "2nd Year", "3rd Year"].map((yearLabel) => (
                            <option key={yearLabel} value={yearLabel}>
                                {yearLabel}
                            </option>
                        ))}
                    </select>

                    <select
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        className="border p-2"
                    >
                        {["Computer Science", "Information Technology"].map((streamLabel) => (
                            <option key={streamLabel} value={streamLabel}>
                                {streamLabel}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                        Upload
                    </button>
                </form>

                <h2 className="text-xl font-bold mt-4">
                    Your Notes for {year} - {stream}
                </h2>
                <ul>
                    {notes.map((note) => (
                        <li key={note.id} className="flex justify-between bg-gray-100 p-2 mb-2">
                            <span>{note.filename}</span>
                            <div>
                                <button
                                    onClick={() => handleDownload(note.id, note.filename)}
                                    className="bg-green-500 text-white px-2 mx-1"
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="bg-red-500 text-white px-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherAssignments;
