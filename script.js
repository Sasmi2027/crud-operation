document.addEventListener("DOMContentLoaded", function () {
    let popupoverlay = document.querySelector(".popup-overlay");
    let popupbox = document.querySelector(".popup-box");
    let addpopupbutton = document.getElementById("add-popup-button");

    addpopupbutton.addEventListener("click", function () {
        popupoverlay.style.display = "block";
        popupbox.style.display = "block";
    });
    // cancel button
    let cancelbutton = document.getElementById("cancel-student");
    cancelbutton.addEventListener("click", function (event) {
        event.preventDefault();
        popupoverlay.style.display = "none";
        popupbox.style.display = "none";
    });
// Add button
    let addstudentinput = document.getElementById("add-student");
    addstudentinput.addEventListener("click", function (event) {
        event.preventDefault();
        const newStudent = {
            studentname: document.getElementById("student-name").value,
            studentage: document.getElementById("student-age").value,
            studentemail: document.getElementById("student-email").value
        };
        let students = JSON.parse(localStorage.getItem("students")) || [];
        // check the all field fill
        if (newStudent.studentname === "" || newStudent.studentage === "" || newStudent.studentemail === "") {
            alert("Please fill all fields.");
            return ;
        }
        //check the email 
        let emailExists = students.some(stu => stu.studentemail === newStudent.studentemail);
        if (emailExists) {
            alert("Email is already registered. Please try with a different one.");
            return ;
        }
        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));

        popupoverlay.style.display = "none";
        popupbox.style.display = "none";
        view();
    });
   
    document.querySelector('table').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            deleteItem(event);
        }
        if (event.target.classList.contains('update')) {
            update(event);
        }
    });

    view(); // Call view on initial load
});
// delete
function deleteItem(event) {
    const button = event.target;
    const row = button.closest("tr");
    let studentemail = row.cells[2].innerText;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.studentemail !== studentemail);
    localStorage.setItem("students", JSON.stringify(students));
    row.remove();
}
//update
function update(event) {
    document.querySelector(".popup-update-box").style.display = "block";
    document.querySelector(".popup-overlay").style.display = "block";

    const row = event.target.closest("tr");
    let studentemail = row.cells[2].innerText;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let student = students.find(student => student.studentemail === studentemail);

    if (student) {
        document.getElementById("ustudent-name").value = student.studentname;
        document.getElementById("ustudent-age").value = student.studentage;
        document.getElementById("ustudent-email").value = student.studentemail;
    }
}
//update button
function updateStudent() {
    let updatename = document.getElementById("ustudent-name").value;
    let updateage = document.getElementById("ustudent-age").value;
    let updateemail = document.getElementById("ustudent-email").value;

    // Check if 'ustudent-name' field is required
    if (updatename.trim() === "") {
        alert("Student name is required.");
        return; 
    }
    if (updateage.trim() === "") {
        alert("Student age is required.");
        return; 
    }
    if (updateemail.trim() === "") {
        alert("Student email is required.");
        return; 
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let index = students.findIndex(student => student.studentemail === updateemail);
    
    if (index !== -1) {
        students[index] = {
            studentname: updatename,
            studentage: updateage,
            studentemail: updateemail
        };
        
        localStorage.setItem("students", JSON.stringify(students));
        document.querySelector(".popup-update-box").style.display = "none";
        document.querySelector(".popup-overlay").style.display = "none";
        view();
    } 
}


// create table
function view() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentDetailsInput = document.getElementById("studentDetails");
    let elements = "";

    students.forEach(record => {
        elements += `
            <tr>
                <td>${record.studentname}</td>
                <td>${record.studentage}</td>
                <td>${record.studentemail}</td>
                <td>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </td>
            </tr>
        `;
    });

    studentDetailsInput.innerHTML = elements;
}
// age check
function validateAge(input) {
    const value = input.value;
    if (value.length > 2 ) 
    {
      input.value = value.slice(1, 2); 
    }
  }
  