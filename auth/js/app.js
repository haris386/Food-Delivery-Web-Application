// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName() {
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if (userSurname === "") {
      flag = true;
    }
    if (flag) {
      document.getElementById("userFullNameError").style.display = "block";
    } else {
      document.getElementById("userFullNameError").style.display = "none";
    }
  }
  // xxxxxxxxxx User Surname Validation xxxxxxxxxx
  function checkUserSurname() {
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if (userSurname === "") {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSurnameError").style.display = "block";
    } else {
      document.getElementById("userSurnameError").style.display = "none";
    }
  }
  // xxxxxxxxxx Email Validation xxxxxxxxxx
  function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userEmailError").style.display = "block";
    } else {
      document.getElementById("userEmailError").style.display = "none";
    }
  }
  // xxxxxxxxxx Password Validation xxxxxxxxxx
  function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userPasswordError").style.display = "block";
    } else {
      document.getElementById("userPasswordError").style.display = "none";
    }
  }
  // xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
  function checkUserBio() {
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if (flag) {
      document.getElementById("userBioError").style.display = "block";
    } else {
      document.getElementById("userBioError").style.display = "none";
    }
  }
  
  let signup = (event) => {
    console.log("event :", event);
    event.preventDefault();
    var resname = document.getElementById("restaurantname").value;
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    // var userFullName = document.getElementById("userFullName").value;
    // var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    // var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
  
    // var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);
  
   
   
    if (checkUserEmailValid == null) {
      return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
      return checkUserPassword();
    } else {
      // let username = document.getElementById("username").value;
      // let email = document.getElementById("email").value;
      // let password = document.getElementById("password").value;
      const userData = {
        resname,
        country,
        city,  
        userEmail,
        userPassword,
      };
      console.log("userData :", userData);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("user :", user);
          return firebase
            .firestore()
            .collection("users")
            .doc(userCredential.user.uid)
            .set({
              RestName: resname,
              Country: country,
              City: city,
              Email: userEmail,
              Password: userPassword,
              uid: user.uid,
            })
            .then((value) => {
              console.log("Login Done");
              swal({
                title: "Sign-Up Succesfull",
                text: "Your Account Has Been Registered",
                icon: "success",
                button: "Okay!",
              }).then((value) => {
                location.href = "../index.html";
              });
            });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
          swal({
            title: "Sign-Up Failed",
            text: errorMessage,
            icon: "error",
            button: "Okay!",
          });
          // ..
        });
    }
  };
  
  // xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
  // xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
  function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSIEmailError").style.display = "block";
    } else {
      document.getElementById("userSIEmailError").style.display = "none";
    }
  }
  // xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
  function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSIPasswordError").style.display = "block";
    } else {
      document.getElementById("userSIPasswordError").style.display = "none";
    }
  }
  
  let login = (event) => {
    console.log("event :", event);
    event.preventDefault();
  
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
  
    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);
  
    if (checkUserEmailValid == null) {
      return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
      return checkUserSIPassword();
    } else {
      const userData = {
        userSIEmail,
      };
      console.log("userData :", userData);
      firebase
        .auth()
        .signInWithEmailAndPassword(userSIEmail, userSIPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("user :", user);
          swal({
            title: "Log-In Succesfull",
            text: "Click 'Okay!' for dashboard",
            icon: "success",
            button: "Okay!",
          }).then((value) => {
            location.href = "../Dashboard/dashboard.html";
          });
  
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
          swal({
            title: "Log-In Succesfull",
            text: errorMessage,
            icon: "error",
            button: "Retry?",
          });
          // ..
        });
    }
  };
  
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.href = "../index.html";
        console.log("working")
      })
      .catch((error) => {
        // An error happened.
      });
    return false;
  }