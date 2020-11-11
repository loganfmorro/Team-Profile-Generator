const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.getEmployeeRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getEmployeeRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getEmployeeRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getEmployeeName());
  template = replacePlaceholders(template, "role", manager.getEmployeeRole());
  template = replacePlaceholders(template, "email", manager.getEmployeeEmail());
  template = replacePlaceholders(template, "id", manager.getEmployeeId());
  template = replacePlaceholders(template, "officeNumber", manager.getManagerOffice());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getEmployeeName());
  template = replacePlaceholders(template, "role", engineer.getEmployeeRole());
  template = replacePlaceholders(template, "email", engineer.getEmployeeEmail());
  template = replacePlaceholders(template, "id", engineer.getEmployeeId());
  template = replacePlaceholders(template, "github", engineer.getEmployeeGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getEmployeeName());
  template = replacePlaceholders(template, "role", intern.getEmployeeRole());
  template = replacePlaceholders(template, "email", intern.getEmployeeEmail());
  template = replacePlaceholders(template, "id", intern.getEmployeeId());
  template = replacePlaceholders(template, "school", intern.getEmployeeCollege());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
