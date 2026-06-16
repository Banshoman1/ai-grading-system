import React, { useState } from 'react';
import { Upload, File } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const UploadScriptsPage: React.FC = () => {
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [question, setQuestion] = useState('');
  const [modelAnswer, setModelAnswer] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await api.submitForGrading({
        courseId: parseInt(courseId),
        studentId: parseInt(studentId),
        question,
        modelAnswer,
        studentAnswer,
      });

      toast.success('Answers submitted for grading!');
      // Reset form
      setCourseId('');
      setStudentId('');
      setQuestion('');
      setModelAnswer('');
      setStudentAnswer('');
    } catch (error) {
      toast.error('Failed to submit for grading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Answer Scripts</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Submit student answers for AI grading</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Submit for Grading</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course ID
              </label>
              <input
                type="number"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student ID
              </label>
              <input
                type="number"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white h-24"
                placeholder="Enter the exam question..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model Answer
              </label>
              <textarea
                value={modelAnswer}
                onChange={(e) => setModelAnswer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white h-32"
                placeholder="Enter the model/correct answer..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student Answer
              </label>
              <textarea
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white h-32"
                placeholder="Enter the student's answer..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              {loading ? 'Submitting...' : 'Submit for Grading'}
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">How to Use</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li>• Select a course and student</li>
              <li>• Enter the exam question</li>
              <li>• Provide the correct model answer</li>
              <li>• Enter the student's answer</li>
              <li>• Click "Submit for Grading"</li>
              <li>• AI will analyze and grade automatically</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-100 mb-3">AI Grading Features</h3>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
              <li>✓ Keyword matching analysis</li>
              <li>✓ Cosine similarity calculation</li>
              <li>✓ Text structure analysis</li>
              <li>✓ Intelligent feedback generation</li>
              <li>✓ Automatic grade assignment</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Grading Scale</h3>
            <div className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <p>90-100: A (Excellent)</p>
              <p>80-89: B (Very Good)</p>
              <p>70-79: C (Good)</p>
              <p>60-69: D (Fair)</p>
              <p>0-59: F (Fail)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScriptsPage;