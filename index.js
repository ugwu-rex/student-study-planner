class Subject {
    static count = 0;

    constructor(name){
        this.name = name;
        this.tasks = [];
        Subject.count++;
    }
    
    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
       this.tasks = this.tasks.filter(task => task.getTitle() !== taskTitle);
    }

    listTasks(){
        return this.tasks;
    }

    listPendingTask(){
        return this.tasks.filter(task => task.getStatus() === false);
    }

    listCompletedTask(){
        return this.tasks.filter(task => task.getStatus() === true);
    }
}


class Task {
    static count = 0;

    #title;
    #dueDate;
    #status;

    constructor(title, dueDate){
        this.#title = title;
        this.#dueDate = dueDate;
        this.#status = false; // false = not done, true = done
        
        Task.count++;
    }

    getTitle(){
        return this.#title
    }

    getDueDate() {
        return this.#dueDate;
    }

    getStatus() {
        return this.#status;
    }
    
    setTitle(newTitle) {
        this.#title = newTitle;
    }

    setDueDate(newDate) {
        this.#dueDate = newDate;
    }

    setStatus(newStatus) {
        this.#status = newStatus;
    }


    markCompleted(){
        this.#status = true;
    }

    updateTitle(newTitle){
        this.#title = newTitle;
    }

    updateDueDate(newDate){
        this.#dueDate = newDate;
    }

    static getTotaltasks(){
        return Task.count;
    }
}

class TimedTask extends Task {
    #duration;

    constructor(title, dueDate, duration) {
        super(title, dueDate);   // required: calls parent constructor
        this.#duration = duration;
    }

    
    getDuration() {
        return this.#duration;
    }

    
    setDuration(newDuration) {
        this.#duration = newDuration;
    }

    // POLYMORPHISM: override markCompleted()
    markCompleted() {
        super.markCompleted();  
        console.log(`Timed task completed in ${this.#duration} minutes.`);
    }
}


class StudyPlanner {
    constructor(name){
        this.name = name;
        this.subjects = [];
    }

    addSubject(subject){
        this.subjects.push(subject);
    }

    removeSubject(subjectName){
        this.subjects = this.subjects.filter(subject => subject.name !== subjectName);
    }

    getSubject(subjectName){
        return this.subjects.find(subject => subject.name === subjectName)
    }

    listAllSubjects(){
        return this.subjects;
    }

    listAllTask(){
        let allTask = [];
        this.subjects.forEach(subject => {
            allTask = allTask.concat(subject.listTasks());
        });
        return allTask;
    }

    static help(){
        return "StudyPlanner manages subjects and tasks.";
    }
}



const planner = new StudyPlanner("My Study Planner");

const CSC = new Subject("Computer Science");
const math = new Subject("Mathematics");

planner.addSubject(CSC);
planner.addSubject(math);

const task1 = new Task("UML Diagram Assignment", new Date("2026-05-10"));
const task2 = new Task("Data Structure Revision", new Date("2026-05-12"));
const task3 = new Task("Calculus Homework", new Date("2026-05-15"));

CSC.addTask(task1);
CSC.addTask(task2);
math.addTask(task3);

task1.markCompleted();


const normalTask = new Task("Read chapter", new Date("2026-05-20"));
normalTask.markCompleted();  

const timedTask = new TimedTask("Timed quiz", new Date("2026-05-20"), 30);
timedTask.markCompleted();


//console.log("N.B: for status = true means done, status = false means not done")
console.log() //whitespace for easy readability
console.log(CSC.listTasks());
console.log()
console.log(CSC.listPendingTask());
console.log()
console.log(CSC.listCompletedTask());
console.log()
console.log(planner.listAllSubjects());
console.log()
console.log(planner.listAllTask());
