// import { useState } from "react";
// import "./App.css";

// import jobDescriptions from "./data/jobDescriptions.json";

// /* =========================================================
//    ADDITIONAL SKILLS
//    These are used to detect skills that may appear in the
//    job descriptions even when they are not explicitly present
//    in the JSON skill list.
// ========================================================= */

// const SKILL_CATEGORIES = {
//   Programming: [
//     "Python",
//     "Java",
//     "JavaScript",
//     "TypeScript",
//     "C++",
//     "C#",
//     "PHP",
//     "R",
//   ],

//   "Web Development": [
//     "HTML",
//     "CSS",
//     "React",
//     "Angular",
//     "Node.js",
//     "Vue.js",
//     "Bootstrap",
//     "Frontend Development",
//     "Backend Development",
//     "API",
//   ],

//   Database: [
//     "SQL",
//     "MySQL",
//     "PostgreSQL",
//     "MongoDB",
//     "Oracle",
//     "SQLite",
//     "Database",
//     "Database Design",
//     "Relational Database",
//     "Database Development",
//     "Query Optimization",
//   ],

//   "BI & Analytics": [
//     "Power BI",
//     "Tableau",
//     "Excel",
//     "DAX",
//     "Power Query",
//     "Data Analysis",
//     "Data Visualization",
//     "Statistics",
//     "Business Intelligence",
//     "Reporting",
//     "Dashboards",
//     "Social Media Analytics",
//   ],

//   Cloud: [
//     "AWS",
//     "Azure",
//     "Google Cloud",
//     "GCP",
//   ],

//   "AI & Machine Learning": [
//     "Machine Learning",
//     "Deep Learning",
//     "Artificial Intelligence",
//     "TensorFlow",
//     "PyTorch",
//     "Scikit-learn",
//   ],

//   NLP: [
//     "NLP",
//     "Natural Language Processing",
//     "BERT",
//     "Transformers",
//     "spaCy",
//     "NLTK",
//   ],

//   DevOps: [
//     "Docker",
//     "Kubernetes",
//     "Git",
//     "GitHub",
//     "Jenkins",
//   ],

//   Testing: [
//     "Software Testing",
//     "Quality Assurance",
//     "Automation Testing",
//     "Test Automation",
//     "Test Scripts",
//     "Testing Frameworks",
//     "Bug Tracking",
//     "Test Case Design",
//   ],

//   Networking: [
//     "Networking",
//     "Wireless Networking",
//     "Network Troubleshooting",
//     "Network Monitoring",
//   ],

//   Cybersecurity: [
//     "Cybersecurity",
//     "Network Security",
//     "Data Security",
//     "Threat Detection",
//     "Incident Response",
//     "Database Security",
//   ],

//   Marketing: [
//     "Social Media",
//     "Content Creation",
//   ],

//   "Data Engineering": [
//     "Data Architecture",
//     "Data Infrastructure",
//     "Data Management",
//   ],
// };

// /* =========================================================
//    ALIASES
// ========================================================= */

// const ALIASES = {
//   python3: "Python",
//   "python 3": "Python",
//   "python programming": "Python",

//   powerbi: "Power BI",
//   "power bi": "Power BI",

//   postgres: "PostgreSQL",
//   postgresql: "PostgreSQL",

//   js: "JavaScript",

//   ml: "Machine Learning",

//   ai: "Artificial Intelligence",

//   "natural language processing": "NLP",

//   sklearn: "Scikit-learn",
//   "scikit learn": "Scikit-learn",

//   "front end": "Frontend Development",
//   frontend: "Frontend Development",

//   "back end": "Backend Development",
//   backend: "Backend Development",

//   "social media": "Social Media",
//   "content creation": "Content Creation",
// };

// /* =========================================================
//    SAMPLE TEXT
// ========================================================= */

// const SAMPLE_TEXT = `
// Looking for a Data Analyst with strong experience in Python,
// SQL, Power BI and Excel.

// The candidate should have experience in data analysis,
// data visualization, statistics and Power Query.

// Knowledge of Tableau and Machine Learning is an additional advantage.
// `;

// /* =========================================================
//    NORMALIZE TEXT
// ========================================================= */

// function normalizeText(text) {
//   return text
//     .toLowerCase()
//     .replace(/\be\.?g\.?,?\s*/gi, "")
//     .replace(/[“”‘’]/g, "'")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// /* =========================================================
//    GET CATEGORY
// ========================================================= */

// function getCategory(skill) {
//   for (const [category, skills] of Object.entries(
//     SKILL_CATEGORIES
//   )) {
//     if (
//       skills.some(
//         (item) =>
//           item.toLowerCase() === skill.toLowerCase()
//       )
//     ) {
//       return category;
//     }
//   }

//   return "Other";
// }

// /* =========================================================
//    ESCAPE REGEX
// ========================================================= */

// function escapeRegex(text) {
//   return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// /* =========================================================
//    CHECK WHETHER TEXT CONTAINS SKILL
// ========================================================= */

// function containsSkill(text, skill) {
//   const escapedSkill = escapeRegex(
//     skill.toLowerCase()
//   );

//   const pattern = new RegExp(
//     `(^|[^a-zA-Z0-9+#])${escapedSkill}([^a-zA-Z0-9+#]|$)`,
//     "i"
//   );

//   return pattern.test(text);
// }

// /* =========================================================
//    EXTRACT SKILLS FROM JSON + SKILL DICTIONARY
// ========================================================= */

// function extractSkills(text) {
//   if (!text.trim()) {
//     return [];
//   }

//   const cleanedText = normalizeText(text);

//   /*
//     Collect all skills from JSON
//   */

//   const jsonSkills = [];

//   jobDescriptions.forEach((job) => {
//     if (Array.isArray(job.skills)) {
//       job.skills.forEach((skill) => {
//         if (!jsonSkills.includes(skill)) {
//           jsonSkills.push(skill);
//         }
//       });
//     }
//   });

//   /*
//     Collect all skills from category dictionary
//   */

//   const categorySkills = Object.values(
//     SKILL_CATEGORIES
//   ).flat();

//   /*
//     Combine JSON + category skills
//   */

//   const allSkills = [
//     ...new Set([
//       ...jsonSkills,
//       ...categorySkills,
//       ...Object.keys(ALIASES),
//     ]),
//   ];

//   /*
//     Check longer skills first.
//     Example:
//     "Machine Learning" before "Learning"
//   */

//   const sortedSkills = allSkills.sort(
//     (a, b) => b.length - a.length
//   );

//   const detected = [];

//   sortedSkills.forEach((skill) => {
//     if (containsSkill(cleanedText, skill)) {
//       const canonical =
//         ALIASES[skill.toLowerCase()] || skill;

//       if (!detected.includes(canonical)) {
//         detected.push(canonical);
//       }
//     }
//   });

//   return detected;
// }

// /* =========================================================
//    GET CLASSIFICATION
// ========================================================= */

// function getClassification(skills) {
//   const result = {};

//   skills.forEach((skill) => {
//     result[skill] = getCategory(skill);
//   });

//   /*
//     Also check JSON classification
//   */

//   jobDescriptions.forEach((job) => {
//     if (job.classification) {
//       Object.entries(job.classification).forEach(
//         ([skill, category]) => {
//           if (
//             skills.some(
//               (detectedSkill) =>
//                 detectedSkill.toLowerCase() ===
//                 skill.toLowerCase()
//             )
//           ) {
//             result[skill] = category;
//           }
//         }
//       );
//     }
//   });

//   return result;
// }

// /* =========================================================
//    MAIN APP
// ========================================================= */

// function App() {
//   const [jobDescription, setJobDescription] =
//     useState(SAMPLE_TEXT);

//   const [skills, setSkills] = useState([]);

//   const [darkMode, setDarkMode] = useState(false);

//   const [activePage, setActivePage] =
//     useState("extractor");

//   const [loading, setLoading] = useState(false);

//   const handleExtract = () => {
//     if (!jobDescription.trim()) {
//       alert("Please enter a job description.");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       const result = extractSkills(
//         jobDescription
//       );

//       setSkills(result);

//       setLoading(false);
//     }, 500);
//   };

//   const handleClear = () => {
//     setJobDescription("");
//     setSkills([]);
//   };

//   /* =======================================================
//      CATEGORIES
//   ======================================================= */

//   const categories = [
//     ...new Set(
//       skills.map((skill) =>
//         getCategory(skill)
//       )
//     ),
//   ];

//   /* =======================================================
//      WORD COUNT
//   ======================================================= */

//   const wordCount = jobDescription.trim()
//     ? jobDescription
//         .trim()
//         .split(/\s+/)
//         .filter(Boolean).length
//     : 0;

//   /* =======================================================
//      MATCH SCORE
//   ======================================================= */

//   const matchScore =
//     skills.length === 0
//       ? 0
//       : Math.min(
//           100,
//           60 + skills.length * 5
//         );

//   /* =======================================================
//      CATEGORY COUNT
//   ======================================================= */

//   const categoryCount = {};

//   skills.forEach((skill) => {
//     const category = getCategory(skill);

//     categoryCount[category] =
//       (categoryCount[category] || 0) + 1;
//   });

//   /* =======================================================
//      CLASSIFICATION
//   ======================================================= */

//   const classification =
//     getClassification(skills);

//   return (
//     <div
//       className={
//         darkMode
//           ? "app dark"
//           : "app"
//       }
//     >
//       {/* ===================================================
//           SIDEBAR
//       =================================================== */}

//       <aside className="sidebar">
//         <div className="logo">
//           <div className="logo-icon">
//             🎯
//           </div>

//           <div>
//             <h2>Skills</h2>
//             <span>
//               Job Skill Extractor
//             </span>
//           </div>
//         </div>

//         <div className="nav">
//           <button
//             className={
//               activePage === "extractor"
//                 ? "nav-item active"
//                 : "nav-item"
//             }
//             onClick={() =>
//               setActivePage(
//                 "extractor"
//               )
//             }
//           >
//             <span>🔍</span>
//             Skill Extractor
//           </button>

//           <button
//             className={
//               activePage === "analytics"
//                 ? "nav-item active"
//                 : "nav-item"
//             }
//             onClick={() =>
//               setActivePage(
//                 "analytics"
//               )
//             }
//           >
//             <span>📊</span>
//             Analytics
//           </button>

//           <button
//             className={
//               activePage === "about"
//                 ? "nav-item active"
//                 : "nav-item"
//             }
//             onClick={() =>
//               setActivePage("about")
//             }
//           >
//             <span>ℹ️</span>
//             About Project
//           </button>
//         </div>

//         <div className="sidebar-bottom">
//           <div className="dataset-status">
//             <div className="status-dot"></div>

//             <div>
//               <strong>
//                 Dataset Connected
//               </strong>

//               <small>
//                 jobDescriptions.json
//               </small>
//             </div>
//           </div>

//           <button
//             className="theme-button"
//             onClick={() =>
//               setDarkMode(!darkMode)
//             }
//           >
//             {darkMode
//               ? "☀️ Light Mode"
//               : "🌙 Dark Mode"}
//           </button>
//         </div>
//       </aside>

//       {/* ===================================================
//           MAIN
//       =================================================== */}

//       <main className="main">

//         {/* HEADER */}

//         <header className="topbar">
//           <div>
//             <h1>
//               Job Skill Extractor
//             </h1>

//             <p className="subtitle">
//               Extract and categorize
//               technical skills from job
//               descriptions instantly.
//             </p>
//           </div>
//         </header>

//         {/* =================================================
//             EXTRACTOR PAGE
//         ================================================= */}

//         {activePage === "extractor" && (
//           <>
//             {/* INPUT */}

//             <section className="card input-card">
//               <div className="card-header">
//                 <div>
//                   <h2>
//                     Job Description
//                   </h2>

//                   <p>
//                     Paste a job description
//                     to identify required
//                     technical skills.
//                   </p>
//                 </div>
//               </div>

//               <textarea
//                 value={jobDescription}
//                 onChange={(e) =>
//                   setJobDescription(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Paste job description here..."
//               />

//               <div className="input-footer">
//                 <span>
//                   {wordCount} words
//                 </span>

//                 <div className="actions">
//                   <button
//                     className="secondary-button"
//                     onClick={
//                       handleClear
//                     }
//                   >
//                     Clear
//                   </button>

//                   <button
//                     className="primary-button"
//                     onClick={
//                       handleExtract
//                     }
//                   >
//                     {loading
//                       ? "Analyzing..."
//                       : "🔍 Extract Skills"}
//                   </button>
//                 </div>
//               </div>
//             </section>

//             {/* =================================================
//                 KPI
//             ================================================= */}

//             <section className="kpi-grid">

//               <div className="kpi">
//                 <div className="kpi-icon blue">
//                   🎯
//                 </div>

//                 <div>
//                   <span>
//                     Skills Detected
//                   </span>

//                   <strong>
//                     {skills.length}
//                   </strong>
//                 </div>
//               </div>

//               <div className="kpi">
//                 <div className="kpi-icon purple">
//                   📂
//                 </div>

//                 <div>
//                   <span>
//                     Categories
//                   </span>

//                   <strong>
//                     {categories.length}
//                   </strong>
//                 </div>
//               </div>

//               <div className="kpi">
//                 <div className="kpi-icon green">
//                   📝
//                 </div>

//                 <div>
//                   <span>
//                     Words Analyzed
//                   </span>

//                   <strong>
//                     {wordCount}
//                   </strong>
//                 </div>
//               </div>

//               <div className="kpi">
//                 <div className="kpi-icon orange">
//                   ⚡
//                 </div>

//                 <div>
//                   <span>
//                     Match Score
//                   </span>

//                   <strong>
//                     {matchScore}%
//                   </strong>
//                 </div>
//               </div>

//             </section>

//             {/* =================================================
//                 RESULT GRID
//             ================================================= */}

//             <section className="result-grid">

//               {/* DETECTED SKILLS */}

//               <div className="card">
//                 <div className="card-header">
//                   <div>
//                     <h2>
//                       Detected Skills
//                     </h2>

//                     <p>
//                       Normalized skills
//                       identified from the
//                       job description.
//                     </p>
//                   </div>

//                   <span className="count-badge">
//                     {skills.length}
//                   </span>
//                 </div>

//                 {skills.length === 0 ? (
//                   <div className="empty">
//                     <div className="empty-icon">
//                       🔍
//                     </div>

//                     <h3>
//                       No skills detected
//                     </h3>

//                     <p>
//                       Enter a job
//                       description and
//                       click Extract
//                       Skills.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="skills">
//                     {skills.map(
//                       (skill) => (
//                         <div
//                           className="skill"
//                           key={skill}
//                         >
//                           ✓ {skill}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* CATEGORY */}

//               <div className="card">
//                 <div className="card-header">
//                   <div>
//                     <h2>
//                       Skill Categories
//                     </h2>

//                     <p>
//                       Technology
//                       classification.
//                     </p>
//                   </div>
//                 </div>

//                 {skills.length === 0 ? (
//                   <div className="empty small">
//                     <div className="empty-icon">
//                       📊
//                     </div>

//                     <p>
//                       Category analysis
//                       will appear here.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="category-list">
//                     {Object.entries(
//                       categoryCount
//                     ).map(
//                       ([
//                         category,
//                         count,
//                       ]) => (
//                         <div
//                           className="category-row"
//                           key={category}
//                         >
//                           <div className="category-name">
//                             <span className="category-dot">
//                               ●
//                             </span>

//                             {category}
//                           </div>

//                           <div className="category-count">
//                             {count}
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* =================================================
//                 SKILL CLASSIFICATION
//             ================================================= */}

//             <section className="card">

//               <div className="card-header">
//                 <div>
//                   <h2>
//                     Skill Classification
//                   </h2>

//                   <p>
//                     Detected technologies
//                     mapped to their
//                     categories.
//                   </p>
//                 </div>
//               </div>

//               {skills.length > 0 ? (
//                 <div className="table-wrapper">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Skill</th>
//                         <th>
//                           Category
//                         </th>
//                         <th>
//                           Status
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {skills.map(
//                         (
//                           skill,
//                           index
//                         ) => (
//                           <tr
//                             key={skill}
//                           >
//                             <td>
//                               {String(
//                                 index +
//                                   1
//                               ).padStart(
//                                 2,
//                                 "0"
//                               )}
//                             </td>

//                             <td>
//                               <strong>
//                                 {skill}
//                               </strong>
//                             </td>

//                             <td>
//                               <span className="category-tag">
//                                 {classification[
//                                   skill
//                                 ] ||
//                                   getCategory(
//                                     skill
//                                   )}
//                               </span>
//                             </td>

//                             <td>
//                               <span className="detected">
//                                 ✓ Detected
//                               </span>
//                             </td>
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="table-empty">
//                   Run skill extraction to
//                   see results.
//                 </div>
//               )}
//             </section>

//             {/* =================================================
//                 RECOMMENDATIONS
//             ================================================= */}

//             {skills.length > 0 && (
//               <section className="card recommendations">

//                 <div className="card-header">
//                   <div>
//                     <h2>
//                       💡 Technology
//                       Recommendations
//                     </h2>

//                     <p>
//                       Technologies related
//                       to the detected skill
//                       set.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="recommendation-grid">

//                   {skills.includes(
//                     "Python"
//                   ) && (
//                     <div className="recommendation">
//                       <span>🐍</span>

//                       <div>
//                         <strong>
//                           Python Ecosystem
//                         </strong>

//                         <small>
//                           Pandas • NumPy •
//                           Matplotlib
//                         </small>
//                       </div>
//                     </div>
//                   )}

//                   {skills.includes(
//                     "SQL"
//                   ) && (
//                     <div className="recommendation">
//                       <span>🗄️</span>

//                       <div>
//                         <strong>
//                           Database
//                         </strong>

//                         <small>
//                           MySQL •
//                           PostgreSQL •
//                           SQL Server
//                         </small>
//                       </div>
//                     </div>
//                   )}

//                   {skills.includes(
//                     "Power BI"
//                   ) && (
//                     <div className="recommendation">
//                       <span>📊</span>

//                       <div>
//                         <strong>
//                           Power BI Stack
//                         </strong>

//                         <small>
//                           DAX • Power Query •
//                           Data Modeling
//                         </small>
//                       </div>
//                     </div>
//                   )}

//                   {skills.includes(
//                     "Machine Learning"
//                   ) && (
//                     <div className="recommendation">
//                       <span>🤖</span>

//                       <div>
//                         <strong>
//                           Machine Learning
//                         </strong>

//                         <small>
//                           Scikit-learn •
//                           Pandas • NumPy
//                         </small>
//                       </div>
//                     </div>
//                   )}

//                 </div>
//               </section>
//             )}
//           </>
//         )}

//         {/* =================================================
//             ANALYTICS
//         ================================================= */}

//         {activePage === "analytics" && (
//           <section>

//             <div className="page-title">
//               <p className="eyebrow">
//                 DATA INSIGHTS
//               </p>

//               <h2>
//                 Skill Analytics
//               </h2>

//               <p>
//                 Analyze the skills detected
//                 from the current job
//                 description.
//               </p>
//             </div>

//             <div className="analytics-grid">

//               {Object.entries(
//                 categoryCount
//               ).map(
//                 (
//                   [category, count]
//                 ) => {

//                   const percentage =
//                     skills.length
//                       ? Math.round(
//                           (count /
//                             skills.length) *
//                             100
//                         )
//                       : 0;

//                   return (
//                     <div
//                       className="analytics-card"
//                       key={category}
//                     >

//                       <div className="analytics-top">

//                         <strong>
//                           {category}
//                         </strong>

//                         <span>
//                           {count} skills
//                         </span>

//                       </div>

//                       <div className="progress">

//                         <div
//                           className="progress-bar"
//                           style={{
//                             width: `${percentage}%`,
//                           }}
//                         ></div>

//                       </div>

//                       <small>
//                         {percentage}% of
//                         detected skills
//                       </small>

//                     </div>
//                   );
//                 }
//               )}

//             </div>

//             {skills.length === 0 && (
//               <div className="analytics-empty">

//                 <div>
//                   📊
//                 </div>

//                 <h3>
//                   No analytics available
//                 </h3>

//                 <p>
//                   Extract skills first to
//                   generate analytics.
//                 </p>

//               </div>
//             )}

//           </section>
//         )}

//         {/* =================================================
//             ABOUT
//         ================================================= */}

//         {activePage === "about" && (
//           <section className="about">

//             <div className="about-hero">

//               <div className="about-icon">
//                 🎯
//               </div>

//               <h2>
//                 Job Skill Extraction
//                 using NLP
//               </h2>

//               <p>
//                 An NLP-based system designed
//                 to identify, normalize and
//                 categorize technical skills
//                 from job descriptions.
//               </p>

//             </div>

//             <div className="about-grid">

//               <div className="about-card">
//                 <span>01</span>

//                 <h3>
//                   Input
//                 </h3>

//                 <p>
//                   User provides a job
//                   description.
//                 </p>
//               </div>

//               <div className="about-card">
//                 <span>02</span>

//                 <h3>
//                   Preprocessing
//                 </h3>

//                 <p>
//                   Text is cleaned and
//                   normalized.
//                 </p>
//               </div>

//               <div className="about-card">
//                 <span>03</span>

//                 <h3>
//                   Extraction
//                 </h3>

//                 <p>
//                   Technical skills are
//                   identified using the
//                   JSON skill dictionary.
//                 </p>
//               </div>

//               <div className="about-card">
//                 <span>04</span>

//                 <h3>
//                   Classification
//                 </h3>

//                 <p>
//                   Skills are mapped to
//                   categories.
//                 </p>
//               </div>

//             </div>

//             <div className="technology-box">

//               <h3>
//                 Technology Stack
//               </h3>

//               <div className="tech-list">

//                 <span>React.js</span>
//                 <span>JavaScript</span>
//                 <span>HTML5</span>
//                 <span>CSS3</span>
//                 <span>NLP</span>
//                 <span>Python</span>
//                 <span>Pandas</span>
//                 <span>Machine Learning</span>
//                 <span>JSON</span>

//               </div>

//             </div>

//           </section>
//         )}

//       </main>
//     </div>
//   );
// }
// export default App;

import { useState } from "react";
import "./App.css";

import jobDescriptions from "./data/jobDescriptions.json";

/* =========================================================
   ADDITIONAL SKILLS
   These are used to detect skills that may appear in the
   job descriptions even when they are not explicitly present
   in the JSON skill list.
========================================================= */

const SKILL_CATEGORIES = {
  Programming: [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "C++",
    "C#",
    "PHP",
    "R",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Node.js",
    "Vue.js",
    "Bootstrap",
    "Frontend Development",
    "Backend Development",
    "API",
  ],

  Database: [
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "SQLite",
    "Database",
    "Database Design",
    "Relational Database",
    "Database Development",
    "Query Optimization",
  ],

  "BI & Analytics": [
    "Power BI",
    "Tableau",
    "Excel",
    "DAX",
    "Power Query",
    "Data Analysis",
    "Data Visualization",
    "Statistics",
    "Business Intelligence",
    "Reporting",
    "Dashboards",
    "Social Media Analytics",
  ],

  Cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",
  ],

  "AI & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
  ],

  NLP: [
    "NLP",
    "Natural Language Processing",
    "BERT",
    "Transformers",
    "spaCy",
    "NLTK",
  ],

  DevOps: [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "Jenkins",
  ],

  Testing: [
    "Software Testing",
    "Quality Assurance",
    "Automation Testing",
    "Test Automation",
    "Test Scripts",
    "Testing Frameworks",
    "Bug Tracking",
    "Test Case Design",
  ],

  Networking: [
    "Networking",
    "Wireless Networking",
    "Network Troubleshooting",
    "Network Monitoring",
  ],

  Cybersecurity: [
    "Cybersecurity",
    "Network Security",
    "Data Security",
    "Threat Detection",
    "Incident Response",
    "Database Security",
  ],

  Marketing: [
    "Social Media",
    "Content Creation",
  ],

  "Data Engineering": [
    "Data Architecture",
    "Data Infrastructure",
    "Data Management",
  ],
};

/* =========================================================
   ALIASES
========================================================= */

const ALIASES = {
  python3: "Python",
  "python 3": "Python",
  "python programming": "Python",

  powerbi: "Power BI",
  "power bi": "Power BI",

  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",

  js: "JavaScript",

  ml: "Machine Learning",

  ai: "Artificial Intelligence",

  "natural language processing": "NLP",

  sklearn: "Scikit-learn",
  "scikit learn": "Scikit-learn",

  "front end": "Frontend Development",
  frontend: "Frontend Development",

  "back end": "Backend Development",
  backend: "Backend Development",

  "social media": "Social Media",
  "content creation": "Content Creation",
};

/* =========================================================
   SAMPLE TEXT
========================================================= */

const SAMPLE_TEXT = `
Looking for a Data Analyst with strong experience in Python,
SQL, Power BI and Excel.

The candidate should have experience in data analysis,
data visualization, statistics and Power Query.

Knowledge of Tableau and Machine Learning is an additional advantage.
`;

/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\be\.?g\.?,?\s*/gi, "")
    .replace(/[“”‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   GET CATEGORY
========================================================= */

function getCategory(skill) {
  for (const [category, skills] of Object.entries(
    SKILL_CATEGORIES
  )) {
    if (
      skills.some(
        (item) =>
          item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return category;
    }
  }

  return "Other";
}

/* =========================================================
   ESCAPE REGEX
========================================================= */

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =========================================================
   CHECK WHETHER TEXT CONTAINS SKILL
========================================================= */

function containsSkill(text, skill) {
  const escapedSkill = escapeRegex(
    skill.toLowerCase()
  );

  const pattern = new RegExp(
    `(^|[^a-zA-Z0-9+#])${escapedSkill}([^a-zA-Z0-9+#]|$)`,
    "i"
  );

  return pattern.test(text);
}

/* =========================================================
   EXTRACT SKILLS FROM JSON + SKILL DICTIONARY
========================================================= */

function extractSkills(text) {
  if (!text.trim()) {
    return [];
  }

  const cleanedText = normalizeText(text);

  /*
    Collect all skills from JSON
  */

  const jsonSkills = [];

  jobDescriptions.forEach((job) => {
    if (Array.isArray(job.skills)) {
      job.skills.forEach((skill) => {
        if (!jsonSkills.includes(skill)) {
          jsonSkills.push(skill);
        }
      });
    }
  });

  /*
    Collect all skills from category dictionary
  */

  const categorySkills = Object.values(
    SKILL_CATEGORIES
  ).flat();

  /*
    Combine JSON + category skills
  */

  const allSkills = [
    ...new Set([
      ...jsonSkills,
      ...categorySkills,
      ...Object.keys(ALIASES),
    ]),
  ];

  /*
    Check longer skills first.
    Example:
    "Machine Learning" before "Learning"
  */

  const sortedSkills = allSkills.sort(
    (a, b) => b.length - a.length
  );

  const detected = [];

  sortedSkills.forEach((skill) => {
    if (containsSkill(cleanedText, skill)) {
      const canonical =
        ALIASES[skill.toLowerCase()] || skill;

      if (!detected.includes(canonical)) {
        detected.push(canonical);
      }
    }
  });

  return detected;
}

/* =========================================================
   GET CLASSIFICATION
========================================================= */

function getClassification(skills) {
  const result = {};

  skills.forEach((skill) => {
    result[skill] = getCategory(skill);
  });

  /*
    Also check JSON classification
  */

  jobDescriptions.forEach((job) => {
    if (job.classification) {
      Object.entries(job.classification).forEach(
        ([skill, category]) => {
          if (
            skills.some(
              (detectedSkill) =>
                detectedSkill.toLowerCase() ===
                skill.toLowerCase()
            )
          ) {
            result[skill] = category;
          }
        }
      );
    }
  });

  return result;
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  // =========================================================
  // LOGIN / LOGOUT
  // =========================================================

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("jobSkillExtractorAuth") === "true"
  );

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // IMPORTANT:
  // ALL HOOKS MUST BE BEFORE THE CONDITIONAL RETURN

  const [jobDescription, setJobDescription] =
    useState(SAMPLE_TEXT);

  const [skills, setSkills] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  const [activePage, setActivePage] =
    useState("extractor");

  const [loading, setLoading] = useState(false);

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginUsername.trim() === "admin" &&
      loginPassword === "admin123"
    ) {
      localStorage.setItem(
        "jobSkillExtractorAuth",
        "true"
      );

      setIsAuthenticated(true);

      setLoginUsername("");
      setLoginPassword("");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "jobSkillExtractorAuth"
    );

    setIsAuthenticated(false);

    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
  };

  // =========================================================
  // LOGIN PAGE
  // =========================================================

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-logo">
            🎯
          </div>

          <h1>Job Skill Extractor</h1>

          <p className="login-subtitle">
            NLP-Powered Skill Extraction & Classification
          </p>

          <form onSubmit={handleLogin}>

            <label htmlFor="login-username">
              Username
            </label>

            <input
              id="login-username"
              type="text"
              value={loginUsername}
              onChange={(e) =>
                setLoginUsername(e.target.value)
              }
              placeholder="Enter username"
              autoComplete="username"
              required
            />

            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />

            {loginError && (
              <div className="login-error">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              🔐 Login
            </button>

          </form>

          {/* <div className="demo-credentials">
            <strong>Demo Login</strong>
            <span>Username: admin</span>
            <span>Password: admin123</span>
          </div> */}

        </div>
      </div>
    );
  }

  // =========================================================
  // EXTRACT
  // =========================================================

  const handleExtract = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = extractSkills(
        jobDescription
      );

      setSkills(result);
      setLoading(false);
    }, 500);
  };

  // =========================================================
  // CLEAR
  // =========================================================

  const handleClear = () => {
    setJobDescription("");
    setSkills([]);
  };

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = [
    ...new Set(
      skills.map((skill) =>
        getCategory(skill)
      )
    ),
  ];

  // =========================================================
  // WORD COUNT
  // =========================================================

  const wordCount = jobDescription.trim()
    ? jobDescription
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    : 0;

  // =========================================================
  // MATCH SCORE
  // =========================================================

  const matchScore =
    skills.length === 0
      ? 0
      : Math.min(
          100,
          60 + skills.length * 5
        );

  // =========================================================
  // CATEGORY COUNT
  // =========================================================

  const categoryCount = {};

  skills.forEach((skill) => {
    const category = getCategory(skill);

    categoryCount[category] =
      (categoryCount[category] || 0) + 1;
  });

  // =========================================================
  // CLASSIFICATION
  // =========================================================

  const classification =
    getClassification(skills);

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            🎯
          </div>

          <div>
            <h2>Skills</h2>

            <span>
              Job Skill Extractor
            </span>
          </div>

        </div>

        <div className="nav">

          <button
            className={
              activePage === "extractor"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("extractor")
            }
          >
            <span>🔍</span>
            Skill Extractor
          </button>

          <button
            className={
              activePage === "analytics"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("analytics")
            }
          >
            <span>📊</span>
            Analytics
          </button>

          <button
            className={
              activePage === "about"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage("about")
            }
          >
            <span>ℹ️</span>
            About Project
          </button>

        </div>

        <div className="sidebar-bottom">

          <div className="dataset-status">

            <div className="status-dot"></div>

            <div>
              <strong>
                Dataset Connected
              </strong>

              <small>
                jobDescriptions.json
              </small>
            </div>

          </div>

          <button
            className="theme-button"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {/* HEADER */}

        <header className="topbar">

          <div>

            <h1>
              Job Skill Extractor
            </h1>

            <p className="subtitle">
              Extract and categorize
              technical skills from job
              descriptions instantly.
            </p>

          </div>

          <div className="user-area">

            <div className="user-info">

              <div className="user-avatar">
                A
              </div>

              {/* <div>
                <strong>Admin</strong>

                <small>
                  Authenticated User
                </small>
              </div> */}

            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </header>

        {/* =================================================
            EXTRACTOR PAGE
        ================================================= */}

        {activePage === "extractor" && (
          <>
            <section className="card input-card">

              <div className="card-header">

                <div>

                  <h2>
                    Job Description
                  </h2>

                  <p>
                    Paste a job description
                    to identify required
                    technical skills.
                  </p>

                </div>

              </div>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Paste job description here..."
              />

              <div className="input-footer">

                <span>
                  {wordCount} words
                </span>

                <div className="actions">

                  <button
                    className="secondary-button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>

                  <button
                    className="primary-button"
                    onClick={handleExtract}
                  >
                    {loading
                      ? "Analyzing..."
                      : "🔍 Extract Skills"}
                  </button>

                </div>

              </div>

            </section>

            {/* KPI */}

            <section className="kpi-grid">

              <div className="kpi">

                <div className="kpi-icon blue">
                  🎯
                </div>

                <div>
                  <span>
                    Skills Detected
                  </span>

                  <strong>
                    {skills.length}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon purple">
                  📂
                </div>

                <div>
                  <span>
                    Categories
                  </span>

                  <strong>
                    {categories.length}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon green">
                  📝
                </div>

                <div>
                  <span>
                    Words Analyzed
                  </span>

                  <strong>
                    {wordCount}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon orange">
                  ⚡
                </div>

                <div>
                  <span>
                    Match Score
                  </span>

                  <strong>
                    {matchScore}%
                  </strong>
                </div>

              </div>

            </section>

            {/* RESULT GRID */}

            <section className="result-grid">

              <div className="card">

                <div className="card-header">

                  <div>

                    <h2>
                      Detected Skills
                    </h2>

                    <p>
                      Normalized skills
                      identified from the
                      job description.
                    </p>

                  </div>

                  <span className="count-badge">
                    {skills.length}
                  </span>

                </div>

                {skills.length === 0 ? (

                  <div className="empty">

                    <div className="empty-icon">
                      🔍
                    </div>

                    <h3>
                      No skills detected
                    </h3>

                    <p>
                      Enter a job
                      description and
                      click Extract
                      Skills.
                    </p>

                  </div>

                ) : (

                  <div className="skills">

                    {skills.map((skill) => (

                      <div
                        className="skill"
                        key={skill}
                      >
                        ✓ {skill}
                      </div>

                    ))}

                  </div>

                )}

              </div>

              <div className="card">

                <div className="card-header">

                  <div>

                    <h2>
                      Skill Categories
                    </h2>

                    <p>
                      Technology
                      classification.
                    </p>

                  </div>

                </div>

                {skills.length === 0 ? (

                  <div className="empty small">

                    <div className="empty-icon">
                      📊
                    </div>

                    <p>
                      Category analysis
                      will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="category-list">

                    {Object.entries(
                      categoryCount
                    ).map(
                      ([category, count]) => (

                        <div
                          className="category-row"
                          key={category}
                        >

                          <div className="category-name">

                            <span className="category-dot">
                              ●
                            </span>

                            {category}

                          </div>

                          <div className="category-count">
                            {count}
                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            </section>

            {/* CLASSIFICATION */}

            <section className="card">

              <div className="card-header">

                <div>

                  <h2>
                    Skill Classification
                  </h2>

                  <p>
                    Detected technologies
                    mapped to their
                    categories.
                  </p>

                </div>

              </div>

              {skills.length > 0 ? (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>
                        <th>#</th>
                        <th>Skill</th>
                        <th>Category</th>
                        <th>Status</th>
                      </tr>

                    </thead>

                    <tbody>

                      {skills.map(
                        (skill, index) => (

                          <tr key={skill}>

                            <td>
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </td>

                            <td>
                              <strong>
                                {skill}
                              </strong>
                            </td>

                            <td>
                              <span className="category-tag">
                                {classification[skill] ||
                                  getCategory(skill)}
                              </span>
                            </td>

                            <td>
                              <span className="detected">
                                ✓ Detected
                              </span>
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="table-empty">
                  Run skill extraction to
                  see results.
                </div>

              )}

            </section>

            {/* RECOMMENDATIONS */}

            {skills.length > 0 && (

              <section className="card recommendations">

                <div className="card-header">

                  <div>

                    <h2>
                      💡 Technology
                      Recommendations
                    </h2>

                    <p>
                      Technologies related
                      to the detected skill
                      set.
                    </p>

                  </div>

                </div>

                <div className="recommendation-grid">

                  {skills.includes("Python") && (

                    <div className="recommendation">

                      <span>🐍</span>

                      <div>
                        <strong>
                          Python Ecosystem
                        </strong>

                        <small>
                          Pandas • NumPy •
                          Matplotlib
                        </small>
                      </div>

                    </div>

                  )}

                  {skills.includes("SQL") && (

                    <div className="recommendation">

                      <span>🗄️</span>

                      <div>
                        <strong>
                          Database
                        </strong>

                        <small>
                          MySQL • PostgreSQL •
                          SQL Server
                        </small>
                      </div>

                    </div>

                  )}

                  {skills.includes("Power BI") && (

                    <div className="recommendation">

                      <span>📊</span>

                      <div>
                        <strong>
                          Power BI Stack
                        </strong>

                        <small>
                          DAX • Power Query •
                          Data Modeling
                        </small>
                      </div>

                    </div>

                  )}

                  {skills.includes("Machine Learning") && (

                    <div className="recommendation">

                      <span>🤖</span>

                      <div>
                        <strong>
                          Machine Learning
                        </strong>

                        <small>
                          Scikit-learn •
                          Pandas • NumPy
                        </small>
                      </div>

                    </div>

                  )}

                </div>

              </section>

            )}

          </>
        )}

        {/* =================================================
            ANALYTICS
        ================================================= */}

        {activePage === "analytics" && (

          <section>

            <div className="page-title">

              <p className="eyebrow">
                DATA INSIGHTS
              </p>

              <h2>
                Skill Analytics
              </h2>

              <p>
                Analyze the skills detected
                from the current job
                description.
              </p>

            </div>

            <div className="analytics-grid">

              {Object.entries(
                categoryCount
              ).map(
                ([category, count]) => {

                  const percentage =
                    skills.length
                      ? Math.round(
                          (count /
                            skills.length) *
                            100
                        )
                      : 0;

                  return (

                    <div
                      className="analytics-card"
                      key={category}
                    >

                      <div className="analytics-top">

                        <strong>
                          {category}
                        </strong>

                        <span>
                          {count} skills
                        </span>

                      </div>

                      <div className="progress">

                        <div
                          className="progress-bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>

                      </div>

                      <small>
                        {percentage}% of
                        detected skills
                      </small>

                    </div>

                  );

                }
              )}

            </div>

            {skills.length === 0 && (

              <div className="analytics-empty">

                <div>
                  📊
                </div>

                <h3>
                  No analytics available
                </h3>

                <p>
                  Extract skills first to
                  generate analytics.
                </p>

              </div>

            )}

          </section>

        )}

        {/* =================================================
            ABOUT
        ================================================= */}

        {activePage === "about" && (

          <section className="about">

            <div className="about-hero">

              <div className="about-icon">
                🎯
              </div>

              <h2>
                Job Skill Extraction
                using NLP
              </h2>

              <p>
                An NLP-based system designed
                to identify, normalize and
                categorize technical skills
                from job descriptions.
              </p>

            </div>

            <div className="about-grid">

              <div className="about-card">
                <span>01</span>

                <h3>
                  Input
                </h3>

                <p>
                  User provides a job
                  description.
                </p>
              </div>

              <div className="about-card">
                <span>02</span>

                <h3>
                  Preprocessing
                </h3>

                <p>
                  Text is cleaned and
                  normalized.
                </p>
              </div>

              <div className="about-card">
                <span>03</span>

                <h3>
                  Extraction
                </h3>

                <p>
                  Technical skills are
                  identified using the
                  JSON skill dictionary.
                </p>
              </div>

              <div className="about-card">
                <span>04</span>

                <h3>
                  Classification
                </h3>

                <p>
                  Skills are mapped to
                  categories.
                </p>
              </div>

            </div>

            <div className="technology-box">

              <h3>
                Technology Stack
              </h3>

              <div className="tech-list">

                <span>React.js</span>
                <span>JavaScript</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>NLP</span>
                <span>Python</span>
                <span>Pandas</span>
                <span>Machine Learning</span>
                <span>JSON</span>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;