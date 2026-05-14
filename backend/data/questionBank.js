const questionBank = {
  generalEducation: {
    english: [
      {
        question_text: "Choose the correct sentence:",
        options: ["A) The group of students are going to the museum.", "B) The group of students is going to the museum.", "C) The group of students were going to the museum.", "D) The group of students have been going to the museum."],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Collective nouns like 'group' take singular verbs when the group acts as one unit."
      },
      {
        question_text: "Which word is a synonym for 'benevolent'?",
        options: ["A) Malevolent", "B) Charitable", "C) Indifferent", "D) Hostile"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "'Benevolent' means well-meaning and kindly, similar to 'charitable'."
      },
      {
        question_text: "Identify the figure of speech: 'The classroom was a zoo.'",
        options: ["A) Simile", "B) Metaphor", "C) Personification", "D) Hyperbole"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "A metaphor directly compares two unlike things without using 'like' or 'as'."
      },
      {
        question_text: "What is the correct plural form of 'criterion'?",
        options: ["A) Criterions", "B) Criteria", "C) Criterias", "D) Criterion"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "'Criteria' is the correct plural form of the Greek-derived word 'criterion'."
      },
      {
        question_text: "Which sentence uses the correct subject-verb agreement?",
        options: ["A) Neither the teacher nor the students was present.", "B) Neither the teacher nor the students were present.", "C) Neither the teacher nor the students is present.", "D) Neither the teacher nor the students are present."],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "With 'neither...nor', the verb agrees with the nearest subject ('students' = plural)."
      },
      {
        question_text: "What type of context clue is used in: 'She was elated, or extremely happy, about the results'?",
        options: ["A) Antonym", "B) Synonym", "C) Definition", "D) Example"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The phrase 'or extremely happy' directly defines the word 'elated'."
      },
      {
        question_text: "Which word is misspelled?",
        options: ["A) Accommodate", "B) Embarrass", "C) Occurence", "D) Privilege"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The correct spelling is 'occurrence' (double 'c', double 'r')."
      },
      {
        question_text: "What is the tone of the sentence: 'I would be honored if you would consider my application'?",
        options: ["A) Arrogant", "B) Humble", "C) Sarcastic", "D) Aggressive"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Words like 'honored' and 'would consider' convey a humble and respectful tone."
      },
      {
        question_text: "Identify the error: 'Each of the students have submitted their project.'",
        options: ["A) Each of", "B) have submitted", "C) their project", "D) No error"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "'Each' is singular, so it should be 'has submitted' not 'have submitted'."
      },
      {
        question_text: "What reading strategy involves looking for specific information quickly?",
        options: ["A) Skimming", "B) Scanning", "C) Intensive reading", "D) Extensive reading"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Scanning is reading quickly to find specific facts or information."
      }
    ],
    mathematics: [
      {
        question_text: "If x + 3 = 7, what is the value of x?",
        options: ["A) 2", "B) 3", "C) 4", "D) 10"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Subtract 3 from both sides: x = 7 - 3 = 4"
      },
      {
        question_text: "What is 15% of 200?",
        options: ["A) 15", "B) 20", "C) 30", "D) 35"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "15% = 0.15, so 0.15 × 200 = 30"
      },
      {
        question_text: "What is the area of a rectangle with length 8cm and width 5cm?",
        options: ["A) 13 cm²", "B) 26 cm²", "C) 40 cm²", "D) 80 cm²"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Area = length × width = 8 × 5 = 40 cm²"
      },
      {
        question_text: "Solve: 3(x - 4) = 15",
        options: ["A) x = 7", "B) x = 9", "C) x = 5", "D) x = 1"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "3x - 12 = 15, 3x = 27, x = 9"
      },
      {
        question_text: "What is the probability of rolling a 3 on a standard die?",
        options: ["A) 1/3", "B) 1/6", "C) 1/2", "D) 2/3"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "There is one favorable outcome (3) out of six possible outcomes."
      },
      {
        question_text: "A car travels 240 km in 3 hours. What is its average speed?",
        options: ["A) 60 km/h", "B) 70 km/h", "C) 80 km/h", "D) 720 km/h"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Speed = Distance ÷ Time = 240 ÷ 3 = 80 km/h"
      },
      {
        question_text: "What is the value of π (pi) rounded to two decimal places?",
        options: ["A) 3.14", "B) 3.16", "C) 3.12", "D) 3.18"],
        correct_answer: "A", difficulty_level: "easy",
        explanation: "Pi (π) is approximately 3.14159, which rounds to 3.14."
      },
      {
        question_text: "If a shirt costs ₱500 and is on sale at 20% off, what is the sale price?",
        options: ["A) ₱400", "B) ₱380", "C) ₱450", "D) ₱480"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "20% of 500 = 100, so sale price = 500 - 100 = ₱400"
      },
      {
        question_text: "What is the least common multiple (LCM) of 6 and 8?",
        options: ["A) 12", "B) 24", "C) 48", "D) 16"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Multiples of 6: 6,12,18,24. Multiples of 8: 8,16,24. LCM = 24."
      },
      {
        question_text: "The sum of two numbers is 20 and their difference is 4. What are the numbers?",
        options: ["A) 10 and 10", "B) 12 and 8", "C) 14 and 6", "D) 16 and 4"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "x + y = 20, x - y = 4. Adding: 2x = 24, x = 12, y = 8."
      }
    ],
    science: [
      {
        question_text: "What is the largest organ in the human body?",
        options: ["A) Heart", "B) Liver", "C) Skin", "D) Brain"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "The skin is the body's largest organ, covering about 20 square feet."
      },
      {
        question_text: "Which planet is known as the Red Planet?",
        options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Mars appears red due to iron oxide (rust) on its surface."
      },
      {
        question_text: "What is the chemical symbol for water?",
        options: ["A) H2O", "B) CO2", "C) NaCl", "D) O2"],
        correct_answer: "A", difficulty_level: "easy",
        explanation: "Water consists of two hydrogen atoms and one oxygen atom: H2O."
      },
      {
        question_text: "What process do plants use to convert sunlight into energy?",
        options: ["A) Respiration", "B) Photosynthesis", "C) Transpiration", "D) Fermentation"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Photosynthesis converts sunlight, CO2, and water into glucose and oxygen."
      },
      {
        question_text: "What is the boiling point of water in Celsius?",
        options: ["A) 90°C", "B) 100°C", "C) 110°C", "D) 212°C"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure."
      },
      {
        question_text: "Which gas makes up the majority of Earth's atmosphere?",
        options: ["A) Oxygen", "B) Carbon dioxide", "C) Nitrogen", "D) Hydrogen"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere, oxygen about 21%."
      },
      {
        question_text: "What is the powerhouse of the cell?",
        options: ["A) Nucleus", "B) Ribosome", "C) Mitochondria", "D) Golgi body"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Mitochondria produce ATP through cellular respiration, powering the cell."
      },
      {
        question_text: "What type of energy is stored in a battery?",
        options: ["A) Kinetic energy", "B) Chemical energy", "C) Thermal energy", "D) Nuclear energy"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Batteries store chemical energy that is converted to electrical energy."
      },
      {
        question_text: "What is the function of red blood cells?",
        options: ["A) Fight infection", "B) Carry oxygen", "C) Clot blood", "D) Produce hormones"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Red blood cells contain hemoglobin which carries oxygen throughout the body."
      },
      {
        question_text: "What law states that for every action, there is an equal and opposite reaction?",
        options: ["A) Newton's First Law", "B) Newton's Second Law", "C) Newton's Third Law", "D) Law of Gravity"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Newton's Third Law: For every action force, there is an equal and opposite reaction force."
      }
    ],
    filipino: [
      {
        question_text: "Ano ang kahulugan ng salitang 'makata'?",
        options: ["A) Manunulat ng tula", "B) Manunulat ng nobela", "C) Manunulat ng dula", "D) Manunulat ng sanaysay"],
        correct_answer: "A", difficulty_level: "easy",
        explanation: "Ang makata ay tumutukoy sa manunulat o lumilikha ng tula."
      },
      {
        question_text: "Ano ang tamang baybay: 'Nakita ko _ siya kahapon.'",
        options: ["A) din", "B) rin", "C) ring", "D) ding"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Ginagamit ang 'rin' kapag ang sinusundang salita ay nagtatapos sa patinig."
      },
      {
        question_text: "Ano ang uri ng pangungusap: 'Ang ganda ng tanawin!'",
        options: ["A) Paturol", "B) Patanong", "C) Padamdam", "D) Pautos"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Ang pangungusap na padamdam ay nagpapahayag ng matinding damdamin."
      },
      {
        question_text: "Sino ang tinaguriang 'Ama ng Panitikang Filipino'?",
        options: ["A) Jose Rizal", "B) Francisco Balagtas", "C) Lope K. Santos", "D) Amado V. Hernandez"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Si Francisco 'Balagtas' Baltazar ang kinikilalang Ama ng Panitikang Filipino."
      },
      {
        question_text: "Ano ang aspekto ng pandiwa sa: 'Kumakain ako ngayon.'",
        options: ["A) Naganap", "B) Nagaganap", "C) Magaganap", "D) Pawatas"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Ang 'kumakain' ay nasa aspektong nagaganap (kasalukuyan)."
      }
    ],
    socialStudies: [
      {
        question_text: "Who was the first President of the Philippines?",
        options: ["A) Manuel L. Quezon", "B) Emilio Aguinaldo", "C) Jose P. Laurel", "D) Manuel Roxas"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Emilio Aguinaldo served as the first President of the Philippines from 1899-1901."
      },
      {
        question_text: "What is the supreme law of the Philippines?",
        options: ["A) Civil Code", "B) Republic Acts", "C) The 1987 Constitution", "D) Presidential Decrees"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The 1987 Constitution is the fundamental and supreme law of the land."
      },
      {
        question_text: "What are the three branches of the Philippine government?",
        options: ["A) Executive, Legislative, Judicial", "B) Military, Civil, Religious", "C) National, Regional, Local", "D) Administrative, Supervisory, Regulatory"],
        correct_answer: "A", difficulty_level: "easy",
        explanation: "The Philippine government has three co-equal branches: Executive, Legislative, and Judicial."
      },
      {
        question_text: "When is Philippine Independence Day celebrated?",
        options: ["A) July 4", "B) June 12", "C) August 21", "D) November 30"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "June 12, 1898 marks the declaration of Philippine independence from Spain."
      },
      {
        question_text: "What economic system is practiced in the Philippines?",
        options: ["A) Pure capitalism", "B) Pure communism", "C) Mixed economy", "D) Traditional economy"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The Philippines has a mixed economy with both private enterprise and government involvement."
      },
      {
        question_text: "Who is considered the national hero of the Philippines?",
        options: ["A) Andres Bonifacio", "B) Jose Rizal", "C) Apolinario Mabini", "D) Emilio Aguinaldo"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Dr. Jose Rizal is recognized as the national hero of the Philippines."
      },
      {
        question_text: "What is the term limit for the Philippine President?",
        options: ["A) 4 years, one term", "B) 6 years, two terms", "C) 6 years, one term", "D) 4 years, two terms"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The President serves a single 6-year term without reelection."
      },
      {
        question_text: "Which country colonized the Philippines for the longest period?",
        options: ["A) United States", "B) Japan", "C) Spain", "D) Great Britain"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Spain colonized the Philippines for 333 years (1565-1898)."
      }
    ]
  },
  
  professionalEducation: {
    childDevelopment: [
      {
        question_text: "According to Piaget, during which stage does a child develop object permanence?",
        options: ["A) Sensorimotor stage (0-2 years)", "B) Preoperational stage (2-7 years)", "C) Concrete operational stage (7-11 years)", "D) Formal operational stage (11+ years)"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "Object permanence develops during the sensorimotor stage, typically around 8-12 months."
      },
      {
        question_text: "Erikson's psychosocial crisis for adolescents is:",
        options: ["A) Trust vs. Mistrust", "B) Industry vs. Inferiority", "C) Identity vs. Role Confusion", "D) Intimacy vs. Isolation"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "During adolescence (12-18 years), individuals face identity versus role confusion."
      },
      {
        question_text: "What is the zone of proximal development according to Vygotsky?",
        options: ["A) What a child can do independently", "B) What a child cannot do at all", "C) What a child can do with guidance", "D) What a child will never learn"],
        correct_answer: "C", difficulty_level: "hard",
        explanation: "ZPD is the gap between what a learner can do alone and what they can do with help."
      },
      {
        question_text: "According to Kohlberg, at which level does a child follow rules to avoid punishment?",
        options: ["A) Pre-conventional", "B) Conventional", "C) Post-conventional", "D) Universal ethical"],
        correct_answer: "A", difficulty_level: "hard",
        explanation: "Pre-conventional morality (Stage 1) is based on obedience and punishment avoidance."
      },
      {
        question_text: "What attachment style describes infants who are distressed when the caregiver leaves but ambivalent upon return?",
        options: ["A) Secure attachment", "B) Avoidant attachment", "C) Anxious-ambivalent attachment", "D) Disorganized attachment"],
        correct_answer: "C", difficulty_level: "hard",
        explanation: "Anxious-ambivalent children show distress when separated and mixed reactions upon reunion."
      },
      {
        question_text: "At what age does the concrete operational stage typically begin according to Piaget?",
        options: ["A) 0-2 years", "B) 2-7 years", "C) 7-11 years", "D) 11+ years"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The concrete operational stage spans approximately ages 7 to 11."
      },
      {
        question_text: "Which theorist emphasized the role of social interaction in cognitive development?",
        options: ["A) Jean Piaget", "B) Lev Vygotsky", "C) B.F. Skinner", "D) Sigmund Freud"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Vygotsky's sociocultural theory emphasizes social interaction in learning."
      }
    ],
    teachingMethods: [
      {
        question_text: "Which teaching method emphasizes learning through experience and reflection?",
        options: ["A) Lecture method", "B) Experiential learning", "C) Direct instruction", "D) Rote memorization"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Experiential learning, advocated by David Kolb, involves learning through experience and reflection."
      },
      {
        question_text: "What is the primary goal of differentiated instruction?",
        options: ["A) Teaching all students the same way", "B) Adapting instruction to meet individual needs", "C) Separating students by ability", "D) Focusing only on advanced learners"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Differentiated instruction tailors teaching to accommodate different learning styles and needs."
      },
      {
        question_text: "What is cooperative learning?",
        options: ["A) Students working alone", "B) Students competing individually", "C) Students working in small groups", "D) Teacher-centered instruction"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Cooperative learning involves students working together in small groups toward shared goals."
      },
      {
        question_text: "Which teaching strategy uses questions to guide students to discover concepts?",
        options: ["A) Direct instruction", "B) Discovery learning", "C) Rote learning", "D) Drill and practice"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Discovery learning, advocated by Jerome Bruner, uses inquiry to help students discover principles."
      },
      {
        question_text: "What is the flipped classroom approach?",
        options: ["A) Students teach the teacher", "B) Lectures at home, activities in class", "C) No homework policy", "D) Outdoor learning only"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "In flipped classrooms, students watch lectures at home and do activities in class."
      },
      {
        question_text: "What type of questioning encourages higher-order thinking?",
        options: ["A) Factual recall questions", "B) Yes/No questions", "C) Open-ended questions", "D) Multiple choice only"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Open-ended questions require analysis, synthesis, and evaluation - higher-order thinking skills."
      }
    ],
    assessment: [
      {
        question_text: "What type of assessment is conducted DURING instruction to monitor learning?",
        options: ["A) Summative assessment", "B) Formative assessment", "C) Diagnostic assessment", "D) Placement assessment"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Formative assessment provides ongoing feedback during the learning process."
      },
      {
        question_text: "What is a rubric used for?",
        options: ["A) Timing tests", "B) Scoring criteria for assessments", "C) Seating arrangement", "D) Lesson planning"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "A rubric is a scoring guide used to evaluate performance based on specific criteria."
      },
      {
        question_text: "What type of test measures what a student has learned at the end of a unit?",
        options: ["A) Formative test", "B) Diagnostic test", "C) Summative test", "D) Placement test"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Summative assessment evaluates student learning at the end of an instructional unit."
      },
      {
        question_text: "What does 'validity' in assessment refer to?",
        options: ["A) Consistency of results", "B) The test measures what it intends to measure", "C) Ease of administration", "D) Cost of the test"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Validity refers to whether a test actually measures what it claims to measure."
      },
      {
        question_text: "What is a norm-referenced test?",
        options: ["A) Compares students to a fixed standard", "B) Compares students to each other", "C) Tests knowledge of norms", "D) Open-book examination"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Norm-referenced tests compare a student's performance against other students."
      }
    ],
    curriculumDevelopment: [
      {
        question_text: "What curriculum design does the Philippine K-12 program use?",
        options: ["A) Subject-centered design", "B) Spiral progression approach", "C) Core curriculum design", "D) Activity-centered design"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "The K-12 curriculum uses a spiral progression approach where concepts increase in complexity."
      },
      {
        question_text: "What is the first step in curriculum development?",
        options: ["A) Implementation", "B) Evaluation", "C) Needs assessment", "D) Material selection"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Curriculum development begins with assessing the needs of learners and society."
      },
      {
        question_text: "Who is considered the father of modern curriculum theory?",
        options: ["A) John Dewey", "B) Ralph Tyler", "C) Hilda Taba", "D) Franklin Bobbitt"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Ralph Tyler developed the Tyler Rationale, a foundational framework for curriculum development."
      },
      {
        question_text: "What principle states that curriculum should be relevant to learners' lives?",
        options: ["A) Principle of integration", "B) Principle of utility", "C) Principle of sequence", "D) Principle of balance"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "The principle of utility emphasizes that curriculum content should be useful and applicable."
      }
    ],
    educationalTechnology: [
      {
        question_text: "Which of the following is an example of synchronous learning?",
        options: ["A) Watching pre-recorded lectures", "B) Reading online modules", "C) Live video conferencing classes", "D) Downloading learning materials"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Synchronous learning happens in real-time, like live video conferences."
      },
      {
        question_text: "What does LMS stand for?",
        options: ["A) Learning Module System", "B) Learning Management System", "C) Lesson Management Software", "D) Learner Monitoring System"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "LMS (Learning Management System) is software for delivering and tracking educational courses."
      },
      {
        question_text: "What is the SAMR model used for?",
        options: ["A) Classroom management", "B) Technology integration evaluation", "C) Student assessment", "D) Curriculum planning"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "SAMR (Substitution, Augmentation, Modification, Redefinition) evaluates technology integration levels."
      },
      {
        question_text: "Which tool is best for creating interactive presentations?",
        options: ["A) Microsoft Word", "B) Google Docs", "C) Nearpod", "D) Notepad"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Nearpod allows teachers to create interactive presentations with polls, quizzes, and activities."
      }
    ],
    foundationsOfEducation: [
      {
        question_text: "The 1987 Philippine Constitution mandates that the state shall assign the highest budgetary priority to:",
        options: ["A) National defense", "B) Education", "C) Infrastructure", "D) Healthcare"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Article XIV, Section 5(5) of the 1987 Constitution prioritizes education in national budget allocation."
      },
      {
        question_text: "What philosophy of education emphasizes learning through experience and problem-solving?",
        options: ["A) Idealism", "B) Realism", "C) Pragmatism", "D) Existentialism"],
        correct_answer: "C", difficulty_level: "hard",
        explanation: "Pragmatism (Dewey) focuses on learning through practical experience and problem-solving."
      },
      {
        question_text: "What is the primary purpose of education according to the Philippine Constitution?",
        options: ["A) To produce workers", "B) To develop moral character and civic conscience", "C) To generate income", "D) To promote competition"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Education aims to develop moral character, personal discipline, and civic conscience."
      },
      {
        question_text: "Who is known as the 'Father of Philippine Education'?",
        options: ["A) Jose Rizal", "B) Andres Bonifacio", "C) Rafael Palma", "D) Manuel Quezon"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "Jose Rizal advocated for education as a tool for national development and reform."
      },
      {
        question_text: "What principle ensures that education is accessible to all Filipinos?",
        options: ["A) Academic freedom", "B) Democratic access", "C) Meritocracy", "D) Privatization"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "Democratic access to education ensures all Filipinos have equal educational opportunities."
      }
      
    ]
    
  },

  specializations: {
    mathematics: [
      {
        question_text: "What is the derivative of f(x) = x²?",
        options: ["A) 2x", "B) x²", "C) 2", "D) 2x²"],
        correct_answer: "A", difficulty_level: "easy",
        explanation: "Using the power rule: d/dx(x²) = 2x"
      },
      {
        question_text: "What is the quadratic formula?",
        options: ["A) x = -b ± √(b² - 4ac) / 2a", "B) x = -b ± √(b² + 4ac) / 2a", "C) x = b ± √(b² - 4ac) / 2a", "D) x = -b ± √(4ac - b²) / 2a"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "The quadratic formula solves ax² + bx + c = 0"
      },
      {
        question_text: "What is the value of sin(90°)?",
        options: ["A) 0", "B) 0.5", "C) 1", "D) undefined"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "sin(90°) = 1, as it's the maximum value of the sine function."
      },
      {
        question_text: "What is the Pythagorean theorem?",
        options: ["A) a + b = c", "B) a² + b² = c²", "C) a² - b² = c²", "D) a × b = c"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
      },
      {
        question_text: "What is the integral of 2x dx?",
        options: ["A) x² + C", "B) 2x² + C", "C) x² + 2C", "D) 2x + C"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "∫2x dx = x² + C using the power rule for integration."
      },
      {
        question_text: "In how many ways can 5 books be arranged on a shelf?",
        options: ["A) 25", "B) 60", "C) 120", "D) 3125"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120 different arrangements."
      },
      {
        question_text: "What is the slope of a line perpendicular to y = 2x + 3?",
        options: ["A) 2", "B) -2", "C) 1/2", "D) -1/2"],
        correct_answer: "D", difficulty_level: "hard",
        explanation: "Perpendicular lines have slopes that are negative reciprocals. Slope of given line is 2, so perpendicular slope is -1/2."
      },
      {
        question_text: "What is the mean of the numbers: 4, 8, 6, 10, 12?",
        options: ["A) 6", "B) 7", "C) 8", "D) 10"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Mean = (4 + 8 + 6 + 10 + 12) ÷ 5 = 40 ÷ 5 = 8"
      },
      {
        question_text: "What type of triangle has sides 3, 4, and 5?",
        options: ["A) Equilateral", "B) Isosceles", "C) Right scalene", "D) Obtuse"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "3² + 4² = 9 + 16 = 25 = 5², so it's a right triangle with all sides different."
      },
      {
        question_text: "What is the domain of f(x) = √(x - 2)?",
        options: ["A) All real numbers", "B) x ≥ 2", "C) x > 2", "D) x ≤ 2"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "The expression under a square root must be ≥ 0, so x - 2 ≥ 0, meaning x ≥ 2."
      }
    ],
    science: [
      {
        question_text: "What is Newton's First Law of Motion?",
        options: ["A) F = ma", "B) Action-Reaction", "C) Law of Inertia", "D) Law of Gravity"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Newton's First Law states that an object at rest stays at rest unless acted upon by an external force."
      },
      {
        question_text: "What is the pH of a neutral solution?",
        options: ["A) 0", "B) 7", "C) 14", "D) 1"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "A neutral solution has a pH of 7, like pure water."
      },
      {
        question_text: "What is the process of cell division that produces gametes?",
        options: ["A) Mitosis", "B) Meiosis", "C) Binary fission", "D) Budding"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Meiosis produces gametes (sperm and egg cells) with half the chromosome number."
      },
      {
        question_text: "What is the chemical formula for sulfuric acid?",
        options: ["A) HCl", "B) HNO₃", "C) H₂SO₄", "D) H₃PO₄"],
        correct_answer: "C", difficulty_level: "hard",
        explanation: "Sulfuric acid is H₂SO₄, a strong acid used in many industrial processes."
      },
      {
        question_text: "Which organelle is responsible for protein synthesis?",
        options: ["A) Mitochondria", "B) Ribosomes", "C) Golgi body", "D) Lysosomes"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Ribosomes are the site of protein synthesis in cells."
      },
      {
        question_text: "What is the unit of electric current?",
        options: ["A) Volt", "B) Watt", "C) Ampere", "D) Ohm"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "The ampere (A) is the SI unit of electric current."
      },
      {
        question_text: "What type of bond involves the sharing of electrons?",
        options: ["A) Ionic bond", "B) Covalent bond", "C) Metallic bond", "D) Hydrogen bond"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Covalent bonds form when atoms share electron pairs."
      },
      {
        question_text: "What is the largest planet in our solar system?",
        options: ["A) Saturn", "B) Neptune", "C) Jupiter", "D) Uranus"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Jupiter is the largest planet, with a diameter of about 143,000 km."
      },
      {
        question_text: "What process converts glucose to ATP in cells?",
        options: ["A) Photosynthesis", "B) Cellular respiration", "C) Fermentation", "D) Diffusion"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Cellular respiration breaks down glucose to produce ATP energy."
      },
      {
        question_text: "What law states that matter cannot be created or destroyed?",
        options: ["A) Law of Conservation of Energy", "B) Law of Conservation of Mass", "C) Law of Definite Proportions", "D) Boyle's Law"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "The Law of Conservation of Mass states matter is neither created nor destroyed in chemical reactions."
      }
    ],
    english: [
      {
        question_text: "What is a gerund?",
        options: ["A) A verb form ending in -ing used as a noun", "B) A verb form ending in -ed", "C) An adjective ending in -ing", "D) A past tense verb"],
        correct_answer: "A", difficulty_level: "medium",
        explanation: "A gerund is a verb form ending in -ing that functions as a noun (e.g., 'Swimming is fun')."
      },
      {
        question_text: "Identify the figure of speech: 'The wind whispered through the trees.'",
        options: ["A) Simile", "B) Metaphor", "C) Personification", "D) Hyperbole"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Personification gives human qualities to non-human things (wind can't actually whisper)."
      },
      {
        question_text: "What is the rhyme scheme of a Shakespearean sonnet?",
        options: ["A) ABAB CDCD EFEF GG", "B) ABBA ABBA CDE CDE", "C) AABB CCDD EEFF GG", "D) ABAB BCBC CDCD EE"],
        correct_answer: "A", difficulty_level: "hard",
        explanation: "Shakespearean sonnets have 3 quatrains and a couplet: ABAB CDCD EFEF GG."
      },
      {
        question_text: "Which is an example of a complex sentence?",
        options: ["A) I went to the store.", "B) I went to the store, and I bought milk.", "C) When I went to the store, I bought milk.", "D) Go to the store!"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "A complex sentence has an independent clause and at least one dependent clause."
      },
      {
        question_text: "What is the purpose of a thesis statement?",
        options: ["A) To conclude the essay", "B) To state the main argument", "C) To provide background information", "D) To list references"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "A thesis statement presents the main argument or claim of an essay."
      },
      {
        question_text: "Which word is an adverb in: 'She quickly ran to the store'?",
        options: ["A) She", "B) quickly", "C) ran", "D) store"],
        correct_answer: "B", difficulty_level: "easy",
        explanation: "'Quickly' modifies the verb 'ran', making it an adverb."
      },
      {
        question_text: "What literary device is used in: 'It was the best of times, it was the worst of times'?",
        options: ["A) Simile", "B) Antithesis", "C) Onomatopoeia", "D) Alliteration"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Antithesis juxtaposes contrasting ideas in parallel structure."
      },
      {
        question_text: "What is the function of a semicolon?",
        options: ["A) To end a sentence", "B) To separate items in a list", "C) To join related independent clauses", "D) To introduce a quote"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "A semicolon joins two closely related independent clauses without a conjunction."
      }
    ],
    filipino: [
      {
        question_text: "Sino ang sumulat ng 'Florante at Laura'?",
        options: ["A) Jose Rizal", "B) Francisco Balagtas", "C) Lope K. Santos", "D) Amado V. Hernandez"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Si Francisco 'Balagtas' Baltazar ang sumulat ng Florante at Laura."
      },
      {
        question_text: "Ano ang ibig sabihin ng idyomang 'nagbibilang ng poste'?",
        options: ["A) Naghahanap ng trabaho", "B) Walang trabaho", "C) Naglalakad lang", "D) Tamad"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "Ang 'nagbibilang ng poste' ay nangangahulugang walang trabaho o walang ginagawa."
      },
      {
        question_text: "Ano ang tamang gamit ng 'ng' at 'nang'?",
        options: ["A) 'Ng' para sa pang-uri, 'nang' para sa pang-abay", "B) 'Ng' bilang pananda ng layon, 'nang' para sa pang-abay", "C) Pareho lang ang gamit", "D) 'Ng' para sa pandiwa, 'nang' para sa pangngalan"],
        correct_answer: "B", difficulty_level: "hard",
        explanation: "'Ng' ay ginagamit bilang pananda ng layon; 'nang' ay para sa pang-abay o paulit-ulit na kilos."
      },
      {
        question_text: "Ano ang uri ng panitikan ang 'Noli Me Tangere'?",
        options: ["A) Tula", "B) Dula", "C) Nobela", "D) Sanaysay"],
        correct_answer: "C", difficulty_level: "easy",
        explanation: "Ang Noli Me Tangere ay isang nobelang isinulat ni Dr. Jose Rizal."
      },
      {
        question_text: "Ano ang kaantasan ng pang-uri sa: 'Siya ang pinakamagaling sa klase'?",
        options: ["A) Lantay", "B) Pahambing", "C) Pasukdol", "D) Pantay"],
        correct_answer: "C", difficulty_level: "medium",
        explanation: "Ang 'pinakamagaling' ay nasa kaantasang pasukdol (superlatibo)."
      },
      {
        question_text: "Ano ang tawag sa mga salitang magkasalungat?",
        options: ["A) Sinonimo", "B) Antonimo", "C) Homonym", "D) Akronim"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "Ang antonimo ay mga salitang magkasalungat ang kahulugan."
      }
    ],
    socialStudies: [
      {
        question_text: "What was the main purpose of the EDSA People Power Revolution?",
        options: ["A) Economic reform", "B) To restore democracy", "C) Land reform", "D) Educational reform"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "The 1986 EDSA Revolution aimed to restore democracy and end the Marcos dictatorship."
      },
      {
        question_text: "What is the primary function of the Bangko Sentral ng Pilipinas?",
        options: ["A) Tax collection", "B) Monetary policy and currency issuance", "C) Foreign affairs", "D) Education regulation"],
        correct_answer: "B", difficulty_level: "medium",
        explanation: "BSP is responsible for monetary policy, issuing currency, and maintaining price stability."
      },
      {
        question_text: "Which treaty ended the Spanish-American War and ceded the Philippines to the US?",
        options: ["A) Treaty of Paris 1898", "B) Treaty of Versailles", "C) Treaty of Tordesillas", "D) Treaty of Manila"],
        correct_answer: "A", difficulty_level: "hard",
        explanation: "The Treaty of Paris (1898) ended the Spanish-American War and Spain ceded the Philippines to the US for $20 million."
      },
      {
        question_text: "What is the difference between GNP and GDP?",
        options: ["A) GNP includes foreign production by citizens", "B) GDP includes imports", "C) GNP is always larger", "D) There is no difference"],
        correct_answer: "A", difficulty_level: "hard",
        explanation: "GNP includes income earned by citizens abroad, while GDP measures production within the country."
      },
      {
        question_text: "What is the Regalian Doctrine?",
        options: ["A) All lands belong to the State", "B) Separation of church and state", "C) Civil service eligibility", "D) Educational autonomy"],
        correct_answer: "A", difficulty_level: "hard",
        explanation: "The Regalian Doctrine states that all lands of the public domain belong to the State."
      }
    ]
  }
};

class AdaptiveQuizGenerator {
  constructor() {
    this.questionBank = questionBank;
  }

  generateAdaptiveQuiz(domain, weakSubtopics = [], questionCount = 20, specialization = null) {
    let availableQuestions = [];
    
    if (domain === 'generalEducation' && this.questionBank.generalEducation) {
      Object.values(this.questionBank.generalEducation).forEach(qs => {
        availableQuestions = [...availableQuestions, ...qs];
      });
    } else if (domain === 'professionalEducation' && this.questionBank.professionalEducation) {
      Object.values(this.questionBank.professionalEducation).forEach(qs => {
        availableQuestions = [...availableQuestions, ...qs];
      });
    } else if (domain === 'specialization' && specialization && this.questionBank.specializations?.[specialization]) {
      availableQuestions = this.questionBank.specializations[specialization];
    }

    if (availableQuestions.length === 0) return [];

    // Prioritize weak areas
    let selectedQuestions = [];
    if (weakSubtopics.length > 0) {
      const priorityQuestions = availableQuestions.filter(q => 
        weakSubtopics.some(weak => q.question_text.toLowerCase().includes(weak.toLowerCase()))
      );
      selectedQuestions = [...priorityQuestions];
    }

    // Shuffle and fill remaining
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    for (const q of shuffled) {
      if (selectedQuestions.length >= questionCount) break;
      if (!selectedQuestions.find(sq => sq.question_text === q.question_text)) {
        selectedQuestions.push(q);
      }
    }

    return selectedQuestions.slice(0, questionCount);
  }

  analyzeResults(answers, questions) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = (correctAnswers / answers.length) * 100;
    return {
      score,
      correctCount: correctAnswers,
      totalQuestions: answers.length,
      passed: score >= 75
    };
  }
}

module.exports = { questionBank, AdaptiveQuizGenerator };