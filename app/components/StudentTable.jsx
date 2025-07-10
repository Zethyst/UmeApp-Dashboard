import React, { useState, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2, Plus, X, Check } from "lucide-react";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    status: "Enrolled",
    course: "",
    enrolled: "",
    progress: 0,
  });

  const initialData = [
    {
      id: 1,
      name: "Vandana",
      status: "Enrolled",
      course: "UI/UX Design",
      enrolled: "16/04/2021",
      progress: 85,
    },
    {
      id: 2,
      name: "Priyanka",
      status: "Enrolled",
      course: "Full Stack Development",
      enrolled: "16/04/2021",
      progress: 92,
    },
    {
      id: 3,
      name: "Raveena",
      status: "Enrolled",
      course: "Front-End Development",
      enrolled: "01/04/2021",
      progress: 78,
    },
    {
      id: 4,
      name: "Gita",
      status: "Enrolled",
      course: "Back-End Development",
      enrolled: "04/04/2021",
      progress: 95,
    },
    {
      id: 5,
      name: "Meenakshi",
      status: "Enrolled",
      course: "UI/UX Design",
      enrolled: "09/03/2021",
      progress: 67,
    },
    {
      id: 6,
      name: "Amit",
      status: "Unenrolled",
      course: "Front-End Development",
      enrolled: "01/04/2021",
      progress: 43,
    },
  ];

  useEffect(() => {
    const savedStudents = localStorage.getItem("studentData");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(initialData);
      localStorage.setItem("studentData", JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("studentData", JSON.stringify(students));
    }
  }, [students]);

  const ProgressBar = ({ progress }) => (
    <div className="w-20 bg-gray-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({ ...student });
    setDropdownOpen(null);
  };

  const handleDelete = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    setDropdownOpen(null);
  };

  const handleDeleteSelected = () => {
    setStudents(
      students.filter((student) => !selectedStudents.includes(student.id))
    );
    setSelectedStudents([]);
  };

  const handleSaveEdit = () => {
    setStudents(
      students.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      )
    );
    setEditingStudent(null);
  };

  const handleAddStudent = () => {
    const newId = Math.max(...students.map((s) => s.id), 0) + 1;
    const studentToAdd = {
      ...newStudent,
      id: newId,
      enrolled: new Date().toLocaleDateString("en-GB"),
      progress: Math.floor(Math.random() * 100),
    };
    setStudents([...students, studentToAdd]);
    setNewStudent({
      name: "",
      status: "Enrolled",
      course: "",
      enrolled: "",
      progress: 0,
    });
    setShowAddForm(false);
  };

  const courseOptions = [
    "UI/UX Design",
    "Full Stack Development",
    "Front-End Development",
    "Back-End Development",
  ];

  return (
    <div className=" bg-white rounded-lg shadow-sm">
      <div className="flex justify-end items-center mb-6">
        <div className="flex space-x-3">
          {selectedStudents.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <Trash2 size={16} />
              <span>Delete Selected ({selectedStudents.length})</span>
            </button>
          )}
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add New Record</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Add New Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newStudent.status}
              onChange={(e) =>
                setNewStudent({ ...newStudent, status: e.target.value })
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Enrolled">Enrolled</option>
              <option value="Unenrolled">Unenrolled</option>
            </select>
            <select
              value={newStudent.course}
              onChange={(e) =>
                setNewStudent({ ...newStudent, course: e.target.value })
              }
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleAddStudent}
                disabled={!newStudent.name || !newStudent.course}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Check size={16} />
                <span>Add</span>
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-1"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === students.length &&
                    students.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded focus:ring-blue-500"
                />
              </th>
              <th className="text-left p-3">Students</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Course</th>
              <th className="text-left p-3">Enrolled</th>
              <th className="text-left p-3">Progress</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) =>
                      handleSelectStudent(student.id, e.target.checked)
                    }
                    className="rounded focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
                    {student.name.charAt(0)}
                  </div>
                  {editingStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          name: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{student.name}</span>
                  )}
                </td>
                <td className="p-3">
                  {editingStudent?.id === student.id ? (
                    <select
                      value={editingStudent.status}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          status: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Enrolled">Enrolled</option>
                      <option value="Unenrolled">Unenrolled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        student.status === "Enrolled"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {editingStudent?.id === student.id ? (
                    <select
                      value={editingStudent.course}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          course: e.target.value,
                        })
                      }
                      className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {courseOptions.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{student.course}</span>
                  )}
                </td>
                <td className="p-3">{student.enrolled}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <ProgressBar progress={student.progress} />
                    <span className="text-xs text-gray-600">
                      {student.progress}%
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  {editingStudent?.id === student.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="p-1 hover:bg-green-100 rounded text-green-600"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingStudent(null)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === student.id ? null : student.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                      {dropdownOpen === student.id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white border rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(student)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
