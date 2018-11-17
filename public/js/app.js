var uname = '';
var psw = '';
var userExists;
var welcomeHtml = '';
var loggedIn = '';
var signInErrorHtml = '';
var theKudosHtml = '';
var userHtml = '';
var loggedInUserId = '';


$('.loginReturn').hide();

// Show modal for user to sign up or login on click of the login/signup button
$('.login').on('click', function () {
    $('.modal').show();
})

// Close model if user clicks on cancel button inside of modal
$('#btnCancel, #btnCancel2').on('click', function () {
    $('.modal, .modal2').hide();
})

// Close model if user clicks on the x button inside of modal
$('.close').on('click', function () {
    $('.modal, .modal2').hide();
})

// Show login screen again if user 
$('.loginReturn').on('click', function() {
    $('.modal').show();
})

// Show the modal that handles the give kudos functionality while 
// populating neccessary html elements inside of modal
$('.btnGiveKudos').on('click', function () {
    $.when(ajaxGetUsers().done(function (a1) {
        $('.receiverDiv').html(userHtml);
    }));
    $('.modal2').show();
})

// On click of give kudo button in modal, grab the vals of the kudo nesesscary, 
// post kudos to db and hide open modal
$('#btnGiveKudo2').on('click', function () {
    kudoTitle = $('#kudo-title').val();
    kudoBody = $('#kudo-body').val();
    kudoRecipient = $('.receiver').find('option:selected').val();
    $.when(ajaxGiveKudos().done(function(a1) {
        $('.modal2').hide();
    }))
})

// Call back end to get users
function ajaxGetUsers() {
    return $.ajax({
        type: "GET",
        url: `/api/users`,
        datatype: "json",
        success: getUsers,
    });
}

// Populate 'select reciever' html element with existing users in the db
function getUsers(response) {
    userHtml = `<select class="w3-select w3-border w3-animate-zoom receiver">`;
    userHtml += `<option value="" disabled selected>Select Receiver</option>`;
    for (let i = 0; i < response.length; i++) {
        if (!(response[i].username === uname)) {
            userHtml += `<option class="w3-bar-item w3-button" value="${response[i]._id}">${response[i].username}</option>`;
        }
    }
    userHtml += `</select>`;
}


// On click of the login button, store values of uname and psw inputs, 
// check if form is valid, attempt to login. 
$('#btnLogin').on('click', function () {
    uname = $('#uname').val();
    psw = $('#psw').val();
    if (validateForm()) {
        $.when(ajaxLogin()).done(function (a1) {
            if (loggedIn) {
                $('.welcome').html(welcomeHtml);
                $('.modal').hide();
                $('.intro').hide();
                $.when(ajaxGetKudos().done(function (a2) {
                    $('.kudosDiv').html(theKudosHtml);
                    $('.btnGiveKudos').show();
                    $('.loginReturn').show();
                }))
            } else {
                $('.errMsg').html(welcomeHtml);
            }
        })
    } else {
        $('.errMsg').html(signInErrorHtml);
    }
})

// On click of the sign up button, check if form is valid, and via an ajax call,
// check to see if the user already exists. 
$('#btnSignUp').on('click', function () {
    uname = $('#uname').val();
    if (validateForm()) {
        $.when(ajaxDoesUserExist()).done(function (a1) {
            if (userExists) {
                $('.errMsg').html(signInErrorHtml);
            } else {
                psw = $('#psw').val();
                $.when(ajaxSignup()).done(function (a2) {
                    $('.welcome').html(welcomeHtml);
                    $('.modal').hide();
                    $('.intro').show();
                    $('.welcome').show();
                })
            }
        })
    } else {
        $('.errMsg').html(signInErrorHtml);
    }
})

// Call back end to post kudos to db
function ajaxGiveKudos() {
    return $.ajax({
        type: "POST",
        url: `/api/kudos/${kudoTitle}&${kudoBody}&${loggedInUserId}&${kudoRecipient}`,
        datatype: "json"
    });
}

// Call the back end to authenticate user
function ajaxLogin() {
    console.log('Made it to ajax for login');
    return $.ajax({
        type: "GET",
        url: `/api/login/${uname}&${psw}`,
        datatype: "json",
        success: getLogin,
    });
}

// If user successfully logged in, welcome them, else inform them of error
function getLogin(response) {
    if (response.success) {
        loggedInUserId = response._id;
        console.log("********* THE USER ID IS: " + loggedInUserId);
        welcomeHtml = `<h2>Welcome ${uname}</h2><hr>`;
        loggedIn = true;
    } else {
        welcomeHtml = `<h5 style="color: red;">Please make sure you have entered the correct username/password.</h5>`;
        loggedIn = false;
    }
}

// Call backend to sign up a user
function ajaxSignup() {
    return $.ajax({
        type: "POST",
        url: `/api/user/${uname}&${psw}`,
        datatype: "json",
        success: signup,
    });
}

// If signup is successful, populate welcome html div and set loggedIn variable to true
function signup(response) {
    if (response.success) {
        welcomeHtml = `<h2>Welcome ${uname}</h2>`;
        loggedIn = true;
    } else {
        loggedIn = false;
    }
}

// Signup New User
function ajaxDoesUserExist() {
    return $.ajax({
        type: "GET",
        url: `/api/signup/${uname}`,
        datatype: "json",
        success: doesUserExist,
    });
}

// Checks to see if a user currently exists in the db, if so, inform user
function doesUserExist(response) {
    userExists = response.success;
    if (userExists) {
        signInErrorHtml = `<h5 style="color: red;">We're sorry, the user name you have selected already exists. Please choose a different user name.</h5>`;
    }
}

// Call back end to get kudos from db
function ajaxGetKudos() {
    return $.ajax({
        type: "GET",
        url: `/api/kudos`,
        datatype: "json",
        success: getKudos,
    });
}

// Populate html element that handles the kudos from db with kudos from db 
function getKudos(response) {
    theKudosHtml = '';
    for (let i = 0; i < response.length; i++) {
        theKudosHtml += `<h2>${response[i].title}</h2>`;
        theKudosHtml += `<div class="kudoBody">${response[i].body}</div>`;
        theKudosHtml += `<h5>From: ${response[i].fromUserId.username}</h5>`;
        theKudosHtml += `<h5>To: ${response[i].toUserId.username}</h5>`;
        theKudosHtml += "<hr>";
    }
    return theKudosHtml;
}

// Check to see if a user entered a user and pw, if not, inform them
function validateForm() {
    let retVal = false;
    if (($('#uname').val() && $('#psw').val())) {
        retVal = true;
    } else {
        signInErrorHtml = `<h5 style="color: red;">Please enter both a username and a password.</h5>`;
    }
    return retVal;
}
