

document.addEventListener('DOMContentLoaded', () => {

    
    runCode();
    updateLineNums();
});


function runCode() {
    const code = document.getElementById('code-editor');
    const frame = document.getElementById('preview-frame');
    if (!code || !frame) return;

    const html = code.value;

    const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 16px;
                    color: #222;
                }
                h1 { color: #e44d26; }
                h2 { color: #3ea6ff; }
            </style>
        </head>
        <body>${html}</body>
        </html>`;

    frame.srcdoc = fullHtml;
}


function updateLineNums() {
    const code = document.getElementById('code-editor');
    const lineNums = document.getElementById('line-nums');
    if (!code || !lineNums) return;

    const lines = code.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
        html += `<span>${i}</span>`;
    }
    lineNums.innerHTML = html;
}


function getQuizProgressPercent(el) {
    const quizSection = el?.closest('.quiz-section');
    if (!quizSection) return 50;

    const quizSections = [...document.querySelectorAll('.quiz-section')];
    const quizIndex = quizSections.indexOf(quizSection);
    if (quizIndex < 0 || quizSections.length === 0) return 50;

    return ((quizIndex + 1) / quizSections.length) * 100;
}

function checkAnswer(el, isCorrect) {
    const allOpts = document.querySelectorAll('.quiz-opt');

    
    allOpts.forEach(opt => opt.style.pointerEvents = 'none');

    if (isCorrect) {
        el.classList.add('correct');
        showFeedback('✅ Correct! Great job!', 'success');
        updateProgress(getQuizProgressPercent(el));
    } else {
        el.classList.add('wrong');
        showFeedback('❌ Not quite. Try again next time!', 'error');

        
        allOpts.forEach(opt => {
            if (opt.getAttribute('onclick').includes('true')) {
                opt.classList.add('correct');
            }
        });
    }

    
    setTimeout(() => {
        allOpts.forEach(opt => {
            opt.style.pointerEvents = '';
            opt.classList.remove('correct', 'wrong');
        });
    }, 3000);
}


function showFeedback(message, type) {
    const existing = document.querySelector('.feedback-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'feedback-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00cc66' : '#ff4444'};
        color: #fff;
        padding: 14px 28px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


function updateLessonHeader(percent, stepText) {
    const bar = document.getElementById('progress-bar');
    const label = document.getElementById('step-label');

    if (bar) {
        const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
        bar.style.width = safePercent + '%';
    }

    if (label && typeof stepText === 'string' && stepText.trim()) {
        label.textContent = stepText;
    }
}

function updateProgress(percent, stepText) {
    updateLessonHeader(percent, stepText);
}

function closeLesson() {
    if (window.confirm('Return to home page?')) {
        window.location.href = '../homepage.html';
    }
}
