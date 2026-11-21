// --- ITAHARI INTERNATIONAL COLLEGE (IIC) MANAGEMENT SYSTEM CONTROLLER ---

// 1. Navigation Controller
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');
const pageTitle = document.getElementById('current-page-title');
const pageSubtitle = document.getElementById('current-page-subtitle');

const pageSubtitles = {
    'dashboard-view': 'Welcome back. Summary of IIC campus operations and academic records.',
    'students-view': 'Manage student admissions, profiles, and academic records.',
    'teachers-view': 'Manage faculty members, assignments, and departments.',
    'attendance-view': 'Track daily classroom presence and generate reports.',
    'marks-view': 'Record examination evaluations, coursework grades, and GPA calculations.',
    'fees-view': 'Track invoices, student fee dues, and payment records.',
    'vehicles-view': 'Monitor Itahari, Dharan, and Biratnagar transportation fleet routes.',
    'complaints-view': 'Review and address student feedback and grievances.'
};

function switchTab(targetId, titleText) {
    // Deactivate all nav buttons & panels
    navItems.forEach(btn => btn.classList.remove('active'));
    viewPanels.forEach(panel => panel.classList.remove('active'));

    // Activate selected button
    const targetButton = document.querySelector(`[data-target="${targetId}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    // Activate selected panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    // Update Topbar Title & Subtitle
    if (titleText && pageTitle) {
        pageTitle.textContent = titleText;
    }
    if (pageSubtitle && pageSubtitles[targetId]) {
        pageSubtitle.textContent = pageSubtitles[targetId];
    }
}

// Attach click listeners to all navigation buttons
navItems.forEach(button => {
    button.addEventListener('click', () => {
        const targetViewId = button.getAttribute('data-target');
        const spanText = button.querySelector('span');
        const buttonLabel = spanText ? spanText.innerText.trim() : button.innerText.trim();
        switchTab(targetViewId, buttonLabel);
    });
});

// Set default attendance date to today's date dynamically
const dateInput = document.getElementById('attendance-date');
if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
}

// 2. Information Assistant Controller
const chatbotModal = document.getElementById('chatbot-modal');
const openChatBtn = document.getElementById('open-chatbot-btn');
const closeChatBtn = document.getElementById('close-chatbot-btn');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

if (openChatBtn && chatbotModal) {
    openChatBtn.addEventListener('click', () => {
        chatbotModal.classList.toggle('active');
        if (chatbotModal.classList.contains('active')) {
            chatInput.focus();
        }
    });
}

if (closeChatBtn && chatbotModal) {
    closeChatBtn.addEventListener('click', () => {
        chatbotModal.classList.remove('active');
    });
}

// IIC Specific Knowledgebase
const collegeFAQ = [
    { 
        keywords: ['exam', 'routine', 'test', 'mid-term', 'schedule'], 
        reply: 'Level 5 / 2nd Year mid-term examinations are scheduled for December 2026. Module coursework routines are updated under the Marks & Results tab.' 
    },
    { 
        keywords: ['fee', 'payment', 'due', 'accounts', 'clearance'], 
        reply: 'Semester installment fees must be settled at the IIC Accounts Department or through the online portal by November 28, 2026.' 
    },
    { 
        keywords: ['bus', 'vehicle', 'route', 'transport', 'dharan', 'biratnagar', 'inaruwa'], 
        reply: 'IIC transit operates 3 daily routes: Route 1 (Dharan Bhanuchowk - Tarahara), Route 2 (Biratnagar Traffic Chowk - Duhabi - Khanar), and Route 3 (Inaruwa - Jhumka). Check Transportation for timings.' 
    },
    { 
        keywords: ['attendance', 'present', 'absent', 'percentage', 'rule'], 
        reply: 'University regulations require a minimum of 80% attendance in lectures and practical labs to remain eligible for end-of-semester assessments.' 
    },
    { 
        keywords: ['complaint', 'grievance', 'issue', 'ticket', 'lab'], 
        reply: 'Academic and facility tickets can be logged directly through the Complaints section. The IT Helpdesk and administration resolve issues within 24-48 hours.' 
    },
    { 
        keywords: ['hello', 'hi', 'iic'], 
        reply: 'Greetings from Itahari International College. How can I assist you with academic records, transit routes, or departmental inquiries today?' 
    }
];

function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Display user message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg user-msg';
    userMsgEl.textContent = text;
    chatMessages.appendChild(userMsgEl);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Automated Response
    setTimeout(() => {
        let matchedReply = "Information not found for the entered inquiry. You may query keywords such as: 'exams', 'fees', 'Dharan bus', 'attendance', or 'complaints'.";
        const lowerText = text.toLowerCase();

        for (const item of collegeFAQ) {
            if (item.keywords.some(kw => lowerText.includes(kw))) {
                matchedReply = item.reply;
                break;
            }
        }

        const botMsgEl = document.createElement('div');
        botMsgEl.className = 'chat-msg bot-msg';
        botMsgEl.textContent = matchedReply;
        chatMessages.appendChild(botMsgEl);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 350);
}

if (sendChatBtn) {
    sendChatBtn.addEventListener('click', handleUserMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}