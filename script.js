 let tasks = [
      { id: 1, text: "Finish wireframes for Client X", tag: "Design", completed: false },
      { id: 2, text: "Update API documentation", tag: "Dev", completed: true },
      { id: 3, text: "Weekly core team sync", tag: "Meeting", completed: false },
    ];

    const taskListEl = document.getElementById('taskList');

    function renderTasks() {
      taskListEl.innerHTML = '';

     
      const filtered = tasks.filter(t => t.tag === currentGroup);

      if (filtered.length === 0) {
        taskListEl.innerHTML = `<div style="text-align:center; color:gray; padding:20px;">No tasks in ${currentGroup}</div>`;
      }

      filtered.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-card ${task.completed ? 'completed' : ''}`;
        div.onclick = (e) => {
          if (!e.target.closest('.delete-btn')) toggleTask(task.id);
        };

        div.innerHTML = `
                <div class="checkbox">
                    <ion-icon name="checkmark-outline"></ion-icon>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.text}</div>
                    <div class="task-meta">
                        <span class="tag">${task.tag}</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteTask(event, ${task.id})">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            `;
        taskListEl.appendChild(div);
      });

      updateCounts();
    };

    function toggleTask(id) {
      const t = tasks.find(x => x.id === id);
      if (t) t.completed = !t.completed;
      renderTasks();
    }

    function deleteTask(e, id) {
      e.stopPropagation();
 
      tasks = tasks.filter(x => x.id !== id);
      renderTasks();
    }


    function addTaskDirect() {
      const input = document.getElementById('newTaskInput');
      const text = input.value.trim();

      if (text) {
        tasks.push({
          id: Date.now(),
          text: text,
          tag: currentGroup,
          completed: false
        });
        input.value = '';
        renderTasks();

       
        const taskList = document.getElementById('taskList');
        taskList.scrollTop = taskList.scrollHeight;
      }
    }

    function handleEnter(e) {
      if (e.key === 'Enter') addTaskDirect();
    }


    let currentGroup = 'General';

    function switchGroup(el, groupName) {

      document.querySelectorAll('.group-card').forEach(c => c.classList.remove('active'));
      el.classList.add('active');

      currentGroup = groupName;
      renderTasks(); 
      updateCounts();
    }

    function updateCounts() {
      const counts = {};
      ['General', 'Meetings', 'Trip'].forEach(g => {
        counts[g] = tasks.filter(t => t.tag === g).length;
      });

      const genEl = document.querySelector('.count-general');
      const meetEl = document.querySelector('.count-meetings');
      const tripEl = document.querySelector('.count-trip');

      if (genEl) genEl.textContent = `${counts.General} tasks`;
      if (meetEl) meetEl.textContent = `${counts.Meetings} tasks`;
      if (tripEl) tripEl.textContent = `${counts.Trip} tasks`;
    }
    renderTasks();
    const cells = document.querySelectorAll('.date-cell');
 
    if (cells.length > 15) cells[15].classList.add('active'); 