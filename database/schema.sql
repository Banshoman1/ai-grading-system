-- AI Grading System Database Schema
-- Lead City University
-- Complete with sample data

CREATE DATABASE IF NOT EXISTS ai_grading_system;
USE ai_grading_system;

-- Lecturers Table
CREATE TABLE lecturers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matricNumber VARCHAR(50) UNIQUE NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  level VARCHAR(50),
  email VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseCode VARCHAR(50) UNIQUE NOT NULL,
  courseTitle VARCHAR(255) NOT NULL,
  semester INT,
  lecturerId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lecturerId) REFERENCES lecturers(id)
);

-- Exams Table
CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseId INT NOT NULL,
  question TEXT NOT NULL,
  modelAnswer TEXT NOT NULL,
  totalMarks INT DEFAULT 100,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

-- Exam Answers Table
CREATE TABLE exam_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  examId INT NOT NULL,
  studentId INT NOT NULL,
  answer TEXT NOT NULL,
  submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (examId) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
);

-- Results Table
CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  examAnswerId INT NOT NULL UNIQUE,
  score INT,
  grade VARCHAR(2),
  feedback TEXT,
  similarityScore INT,
  performanceLevel VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (examAnswerId) REFERENCES exam_answers(id) ON DELETE CASCADE
);

-- Feedback Table
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resultId INT NOT NULL,
  feedbackText TEXT,
  performanceLevel VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resultId) REFERENCES results(id) ON DELETE CASCADE
);

-- Reports Table
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reportType VARCHAR(100),
  lecturerId INT,
  reportData JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lecturerId) REFERENCES lecturers(id)
);

-- Create indexes for better performance
CREATE INDEX idx_student_matric ON students(matricNumber);
CREATE INDEX idx_course_code ON courses(courseCode);
CREATE INDEX idx_exam_course ON exams(courseId);
CREATE INDEX idx_answer_student ON exam_answers(studentId);
CREATE INDEX idx_answer_exam ON exam_answers(examId);
CREATE INDEX idx_result_answer ON results(examAnswerId);
CREATE INDEX idx_lecturer_email ON lecturers(email);

-- Insert Lecturers
INSERT INTO lecturers (email, password, firstName, lastName, department) VALUES
('john.doe@lcu.edu.ng', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/GOa', 'John', 'Doe', 'Software Engineering'),
('prof.smith@lcu.edu.ng', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/GOa', 'Smith', 'Johnson', 'Software Engineering'),
('dr.james@lcu.edu.ng', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/GOa', 'James', 'Williams', 'Software Engineering');

-- Insert Students
INSERT INTO students (matricNumber, firstName, lastName, department, level, email) VALUES
('LCU/UG/22/23001', 'Adewale', 'Okikiola', 'Software Engineering', '200', 'adewale.okikiola@lcu.edu.ng'),
('LCU/UG/22/23002', 'Chioma', 'Okafor', 'Software Engineering', '200', 'chioma.okafor@lcu.edu.ng'),
('LCU/UG/22/23003', 'Tunde', 'Adeleke', 'Software Engineering', '200', 'tunde.adeleke@lcu.edu.ng'),
('LCU/UG/22/23004', 'Grace', 'Iwuanyanwu', 'Software Engineering', '200', 'grace.iwuanyanwu@lcu.edu.ng'),
('LCU/UG/22/23005', 'Oluwaseun', 'Ajayi', 'Software Engineering', '200', 'oluwaseun.ajayi@lcu.edu.ng'),
('LCU/UG/22/23006', 'Ngozi', 'Eze', 'Software Engineering', '200', 'ngozi.eze@lcu.edu.ng'),
('LCU/UG/22/23007', 'Korede', 'Oladeji', 'Software Engineering', '200', 'korede.oladeji@lcu.edu.ng'),
('LCU/UG/22/23008', 'Amara', 'Nwafor', 'Software Engineering', '200', 'amara.nwafor@lcu.edu.ng'),
('LCU/UG/22/23009', 'David', 'Okonkwo', 'Software Engineering', '200', 'david.okonkwo@lcu.edu.ng'),
('LCU/UG/22/23010', 'Zainab', 'Ibrahim', 'Software Engineering', '200', 'zainab.ibrahim@lcu.edu.ng');

-- Insert Courses
INSERT INTO courses (courseCode, courseTitle, semester, lecturerId) VALUES
('CSC201', 'Data Structures', 1, 1),
('CSC202', 'Web Development', 1, 1),
('CSC203', 'Database Management', 2, 1),
('CSC204', 'Object-Oriented Programming', 1, 2),
('CSC205', 'Software Testing', 2, 2),
('CSC206', 'Web Security', 2, 3),
('CSC207', 'Mobile App Development', 1, 3),
('CSC208', 'Machine Learning Basics', 2, 2);

-- Insert Exams
INSERT INTO exams (courseId, question, modelAnswer, totalMarks) VALUES
(1, 'What is a binary tree and explain its properties?', 'A binary tree is a hierarchical data structure where each node has at most two children called left and right child. Key properties include: 1) Each node contains data and references to child nodes. 2) Trees are recursive structures with left and right subtrees. 3) Height is the longest path from root to leaf. 4) Complete binary trees have all levels filled except possibly the last. 5) Binary search trees maintain order property where left < parent < right. 6) Balanced trees have minimal height. 7) Traversal methods include inorder, preorder, and postorder.', 100),
(1, 'Explain the differences between an array and a linked list.', 'Arrays and Linked Lists are different data structures. Arrays: 1) Contiguous memory allocation. 2) Fixed size. 3) O(1) random access. 4) O(n) insertion/deletion. 5) Cache friendly due to contiguous memory. Linked Lists: 1) Non-contiguous memory (scattered nodes). 2) Dynamic size. 3) O(n) access time (must traverse). 4) O(1) insertion/deletion if position is known. 5) More memory overhead per node for pointers. Use arrays for random access requirements, linked lists for frequent insertions and deletions at arbitrary positions.', 100),
(2, 'Describe the Model-View-Controller (MVC) architecture.', 'MVC separates application into three components: 1) Model: Handles data and business logic, independent of UI. 2) View: Presents data to users, displays interface. 3) Controller: Handles user input and coordinates Model and View. Benefits: 1) Separation of concerns allows independent development. 2) Easier testing of components. 3) Scalability through modularity. 4) Reusability of code. Flow: User interacts with View > Controller processes request > Model updates/retrieves data > View refreshes display. Widely used in web frameworks like Django, Laravel, and ASP.NET.', 100),
(3, 'What is database normalization and why is it important?', 'Database normalization is the process of organizing data to reduce redundancy and improve integrity. Normal forms: 1NF (atomic values only), 2NF (no partial dependencies on keys), 3NF (no transitive dependencies), BCNF (stricter than 3NF). Benefits: 1) Reduces data redundancy saving storage. 2) Improves data consistency. 3) Minimizes update anomalies. 4) Saves storage space. 5) Improves query performance. 6) Reduces anomalies and conflicts. Drawback: May require joins affecting query performance for complex queries. Trade-off between normalization and query performance.', 100);

-- Insert Student Answers for Exam 1 (Binary Tree)
INSERT INTO exam_answers (examId, studentId, answer) VALUES
(1, 1, 'A binary tree is a tree where each node has maximum two children. Left and right children. Used for sorting and searching.'),
(1, 2, 'Binary tree has nodes with at most two children. Each child is either left or right. Trees are used in many applications like expression parsing, databases, and file systems. They have height properties.'),
(1, 3, 'A binary tree is a hierarchical structure with nodes having at most two children (left and right). Properties include height, complete trees, and BST property for ordering. Traversal includes inorder, preorder, postorder.'),
(1, 4, 'It is a tree structure used for data organization with maximum two children per node.'),
(1, 5, 'Binary trees have nodes with left and right children. They are recursive and used for various computational purposes like expression trees and search trees.'),
(1, 6, 'A binary tree is a tree where each node has at most two child nodes called left and right. Key properties: recursive structure, height, level, and ordering in BST.'),
(1, 7, 'Tree structure with two children max per node.'),
(1, 8, 'Binary trees are hierarchical data structures where each node has at most two children (left and right). Complete binary trees have all levels filled. Balanced trees minimize height. Useful for sorting, searching, and expression evaluation.'),
(1, 9, 'It has nodes with left and right children for data organization.'),
(1, 10, 'Binary tree: hierarchical structure, maximum two children per node, recursive, used in many applications like databases and filesystems.');

-- Insert Student Answers for Exam 2 (Array vs Linked List)
INSERT INTO exam_answers (examId, studentId, answer) VALUES
(2, 1, 'Arrays are fixed size while linked lists are dynamic. Arrays allow random access but linked lists require sequential access.'),
(2, 2, 'Arrays use contiguous memory and have O(1) access time. Linked lists are dynamic but have O(n) access time. Insertion is O(n) for arrays but O(1) for linked lists if you know the position.'),
(2, 3, 'Arrays are stored contiguously in memory with fixed size and fast random access. Linked lists use pointers and allow dynamic sizing with slower access but faster insertion/deletion at known positions.'),
(2, 4, 'Arrays are faster for reading, linked lists are faster for modifying.'),
(2, 5, 'Array: fixed size, contiguous memory, O(1) access. Linked list: dynamic, non-contiguous, O(n) access, O(1) insertion/deletion.'),
(2, 6, 'Arrays are fixed-size contiguous structures with O(1) random access. Linked lists are dynamic non-contiguous with O(n) access but O(1) insertion/deletion if position known.'),
(2, 7, 'Arrays have direct access while linked lists must traverse.'),
(2, 8, 'Arrays: contiguous memory, fixed size, O(1) access, O(n) modification. Linked lists: dynamic, scattered memory, O(n) access, O(1) insertion/deletion. Arrays cache-friendly, linked lists flexible.'),
(2, 9, 'Arrays allow quick access but fixed size. Linked lists are flexible but slower access.'),
(2, 10, 'Fixed-size array vs dynamic linked list. Random access vs sequential access.');

-- Insert Student Answers for Exam 3 (MVC Architecture)
INSERT INTO exam_answers (examId, studentId, answer) VALUES
(3, 1, 'MVC has three parts: Model for data, View for display, Controller for logic.'),
(3, 2, 'Model-View-Controller separates applications into Model (business logic and data), View (presentation and display), and Controller (user interaction and request handling). This improves code organization and maintainability.'),
(3, 3, 'MVC is an architectural pattern where Model manages data and logic, View displays information, and Controller handles user requests. It enables better code organization, testing, and scalability.'),
(3, 4, 'It is a design pattern that separates concerns in web applications.'),
(3, 5, 'Model handles data, View shows it, Controller processes requests. Separation of concerns improves maintainability.'),
(3, 6, 'MVC: Model (data/business logic), View (presentation), Controller (handles input). Benefits: modularity, testability, reusability, separation of concerns.'),
(3, 7, 'Three components: Model, View, Controller.'),
(3, 8, 'Model-View-Controller pattern separates application logic. Model manages data and business rules. View displays data to users. Controller handles user input and coordinates Model and View, improving testability and scalability.'),
(3, 9, 'Pattern separating data, presentation, and control logic.'),
(3, 10, 'MVC architecture: Model for business logic, View for presentation, Controller for request handling and coordination.');

-- Insert Student Answers for Exam 4 (Database Normalization)
INSERT INTO exam_answers (examId, studentId, answer) VALUES
(4, 1, 'Normalization removes duplicate data and ensures data integrity by organizing tables properly.'),
(4, 2, 'Normalization organizes data to minimize redundancy through various normal forms (1NF, 2NF, 3NF). This improves data consistency and reduces storage requirements and anomalies.'),
(4, 3, 'Database normalization eliminates data redundancy and maintains integrity through structured organization. Normal forms (1NF, 2NF, 3NF, BCNF) ensure proper data relationships and minimize anomalies during updates.'),
(4, 4, 'It is a process to organize database tables to reduce redundancy.'),
(4, 5, 'Normalization reduces redundancy and ensures integrity through systematic organization into normal forms.'),
(4, 6, 'Process of organizing database to minimize redundancy. Normal forms include 1NF (atomic), 2NF (remove partial dependencies), 3NF (remove transitive dependencies). Improves consistency and reduces anomalies.'),
(4, 7, 'Removes duplicate data and improves organization.'),
(4, 8, 'Normalization organizes data following normal forms (1NF through BCNF) to eliminate redundancy, prevent anomalies, improve consistency, and optimize storage. Trade-off: may require joins affecting performance.'),
(4, 9, 'Process to remove data redundancy and improve integrity.'),
(4, 10, 'Database normalization eliminates redundancy through normal forms, ensuring data consistency and minimizing update anomalies.');
