-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name VARCHAR(255),
  target_exam_date DATE,
  specialization VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LET Domains
CREATE TABLE let_domains (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- 'GenEd', 'ProfEd', or specialization name
  domain_type VARCHAR(50) NOT NULL, -- 'general_education', 'professional_education', 'specialization'
  description TEXT
);

-- Subtopics for each domain
CREATE TABLE subtopics (
  id SERIAL PRIMARY KEY,
  domain_id INTEGER REFERENCES let_domains(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  weight_percentage DECIMAL(5,2) -- Based on actual LET weight distribution
);

-- Question bank
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  subtopic_id INTEGER REFERENCES subtopics(id),
  domain_id INTEGER REFERENCES let_domains(id),
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) DEFAULT 'multiple_choice',
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  options JSONB, -- Array of options for multiple choice
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  created_by VARCHAR(50) DEFAULT 'system', -- 'system', 'ai_generated', 'admin'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz sessions
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  domain_id INTEGER REFERENCES let_domains(id),
  quiz_type VARCHAR(50) CHECK (quiz_type IN ('adaptive', 'mock_exam', 'topic_focused')),
  total_questions INTEGER,
  correct_answers INTEGER,
  score_percentage DECIMAL(5,2),
  time_spent INTEGER, -- in seconds
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual question responses
CREATE TABLE question_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES quiz_sessions(id),
  question_id INTEGER REFERENCES questions(id),
  user_answer TEXT,
  is_correct BOOLEAN,
  time_taken INTEGER, -- seconds spent on this question
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- User mastery levels per subtopic
CREATE TABLE user_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  subtopic_id INTEGER REFERENCES subtopics(id),
  mastery_level DECIMAL(5,2) CHECK (mastery_level >= 0 AND mastery_level <= 100),
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  last_attempted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subtopic_id)
);

-- Study materials
CREATE TABLE study_materials (
  id SERIAL PRIMARY KEY,
  subtopic_id INTEGER REFERENCES subtopics(id),
  title VARCHAR(255),
  content_type VARCHAR(50) CHECK (content_type IN ('article', 'video', 'practice_set', 'summary')),
  content_url TEXT,
  difficulty_level VARCHAR(20)
);

-- User study plans
CREATE TABLE study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  domain_id INTEGER REFERENCES let_domains(id),
  subtopic_id INTEGER REFERENCES subtopics(id),
  material_id INTEGER REFERENCES study_materials(id),
  status VARCHAR(50) DEFAULT 'assigned', -- 'assigned', 'in_progress', 'completed'
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);