function signUp() {

    let userinfo = {
        name: "",
        username: "",
        password: "",
        email: ""
    }

    if (document.querySelector("#supfname").value == "" || document.querySelector("#supuser").value == "" || document.querySelector("#suppassword").value == "" || document.querySelector("#supemail").value == "") {
        document.querySelector("#supalert").removeAttribute("hidden")
        return
    }

    userinfo.name = document.querySelector("#supfname").value;
    document.querySelector("#supfname").value = '';
    document.querySelector("#supfname").focus();

    userinfo.username = document.querySelector("#supuser").value;
    document.querySelector("#supuser").value = '';

    userinfo.password = document.querySelector("#suppassword").value;
    document.querySelector("#suppassword").value = '';

    userinfo.email = document.querySelector("#supemail").value;
    document.querySelector("#supemail").value = '';

    document.querySelector("#supalert").hidden = true;

    var users = JSON.parse(localStorage.getItem("users"));

    if (users === null) {
        users = [];
    }

    if (users.some(user => {
        return user.username == userinfo.username
    })) {
        alert("That username is already in use. Please choose a different username.")
    } else {
        users.push(userinfo);

        localStorage.setItem("users", JSON.stringify(users));

        document.querySelector("#returntologin").removeAttribute("hidden")
    }
}

function logIn() {
    if (document.querySelector("#loginpassword").value == "" || document.querySelector("#loginusername").value == "") {
        document.querySelector("#loginalert").removeAttribute("hidden")
        return
    }

    users = JSON.parse(localStorage.getItem('users'));

    let index;

    if (users.some((user, i) => {
        index = i;
        return user.username == document.querySelector("#loginusername").value && user.password == document.querySelector("#loginpassword").value;
    })) {
        localStorage.setItem("userlog", JSON.stringify(users[index]));

        window.location.href = "Main.html";
    } else {
        alert("Username or Password is incorrect.");
    }

}

function logout() {
    localStorage.removeItem("userlog");
    window.location.href = "Login.html"
}

function submitURL() {

    var links = {
        sitename: "",
        url: ""
    }

    if (document.querySelector("#siteinputname").value == "" || document.querySelector("#urlinputname").value == "") {
        document.querySelector("#urlalert").removeAttribute("hidden")
        return
    }

    var userlog = JSON.parse(localStorage.getItem("userlog"));

    document.querySelector("#urlalert").hidden = true;

    links.sitename = document.querySelector("#siteinputname").value;
    document.querySelector("#siteinputname").value = '';
    document.querySelector("#siteinputname").focus();

    links.url = document.querySelector("#urlinputname").value;
    document.querySelector("#urlinputname").value = '';

    let alllinks = JSON.parse(localStorage.getItem("all links"));

    if (alllinks == null) {
        alllinks = {};
    }

    if (alllinks[userlog.username] == null) {
        alllinks[userlog.username] = [];
    }

    alllinks[userlog.username].push(links);

    localStorage.setItem("all links", JSON.stringify(alllinks));

    displayURLlist()
}

function displayURLlist() {

    var userlog = JSON.parse(localStorage.getItem("userlog"));
    let alllinks = JSON.parse(localStorage.getItem("all links"));

    let links = ""; 
   

    for (let i in alllinks[userlog.username]) {
        links += `<div class="p-4 mb-3 page text-center" id="page${i * 1 + 1}" style="background-color: gainsboro; border-radius: 20px;">
                        <span style="font-size: 20px;">${alllinks[userlog.username][i].sitename}</span>
                        &nbsp;
                        &nbsp;
                        <button type="button" class="btn btn-light" onclick="window.location.href='${alllinks[userlog.username][i].url}'">Visit Site</button>
                        <button class="btn btn-success" onclick= "editURL(${i * 1})" data-bs-toggle="modal" data-bs-target="#editurlmodal">Edit URL</button> 
                        <button class="btn btn-danger" onclick= "deleteIssue(${i * 1})">Delete</button> 
        </div>`
    }

    document.querySelector("#links").innerHTML = links

    $('#urlpagination').twbsPagination('destroy');

    $('#urlpagination').twbsPagination({
        totalPages: alllinks[userlog.username].length,
        // the current page that show on start
        startPage: 1,

        // maximum visible pages
        visiblePages: 5,

        // Text labels
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',

        // callback function
        onPageClick: function (event, page) {
            $('.page-active').removeClass('page-active');
            $('#page' + page).addClass('page-active');
        },
    });

    
}

function editURL(i) {
    var userlog = JSON.parse(localStorage.getItem("userlog"));
    let alllinks = JSON.parse(localStorage.getItem("all links"));

    document.querySelector("#upsiteinputname").value = alllinks[userlog.username][i].sitename
    document.querySelector("#upurlinputname").value = alllinks[userlog.username][i].url
    document.querySelector("#itemtoupdate").value = i
    
}

function deleteIssue(i) {
    var userlog = JSON.parse(localStorage.getItem("userlog"));
    let alllinks = JSON.parse(localStorage.getItem("all links"));


    alllinks[userlog.username].splice(i, 1)


    localStorage.setItem("all links", JSON.stringify(alllinks));

    displayURLlist()
}

function updateurl(){
    var userlog = JSON.parse(localStorage.getItem("userlog"));
    let alllinks = JSON.parse(localStorage.getItem("all links"));

    var updurl = {
        sitename:  document.querySelector("#upsiteinputname").value,
        url: document.querySelector("#upurlinputname").value
    }

    let i = document.querySelector("#itemtoupdate").value

    alllinks[userlog.username][i] = updurl

    localStorage.setItem("all links", JSON.stringify(alllinks));

    $("#editurlmodal").modal("hide")

    displayURLlist()

    // let modal = document.querySelector("#editurlmodal");

    // modal.setAttribute("data-bs-dismiss","modal")
}