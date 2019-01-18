// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxyqOXzuvtsGMMemiIVfOIgnSnj9BF6v4",
    authDomain: "aiiburtel-5a752.firebaseapp.com",
    databaseURL: "https://aiiburtel-5a752.firebaseio.com",
    projectId: "aiiburtel-5a752",
    storageBucket: "aiiburtel-5a752.appspot.com",
    messagingSenderId: "39758121316"
};
var app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore(app);

// Disable deprecated features
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// function loadMessages() {
//     // Loads the last 12 messages and listen for new ones.
//     var callback = function (snap) {
//         var data = snap.val();
//         displayMessage(snap.key, data.name, data.phoneNo, data.futureAppointmentDate);
//     };

//     firebase.database().ref('/vendorCallSummary/').limitToLast(12).on('child_added', callback);
//     firebase.database().ref('/vendorCallSummary/').limitToLast(12).on('child_changed', callback);
// }
loadMessages = () => {
    db.collection("vendorCallSummary").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);
            displayMessage(doc.id, doc.data().name, doc.data().phoneNo, doc.data().futureAppointmentDate);
        });
    });
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<tr class="highlight">' +
    '<td class="name"></td>' +
    '<td class="contact"></td>' +
    '<td class="appointmentDate"></td>' +
    '</tr>'
    ;

// Displays a Message in the UI.
function displayMessage(key, name, phone, appointment) {
    var tbody = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!tbody) {
        var container = document.createElement('tbody');
        container.innerHTML = MESSAGE_TEMPLATE;
        tbody = container.firstChild;
        tbody.setAttribute('id', key);
        messageListElement.appendChild(tbody);
    }

    tbody.querySelector('.name').textContent = name;
    tbody.querySelector('.contact').textContent = phone;
    tbody.querySelector('.appointmentDate').textContent = appointment;


}
var messageListElement = document.getElementById('summary');

loadMessages();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'top'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });

});

document.querySelector(".collapsible-header").addEventListener("click", toggle);
document.querySelector(".fixed-action-btn").addEventListener("hover", toggleAction);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggle() {
    document.querySelector(".collapsible-body").classList.toggle("active")
}
function toggleAction() {
    document.querySelector(".fixed-action-btn").classList.toggle("activeAction")
}
function slide() {
    document.querySelector(".sidenav").classList.toggle("listslide");
}