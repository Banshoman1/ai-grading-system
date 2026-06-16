import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import api from '../services/api';
import { Student } from '../types';
import toast from 'react-hot-toast';

const StudentManagementPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    matricNumber: '',
    firstName: '',
    lastName: '',
    department: 'Software Engineering',
    level: '100',
    email: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await api.getStudents();
      setStudents(data);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateStudent(editingId, formData);
        toast.success('Student updated successfully');
        setEditingId(null);
      } else {
        await api.addStudent(formData);
        toast.success('Student added successfully');
      }
      resetForm();
      fetchStudents();
    } catch (error) {
      toast.error('Failed to save student');
    }
  };

  const handleEdit = (student: Student) => {
    setFormData(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      matricNumber: '',
      firstName: '',
      lastName: '',
      department: 'Software Engineering',
      level: '100',
      email: '',
    });
    setShowForm(false);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{filteredStudents.length} students</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Student' : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Matric Number"
              value={formData.matricNumber}
              onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
              disabled={!!editingId}
            />
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            />
            <div className="md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Matric Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Level</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{student.matricNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{student.firstName} {student.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.level}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.email}</td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagementPage;