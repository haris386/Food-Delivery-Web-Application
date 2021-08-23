var x = "";
var title = "";
var todoKeys = [];
var userName = "";
var userID;
var Items = []

firebase.auth().onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    if (user) {
        userID = user.uid;

        firebase.firestore().collection("users").doc(user.uid).get()
            .then((snapshot) => {
                username.innerText = snapshot.data().RestName;

            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./login.html")
    }
});


var storage = firebase.storage();

function addItem(ev) {
    ev.preventDefault();
    var itemName = document.getElementById("itemName").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    var imageFile = document.getElementById("imageFile");
    var delivery = document.getElementById("delivery").value;
    var date = new Date().toLocaleDateString();
    var item = {
        itemName: itemName,
        price: price,
        category: category,
        delivery: delivery,
        uid: userID,
    };
    var db = firebase.firestore().collection(`Items`);
    db.add(item)
        .then(() => {
            console.log("Item added!");
            getTodos();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    return false;
}


function getTodos() {
    items = [];
    todoKeys = [];
    var docRef = firebase
        .firestore()
        .collection(`Items`);

    docRef
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                document.getElementById("addedItems").innerHTML = "";
                console.log(Items);
                items.forEach((item, index) => {
                    document.getElementById("addedItems").innerHTML += `
                     <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${index + 1}</h5>
                                <h5 class="card-title">${item.itemname}</h5>
                                <h6 class="card-title">${item.price}</h6>
                                </div>
                     </div>
                     
                     `;

                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
  

function logout() {
    firebase.auth().signOut()
        .then(function () {
            location.href = "../auth/index.html"
        })
        .catch(function (er) {
            console.log(er);
        })
}