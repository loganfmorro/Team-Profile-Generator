// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, college) {
        super(name, id, email);
        this.college = college;
    }
    getEmployeeRole() { return "Intern"; }
    getEmployeeCollege() { return this.college; }
}

module.exports = Intern;