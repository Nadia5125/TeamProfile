const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const fs = require("fs");
const open = require ("open")


function promptUser() {
    return inquirer
      .prompt([
        {
          message: "Please enter your name",
          name: "name",
          type: "input"
        },
        {
          message: "Please enter your id",
          name: "id",
          type: "any"
        },
        {
          message: "Please enter your email",
          name: "email",
          type: "input",
          default: () => {},
          validate: function (email) {
  
              valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
              if (valid) {
                  return true;
              } else {
                  console.log(".  Please enter a valid email")
                  return false;
              }
          }
        },
        {
          message: "Please enter your Role",
          name: "role",
          type: "list",
          choices: [
            'Manager',
            'Engineer',
            'Intern',
          ]
        }
      ]);
  }

  function generateRoleQ(input) {
    if (input.role === 'Manager') {
      return inquirer.prompt([
        {
          
          message: "Enter your office number format 123 ",
          name: "officenumber",
          type: "any",
          default: () => {},
          validate: function (officeNumber) {  
              
              valid = /^(\()?\d{3}$/.test(officeNumber)
  
              if (valid) {
                  return true;
              } else {
                  
                  console.log(".  Enter a valid office number & format 123 ")
                  return false;
              }
          }
        }
      ])
    }
  
    if (input.role === 'Intern') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'school',
          message: 'Enter name of your School'
        }
      ]);
    }
  
    if (input.role === 'Engineer') {
      return inquirer.prompt([
        {
          message: "Enter your github account name",
          name: "github",
          type: "input"
        }
      ])
    }
  }

  function addCards(response, roleQ) {
      if (response.role === 'Manager') {
        const officenumber = roleQ.officenumber;
        const managerCard =
          `<div class="col-4">
                  <div class="card bg-primary mb-3" style="width: 20rem;">
                      <div class="card-header text-white">
                          <h5 class="card-title">${response.name}</h5>
                          <h5 class="card-subtitle">Manager</h5>
                      </div>
                      <div class="card-body bg-light">
                          <div class="bg-white m-3">
                              <ul class="list-group">
                                  <li class="list-group-item">ID: ${response.id}</li>
                                  <li class="list-group-item">Email: ${response.email}</span></li>
                                  <li class="list-group-item">Office Number: ${officenumber}</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>`;
    
        try {
          fs.appendFileSync("./output/main.html", `${managerCard}`);
        }
        catch {
          console.error("Not able to write to engineer file.");
        };
      }
  
      else if (response.role === 'Engineer') {
          const github = roleQ.github;
          const engineerCard =
            `<div class="col-4">
                    <div class="card bg-primary mb-3" style="width: 20rem;">
                        <div class="card-header text-white">
                            <h5 class="card-title">${response.name}</h5>
                            <h5 class="card-subtitle">Engineer</h5>
                        </div>
                        <div class="card-body bg-light">
                            <div class="bg-white m-3">
                                <ul class="list-group">
                                    <li class="list-group-item">ID: ${response.id}</li>
                                    <li class="list-group-item">Email: ${response.email}</span></li>
                                    <li class="list-group-item">Github: ${github}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
      
          try {
            fs.appendFileSync("./output/main.html", `${engineerCard}`);
          }
          catch {
            console.error("Not able to write to engineer file.");
          }
        }
  
        else if (response.role === 'Intern') {
          const school = roleQ.school;
          const engineerCard =
            `<div class="col-4">
                    <div class="card bg-primary mb-3" style=" width: 20rem;">
                        <div class="card-header text-white">
                            <h5 class="card-title">${response.name}</h5>
                            <h5 class="card-subtitle">Intern</h5>
                        </div>
                        <div class="card-body bg-light">
                            <div class="bg-white m-3">
                                <ul class="list-group">
                                    <li class="list-group-item">ID: ${response.id}</li>
                                    <li class="list-group-item">Email: ${response.email}</span></li>
                                    <li class="list-group-item">School: ${school}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
      
          try {
            fs.appendFileSync("./output/main.html", `${engineerCard}`);
          }
          catch {
            console.error("Not able to write to engineer file.");
          }
        }
      }
      


    function addEmp() {
        return inquirer.prompt([
          {
            message: "Do you want to add an employee to the team?",
            name: "add",
            type: "list",
            choices: [
              'yes',
              'no',
            ]
          }
        ])
      };

      function iterate(answer) {
        if (answer.add === 'yes') {
          initiate()
        }
        else {
          try {
            fs.appendFileSync("./output/main.html", `</div></div></body></html>`);
          }
          catch {
            console.error("Not able to write to engineer file.");
          }
          process.exit(0);
        }
      };

      async function initiate() {
        try {
          const addUser = await promptUser();
          const role = await generateRoleQ(addUser);
          await addCards(addUser, role);
          const answer = await addEmp();
          await iterate(answer);
        } catch (err) {
          console.log(err);
        }
      };
      
      var content;
      function resetHtml(){
        fs.readFile('./templates/main.html', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
           processFile();       
        }); 
        }

        function processFile() {
          fs.writeFile("./output/main.html", content, function (err) {
            if (err) {
              throw err;
            }
          });
        }
               
        resetHtml();
        initiate();