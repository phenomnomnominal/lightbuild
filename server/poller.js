// Constants:
const TASKS = [];

module.exports = {
    addTask
};

setInterval(() => {
    TASKS.forEach(task => task());
}, 10000);

function addTask (task) {
    TASKS.push(task);
}
