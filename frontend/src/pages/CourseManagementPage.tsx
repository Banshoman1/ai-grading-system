import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../services/api';
import { Course } from '../types';
import toast from 'react-hot-toast';

const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    semester: 1,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateCourse(editingId, formData);
        toast.success('Course updated successfully');
        setEditingId(null);
      } else {
        await api.addCourse(formData);
        toast.success('Course added successfully');
      }
      resetForm();
      fetchCourses();
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({
      courseCode: course.courseCode,
      courseTitle: course.courseTitle,
      semester: course.semester,
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.deleteCourse(id);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      courseCode: '',
      courseTitle: '',
      semester: 1,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{courses.length} courses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Course' : 'Add New Course'}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Course Code"
              value={formData.courseCode}
              onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
              disabled={!!editingId}
            />
            <input
              type="text"
              placeholder="Course Title"
              value={formData.courseTitle}
              onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
            </select>
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

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary">{course.courseCode}</h3>
              <p className="text-gray-900 dark:text-white font-semibold mt-2">{course.courseTitle}</p>
            </div>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Semester {course.semester}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(course)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagementPage;