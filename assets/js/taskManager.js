/**
 * Manage tasks
 */
 let taskManager = {
    /**
     * Add a task to the DOM, using a template
     * @param name Name of the task to add
     * @param categoryId Id of the category of the task to add
     * @param status Status of the task
     * @param completion Percent of completion
     */
    addTask: function(name, categoryId, status = 1, completion = 0, taskId = null) {
        // get the template for a task
        let template = document.getElementById('template-task');

        // clone the content of the template
        let newTask = template.content.cloneNode(true);

        // ----- modify the clone with information from the form
        let taskElement = newTask.querySelector('.task');

        // data-category
        taskElement.dataset.category = categoryId;

        // name of the task
        taskElement.querySelector('.task__name-display').textContent = name;

        // value of the input
        taskElement.querySelector('.task__name-edit').value = name;

        // get the name of the category from the category id
        let categoryName = categoryManager.getCategoryName(categoryId);

        // display the category
        taskElement.querySelector('.task__category p').textContent = categoryName;

        // completion
        taskElement.querySelector('.progress-bar__level').style.width = completion + '%';

        // CSS class from status
        if (completion === 100) {
            taskElement.classList.remove('task--todo');
            taskElement.classList.add('task--complete');
        }
        if (status === 0) {
            // tâche archivée
            taskElement.classList.remove('task--todo');
            taskElement.classList.add('task--archive');
        }

        // dataset id
        taskElement.dataset.id = taskId;

        // ----- add the clone to the DOM, before the form
        let parentNode = document.querySelector('.tasks');
        let brother = parentNode.querySelector('.task--add');
        parentNode.insertBefore(newTask, brother);

        // bind events for the new task
        app.bindEventsForTask(taskElement);
    },

    /**
     * Load all tasks from the API
     */
    loadTasks: function() {
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
    
        fetch('https://benoclock.github.io/S07-todolist/tasks.json', config)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                for (task of data) {
                    taskManager.addTask(task.title, task.category.id, task.status, task.completion, task.id);
                }
            }
        );
    },
}
