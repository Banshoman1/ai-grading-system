import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
} from "drizzle-orm/pg-core"

// ---------- Better Auth tables ----------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ---------- App tables ----------
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  department: text("department"),
  level: text("level"),
  session: text("session"),
  semester: text("semester"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  matricNumber: text("matricNumber").notNull(),
  fullName: text("fullName").notNull(),
  email: text("email"),
  department: text("department"),
  level: text("level"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  courseId: integer("courseId").notNull(),
  title: text("title").notNull(),
  examType: text("examType").notNull().default("Exam"),
  totalMarks: integer("totalMarks").notNull().default(100),
  instructions: text("instructions"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  examId: integer("examId").notNull(),
  position: integer("position").notNull().default(1),
  questionText: text("questionText").notNull(),
  modelAnswer: text("modelAnswer"),
  maxMarks: integer("maxMarks").notNull().default(10),
  rubric: text("rubric"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  examId: integer("examId").notNull(),
  studentId: integer("studentId").notNull(),
  status: text("status").notNull().default("pending"),
  totalScore: integer("totalScore"),
  maxScore: integer("maxScore"),
  percentage: integer("percentage"),
  grade: text("grade"),
  overallFeedback: text("overallFeedback"),
  gradedAt: timestamp("gradedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  submissionId: integer("submissionId").notNull(),
  questionId: integer("questionId").notNull(),
  answerText: text("answerText"),
  score: integer("score"),
  maxMarks: integer("maxMarks"),
  feedback: text("feedback"),
  strengths: text("strengths"),
  improvements: text("improvements"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})
