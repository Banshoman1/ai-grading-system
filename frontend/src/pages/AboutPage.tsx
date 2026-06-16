import React from 'react';
import { Brain, Database, Code, Users, BarChart3, Lock } from 'lucide-react';

const AboutPage: React.FC = () => {
  const technologies = [
    { icon: Code, name: 'React + TypeScript' },
    { icon: Database, name: 'MySQL Database' },
    { icon: Brain, name: 'AI & NLP' },
    { icon: BarChart3, name: 'Analytics' },
  ];

  const objectives = [
    'Automate the grading process to save lecturer time',
    'Provide consistent and fair grading across all students',
    'Generate intelligent, personalized feedback',
    'Track and analyze student performance trends',
    'Support evidence-based teaching decisions',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About AI-Assisted Grading System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Lead City University - Software Engineering Department
          </p>
        </div>

        {/* Project Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The AI-Assisted Grading and Feedback System is a modern web application designed to help lecturers at Lead City University automatically grade student answers and generate intelligent feedback using Artificial Intelligence and Natural Language Processing techniques.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This system addresses the challenge of manual grading by providing automated, consistent, and intelligent assessment of student work. It leverages advanced algorithms to analyze student answers, compare them with model answers, and provide constructive feedback.
          </p>
        </div>

        {/* Developer Info */}
        <div className="bg-primary text-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Developer Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-blue-100"><strong>Name:</strong> Adewale Gbolahan Okikiola</p>
              <p className="text-blue-100"><strong>Matric Number:</strong> LCU/UG/22/23017</p>
              <p className="text-blue-100"><strong>Department:</strong> Software Engineering</p>
            </div>
            <div>
              <p className="text-blue-100"><strong>Institution:</strong> Lead City University, Ibadan, Nigeria</p>
              <p className="text-blue-100"><strong>Year:</strong> 2024</p>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">System Objectives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <Icon className="text-primary mx-auto mb-3" size={32} />
                  <p className="font-semibold text-gray-900 dark:text-white">{tech.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">System Benefits</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Time Efficiency:</strong> Automated grading reduces manual effort by up to 80%</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Consistency:</strong> Eliminates bias and ensures uniform grading standards</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Feedback Quality:</strong> Provides detailed, constructive feedback instantly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Analytics:</strong> Real-time insights into student performance and trends</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;