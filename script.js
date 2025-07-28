let studySessions = [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
  renderSessions();
});

function addStudySession() {
  const subject = document.getElementById('subject').value.trim();
  const topic = document.getElementById('topic').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!subject || !topic || !date || !time) {
    alert('Please fill in all fields!');
    return;
  }

  const session = {
    id: Date.now(),
    subject,
    topic,
    date,
    time,
    completed: false
  };

  studySessions.push(session);
  studySessions.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
  
  renderSessions();
  clearForm();
}

function renderSessions() {
  const sessionsList = document.getElementById('sessionsList');
  const emptyState = document.getElementById('emptyState');

  if (studySessions.length === 0) {
    sessionsList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  sessionsList.innerHTML = studySessions.map(session => {
    const sessionDate = new Date(session.date + ' ' + session.time);
    const isToday = new Date().toDateString() === sessionDate.toDateString();
    const isPast = sessionDate < new Date();

    return `
      <div class="border border-gray-200 rounded-lg p-4 ${session.completed ? 'bg-green-50 border-green-200' : isPast ? 'bg-red-50 border-red-200' : isToday ? 'bg-yellow-50 border-yellow-200' : ''}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold text-indigo-700">${session.subject}</span>
              ${isToday ? '<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Today</span>' : ''}
              ${session.completed ? '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✓ Completed</span>' : ''}
            </div>
            <p class="text-gray-700 mb-2">${session.topic}</p>
            <p class="text-sm text-gray-500">
              📅 ${new Date(session.date).toLocaleDateString()} at ${session.time}
            </p>
          </div>
          <div class="flex gap-2">
            ${!session.completed ? `
              <button onclick="markCompleted(${session.id})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">Complete</button>
            ` : ''}
            <button onclick="deleteSession(${session.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function markCompleted(id) {
  const session = studySessions.find(s => s.id === id);
  if (session) {
    session.completed = true;
    renderSessions();
  }
}

function deleteSession(id) {
  studySessions = studySessions.filter(s => s.id !== id);
  renderSessions();
}

function clearForm() {
  document.getElementById('subject').value = '';
  document.getElementById('topic').value = '';
  document.getElementById('time').value = '';
}
