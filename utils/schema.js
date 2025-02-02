import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDescription: varchar('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer=pgTable("userAnswer",{
  id: serial('id').primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:varchar("question").notNull(),
  correctAnswer:text("correctAnswer"),
  userAnswer:text("userAnswer"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("userEmail").notNull(),
  createdAt: varchar("createdAt"),
})

export const PrepareQuestions=pgTable("prepareQuestion",{
  id: serial('id').primaryKey(),
  jsonQuestionResp: text('jsonQuestionResp').notNull(),
  questionTopic: varchar('questionTopic').notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  questionId: varchar("questionId").notNull(),
})