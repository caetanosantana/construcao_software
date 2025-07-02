// drizzle-schema.ts
import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  blob,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ------------------ ENUM ------------------
export const alternativeTypeEnum = ["image", "string"] as const;
export type AlternativeType = (typeof alternativeTypeEnum)[number];

export const questionStatusEnum = [
  "approved",
  "rejected",
  "pending_approval",
] as const;
export type QuestionStatus = (typeof questionStatusEnum)[number];

export const timestamps = {
  updated_at: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  created_at: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  deleted_at: text("deleted_at").default(sql`(NULL)`),
};

// ------------------ USERS ------------------
export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  cpf: text("cpf"),
  birthDate: text("birth_date"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),

  // FIXME: adicionei as permissoes aqui, mas o melhor seria criar uma tabela separada para permissões
  canAdd: integer("can_add", { mode: "boolean" }),
  canDelete: integer("can_delete", { mode: "boolean" }),

  ...timestamps,
  isDeleted: integer("is_deleted", { mode: "boolean" }).default(false),
});

export const professors = sqliteTable("professors", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  cfep: integer("cfep"),
});

export const administrators = sqliteTable("administrators", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
});

export const curators = sqliteTable("curators", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

// ------------------ KNOWLEDGE AREA ------------------
export const knowledgeAreas = sqliteTable("knowledge_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  specificArea: text("specific_area"),
});

// ------------------ OBR EDITION ------------------
export const obrEditions = sqliteTable("obr_editions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stage: text("stage"),
  year: integer("year"),
});

// ------------------ QUESTIONS ------------------
export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  number: integer("number"),
  question: text("question"),

  education: text("education"),
  knowledge: text("knowledge"),
  hability: text("hability"),

  obrYear: text("obr_year").default(sql`(NULL)`),
  obrLevel: text("obr_level").default(sql`(NULL)`),
  obrStage: text("obr_stage").default(sql`(NULL)`),
  obrQuestionNumber: text("obr_question_number").default(sql`(NULL)`),

  keyword: text("keyword").default(sql`(NULL)`),
  difficulty: integer("difficulty").default(sql`(NULL)`),
  knowledgeAreaId: integer("knowledge_area_id").references(() => knowledgeAreas.id).default(sql`(NULL)`),
  editionId: integer("edition_id").references(() => obrEditions.id).default(sql`(NULL)`),

  userId: text("user_id").references(() => users.id), // Relacionamento com usuário criador

  status: text("status").$type<QuestionStatus>(),

  ...timestamps,
});

// ------------------ ALTERNATIVES ------------------
export const alternatives = sqliteTable("alternatives", {
  id: text("id").primaryKey(),
  answer: text("answer"),
  type: text("type").$type<AlternativeType>(),
  isCorrect: integer("is_correct", { mode: "boolean" }),
  questionId: text("question_id").references(() => questions.id, {
    onDelete: "cascade",
  }),
  image: blob("image", {mode: "buffer"}).$type<Uint8Array | null>(),

  ...timestamps,
});

// ------------------ BNCC & COMP ------------------
export const bncc = sqliteTable("bncc", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description"),
});

export const comp = sqliteTable("comp", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description"),
});

export const questionBNCC = sqliteTable("question_bncc", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").references(() => questions.id),
  bnccId: integer("bncc_id").references(() => bncc.id),
});

export const questionCOMP = sqliteTable("question_comp", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").references(() => questions.id),
  compId: integer("comp_id").references(() => comp.id),
});

// ------------------ EDIT HISTORY ------------------
export const editHistory = sqliteTable("edit_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  curatorId: integer("curator_id").references(() => curators.id),
  editDate: text("edit_date"),
  comment: text("comment"),
});

export const questionEditHistory = sqliteTable("question_edit_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").references(() => questions.id),
  historyId: integer("history_id").references(() => editHistory.id),
});

// ------------------ EXAMS ------------------
export const exams = sqliteTable("exams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  performance: text("performance"),
  questionId: integer("question_id").references(() => questions.id),
});

export type InsertQuestion = typeof questions.$inferInsert;
export type SelectQuestion = typeof questions.$inferSelect;

export type InsertAlternative = typeof alternatives.$inferInsert;
export type SelectAlternative = typeof alternatives.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertKnowledgeArea = typeof knowledgeAreas.$inferInsert;
export type SelectKnowledgeArea = typeof knowledgeAreas.$inferSelect;

export type InsertOBREdition = typeof obrEditions.$inferInsert;
export type SelectOBREdition = typeof obrEditions.$inferSelect;

export type InsertBNCC = typeof bncc.$inferInsert;
export type SelectBNCC = typeof bncc.$inferSelect;

export type InsertCOMP = typeof comp.$inferInsert;
export type SelectCOMP = typeof comp.$inferSelect;

export type InsertQuestionBNCC = typeof questionBNCC.$inferInsert;
export type SelectQuestionBNCC = typeof questionBNCC.$inferSelect;

export type InsertQuestionCOMP = typeof questionCOMP.$inferInsert;
export type SelectQuestionCOMP = typeof questionCOMP.$inferSelect;

export type InsertEditHistory = typeof editHistory.$inferInsert;
export type SelectEditHistory = typeof editHistory.$inferSelect;

export type InsertQuestionEditHistory = typeof questionEditHistory.$inferInsert;
export type SelectQuestionEditHistory = typeof questionEditHistory.$inferSelect;

export type InsertExam = typeof exams.$inferInsert;
export type SelectExam = typeof exams.$inferSelect;

export type InsertProfessor = typeof professors.$inferInsert;
export type SelectProfessor = typeof professors.$inferSelect;

export type InsertAdministrator = typeof administrators.$inferInsert;
export type SelectAdministrator = typeof administrators.$inferSelect;

export type InsertCurator = typeof curators.$inferInsert;
export type SelectCurator = typeof curators.$inferSelect;

