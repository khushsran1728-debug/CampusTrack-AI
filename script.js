function openAssistant() {
    alert("CampusTrack AI Assistant will open here!");
}
function completeTask(checkbox) {

    const taskCard = checkbox.closest(".full-task-card");

    if (checkbox.checked) {

        taskCard.classList.add("completed");

        document.getElementById("taskMessage").innerText =
            "Great! Task completed successfully ✓";

    } else {

        taskCard.classList.remove("completed");

        document.getElementById("taskMessage").innerText =
            "Complete a task by checking the box ✓";
    }
}


function addNewTask() {

    alert(
        "Task creation feature will be connected to the database in Part 9."
    );

}
function showMissedTopics() {

    const subject = document.getElementById("subjectSelect").value;

    const missedTopics = document.getElementById("missedTopics");

    if (subject === "cn") {

        missedTopics.innerHTML = `
            <div class="missed-topic-card">

                <div class="topic-date">12 Sept</div>

                <div class="topic-info">
                    <h3>Routing Protocols</h3>
                    <p>Introduction to routing protocols.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>

            <div class="missed-topic-card">

                <div class="topic-date">13 Sept</div>

                <div class="topic-info">
                    <h3>IP Addressing</h3>
                    <p>IPv4 and IPv6 addressing concepts.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>
        `;

    }

    else if (subject === "daa") {

        missedTopics.innerHTML = `
            <div class="missed-topic-card">

                <div class="topic-date">13 Sept</div>

                <div class="topic-info">
                    <h3>Greedy Algorithms</h3>
                    <p>Introduction to greedy algorithm strategy.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>

            <div class="missed-topic-card">

                <div class="topic-date">14 Sept</div>

                <div class="topic-info">
                    <h3>Activity Selection</h3>
                    <p>Solving problems using greedy techniques.</p>
                </div>

                <span class="status revision-status">
                    Revision
                </span>

            </div>
        `;

    }

    else if (subject === "os") {

        missedTopics.innerHTML = `
            <div class="missed-topic-card">

                <div class="topic-date">11 Sept</div>

                <div class="topic-info">
                    <h3>Process Management</h3>
                    <p>Processes and process states.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>

            <div class="missed-topic-card">

                <div class="topic-date">12 Sept</div>

                <div class="topic-info">
                    <h3>Deadlocks</h3>
                    <p>Deadlock conditions and prevention.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>
        `;

    }

    else if (subject === "web") {

        missedTopics.innerHTML = `
            <div class="missed-topic-card">

                <div class="topic-date">10 Sept</div>

                <div class="topic-info">
                    <h3>JavaScript Basics</h3>
                    <p>Variables, functions and basic JavaScript.</p>
                </div>

                <span class="status missed-status">
                    Missed
                </span>

            </div>

            <div class="missed-topic-card">

                <div class="topic-date">12 Sept</div>

                <div class="topic-info">
                    <h3>DOM Manipulation</h3>
                    <p>Understanding and modifying webpage elements.</p>
                </div>

                <span class="status revision-status">
                    Revision
                </span>

            </div>
        `;

    }

}
// CampusTrack AI Assistant

function addChatMessage(message, type) {

    const chat = document.getElementById("chatMessages");

    const div = document.createElement("div");

    div.className = type === "user"
        ? "user-message"
        : "ai-message";

    div.innerHTML = message;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}


function askAI(type) {

    if (type === "missed") {

        addChatMessage(
            "What did I miss?",
            "user"
        );

        addChatMessage(
            "📚 You missed <b>Routing Protocols</b> and <b>IP Addressing</b> in Computer Networks. I recommend revising these topics before your CN MST on 22 Sept.",
            "ai"
        );

    }


    else if (type === "next") {

        addChatMessage(
            "What's next?",
            "user"
        );

        addChatMessage(
            "📅 Your next important activity is the <b>DAA Assignment</b> deadline on 18 Sept. After that, your CN MST is on 22 Sept.",
            "ai"
        );

    }


    else if (type === "tasks") {

        addChatMessage(
            "Show my pending tasks.",
            "user"
        );

        addChatMessage(
            "✅ You currently have <b>4 pending tasks</b>: DAA Assignment, DBMS Project, CN MST Preparation and Web Technology Assignment.",
            "ai"
        );

    }


    else if (type === "exam") {

        addChatMessage(
            "When is my next exam?",
            "user"
        );

        addChatMessage(
            "📝 Your next exam is <b>Computer Networks MST</b> on <b>22 September</b>. Topics include Routing Protocols and IP Addressing.",
            "ai"
        );

    }

}

async function sendAIMessage() {

    const input = document.getElementById("aiInput");

    const message = input.value.trim();

    if (message === "") {
        return;
    }
    async function getAIBackendData() {
    try {
        const response = await fetch("http://localhost:5000/api/student");
        const data = await response.json();

        console.log("AI received student data:", data);

        return data;

    } catch (error) {
        console.error("AI backend error:", error);
        return null;
    }
}

    addChatMessage(message, "user");

    const lowerMessage = message.toLowerCase();

    let response = "";
    const backendData = await getAIBackendData();

    if (
        lowerMessage.includes("miss") ||
        lowerMessage.includes("absent")
    ) {

        response =
            "📚 You missed <b>Routing Protocols</b> and <b>IP Addressing</b> in Computer Networks. These should be your first revision topics.";

    }

    else if (
        lowerMessage.includes("next") ||
        lowerMessage.includes("today")
    ) {

        response =
            "📅 Your next priority is the <b>DAA Assignment</b>. After that, prepare for the <b>CN MST on 22 Sept</b>.";

    }

    else if (
        lowerMessage.includes("task") ||
        lowerMessage.includes("assignment")
    ) {

       response =
    "✅ You currently have <b>" +
    backendData.pendingTasks +
    " pending tasks</b>.";
    }

    else if (
        lowerMessage.includes("exam") ||
        lowerMessage.includes("mst")
    ) {

        response =
            "📝 Your next exam is the <b>CN MST on 22 September</b>. Start with Routing Protocols and IP Addressing.";

    }

    else {

        response =
            "🤖 I can help you with missed classes, upcoming activities, assignments and exams. Try asking: <b>What did I miss?</b>";

    }

    setTimeout(function() {

        addChatMessage(response, "ai");

    }, 400);

    input.value = "";
}


function handleAIEnter(event) {

    if (event.key === "Enter") {

        sendAIMessage();

    }

}
// ==============================
// STUDENT DATA STORAGE
// ==============================

const studentData = {
    name: "Khushdeep",
    course: "B.Tech CSE",
    semester: "3rd Semester",

    missedLectures: 3,

    upcomingActivities: [
        "DAA Assignment",
        "CN MST",
        "DAA Class Test",
        "Mid Semester Exams"
    ],

    pendingTasks: [
        "DAA Assignment",
        "DBMS Project",
        "CN MST Preparation",
        "Web Technology Assignment"
    ]
};


// Save student data
localStorage.setItem(
    "campusTrackStudent",
    JSON.stringify(studentData)
);


// Load student data
function loadStudentData() {

    const savedData =
        localStorage.getItem("campusTrackStudent");

    if (savedData) {

        const data = JSON.parse(savedData);

        console.log("CampusTrack Student Data:", data);

    }

}


// Run when website opens
loadStudentData();
function scrollToDashboard() {

    const dashboard =
        document.getElementById("dashboard");

    if (dashboard) {

        dashboard.scrollIntoView({
            behavior: "smooth"
        });

    }

}
// ==============================
// STUDENT LOGIN
// ==============================

function openLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


function studentLogin() {

    const name =
        document.getElementById("studentName").value.trim();

    const studentID =
        document.getElementById("studentID").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (name === "" || studentID === "") {

        message.style.color = "#dc2626";
        message.innerText =
            "Please enter your name and Student ID.";

        return;
    }


    localStorage.setItem("loggedInStudent", name);
    localStorage.setItem("studentID", studentID);

    message.style.color = "#16a34a";

    message.innerText =
        "Login successful! Welcome " + name + " 🎉";


    setTimeout(function() {

        closeLogin();

        const dashboard =
            document.getElementById("dashboard");

        if (dashboard) {

            dashboard.scrollIntoView({
                behavior: "smooth"
            });

        }

    }, 1000);

}
// ===============================
// CONNECT FRONTEND WITH BACKEND
// ===============================

async function loadBackendStudentData() {
    try {
        const response = await fetch("http://localhost:5000/api/student");
        const data = await response.json();

        console.log("Backend Student Data:", data);

        // Update dashboard values
        const missed = document.getElementById("missedLectures");
        const pending = document.getElementById("pendingTasks");
        const upcoming = document.getElementById("upcomingActivities");
        const progress = document.getElementById("academicProgress");

        if (missed) {
            missed.innerText = data.missedLectures;
        }

        if (pending) {
            pending.innerText = data.pendingTasks;
        }
        if (upcoming) {
    upcoming.innerText = data.upcomingActivities;
        }
        if (progress) {
    progress.innerText = data.academicProgress + "%";
        }

        console.log("✅ CampusTrack connected to backend!");
    } catch (error) {
        console.error("❌ Backend connection failed:", error);
    }
}

loadBackendStudentData();
// ===============================
// LOAD ACTIVITIES FROM BACKEND
// ===============================

async function loadActivities() {
    try {
        const response = await fetch("http://localhost:5000/api/activities");
        const data = await response.json();

        console.log("Backend Activities:", data);

        // Show activities in console for now
        console.log("Assignments:", data.assignments);
        console.log("Exams:", data.exams);
        console.log("Events:", data.events);

    } catch (error) {
        console.error("❌ Could not load activities:", error);
    }
}

loadActivities();
// Show backend classes on website

async function showBackendClasses() {
    try {
        const response = await fetch("http://localhost:5000/api/activities");
        const data = await response.json();

        const container = document.getElementById("backendClasses");

        if (container) {
            container.innerHTML = data.assignments.map(function(item) {
                return `
                    <div class="class-card">
                        <h4>${item.subject}</h4>
                        <p>${item.title}</p>
                        <small>Deadline: ${item.deadline}</small>
                    </div>
                `;
            }).join("");
        }

    } catch (error) {
        console.error("Could not load classes:", error);
    }
}

showBackendClasses();
// Show backend tests on website

async function showBackendTests() {
    try {
        const response = await fetch("http://localhost:5000/api/activities");
        const data = await response.json();

        const container = document.getElementById("backendTests");

        if (container) {
            container.innerHTML = data.exams.map(function(item) {
                return `
                    <div class="test-card">
                        <h4>${item.subject}</h4>
                        <p>${item.type}</p>
                        <small>Date: ${item.date}</small>
                    </div>
                `;
            }).join("");
        }

    } catch (error) {
        console.error("Could not load tests:", error);
    }
}

showBackendTests();
// Show backend events on website

async function showBackendEvents() {
    try {
        const response = await fetch("http://localhost:5000/api/activities");
        const data = await response.json();

        const container = document.getElementById("backendEvents");

        if (container) {
            container.innerHTML = data.events.map(function(item) {
                return `
                    <div class="calendar-card">
                        <h4>${item.title}</h4>
                        <p>📅 ${item.date}</p>
                    </div>
                `;
            }).join("");
        }

    } catch (error) {
        console.error("Could not load events:", error);
    }
}

showBackendEvents();