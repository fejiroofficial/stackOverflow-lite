DROP DATABASE IF EXISTS stackdb;
CREATE DATABASE stackdb;

\c stackdb;

CREATE TABLE IF NOT EXISTS users (
  "id" SERIAL PRIMARY KEY,
  "fullname" VARCHAR(255) NOT NULL,
  "username" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS allQuestions (
  "id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "questionTitle" VARCHAR(70) NOT NULL,
  "questionDescription" TEXT,
  "visibility" visibility DEFAULT 'public',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  --Relationship 
  FOREIGN KEY("userId") REFERENCES users("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS answers (
  "id" SERIAL PRIMARY KEY,
  "questionId" INT NOT NULL,
  "answer" TEXT,
  "visibility" visibility DEFAULT 'public',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  --Relationship 
  FOREIGN KEY("questionId") REFERENCES allQuestions("id") ON DELETE CASCADE
);

INSERT INTO users (fullname, username, email, password)
   VALUES ("Fejiro Gospel", "fejiroofficial", "gpsparks@rocketmail.com", "just123");
