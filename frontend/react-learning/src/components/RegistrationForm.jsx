import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    course: ""
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // Tracks the student ID being edited

  // Clean, reusable input handler
  function handleChange(event) {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validations
    if (formData.id.trim() === "") {
      setError("ID should not be empty");
      return;
    }
    if (formData.name.trim() === "") {
      setError("Name should not be empty");
      return;
    }
    if (formData.course.trim() === "") {
      setError("Course should not be empty");
      return;
    }

    if (editingId !== null) {
      // --- UPDATE MODE ---
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? { ...student, name: formData.name, course: formData.course }
            : student
        )
      );
      setEditingId(null); // Clear editing mode
    } else {
      // --- CREATE MODE ---
      // Check if ID already exists to prevent duplicate keys
      const idExists = students.some((s) => s.id === formData.id);
      if (idExists) {
        setError("A student with this ID already exists!");
        return;
      }

      const newStudent = {
        id: formData.id,
        name: formData.name,
        course: formData.course
      };
      setStudents([...students, newStudent]);
    }

    // Reset Form & Clear Errors
    setFormData({ id: "", name: "", course: "" });
    setError("");
  }

  // Populates the form inputs when "Edit" is clicked
  function handleEdit(student) {
    setEditingId(student.id);
    setFormData({
      id: student.id,
      name: student.name,
      course: student.course
    });
  }

  function handleDelete(id) {
    setStudents(students.filter((s) => s.id !== id));
    // If the currently edited student is deleted, cancel edit mode
    if (editingId === id) {
      setEditingId(null);
      setFormData({ id: "", name: "", course: "" });
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Student Registration</h2>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label htmlFor="id">ID: </label>
          <input
            id="id"
            type="text"
            value={formData.id}
            onChange={handleChange}
            disabled={editingId !== null} // Prevent changing the ID during an edit
          />
        </div>
        <br />
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="course">Course: </label>
          <input
            id="course"
            type="text"
            value={formData.course}
            onChange={handleChange}
          />
        </div>
        <br />
        {/* Dynamic button text depending on whether you are editing or adding */}
        <button type="submit">
          {editingId !== null ? "UPDATE" : "SUBMIT"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ id: "", name: "", course: "" });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Registered Students</h3>
      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course}</p>
            
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button
              onClick={() => handleDelete(student.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RegistrationForm;
