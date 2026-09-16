const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CampusTrack AI Backend is running 🚀"
    });
});

app.get("/api/student", (req, res) => {
    res.json({
        name: "Khushdeep",
        course: "B.Tech CSE",
        semester: "3rd Semester",
        missedLectures: 3,
        pendingTasks: 4,
        academicProgress: 74
    });
});
app.get("/api/activities", (req, res) => {
    res.json({
        assignments: [
            {
                subject: "DAA",
                title: "Sorting Algorithm Assignment",
                deadline: "20 September 2026"
            },
            {
                subject: "Web Technology",
                title: "HTML & CSS Project",
                deadline: "22 September 2026"
            }
        ],

        exams: [
            {
                subject: "Computer Networks",
                type: "MST",
                date: "25 September 2026"
            },
            {
                subject: "DAA",
                type: "Class Test",
                date: "27 September 2026"
            }
        ],

        events: [
            {
                title: "College Hackathon",
                date: "30 September 2026"
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🎓 CampusTrack AI Backend");
    console.log("=================================");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("=================================");
});