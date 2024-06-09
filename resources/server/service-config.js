

// Config
function close() {
    document.getElementById("firebird").style.display = "none";
}
function changeemailformopen() {
    document.getElementById("changeEmailForm").style.display = "block";
}


function signup() {
    document.getElementById("email").style.display = "none";
    document.getElementById("resetPasswordBtn").style.display = "none";
    document.getElementById("password").style.display = "none";
    document.getElementById("textbuttonsignup").style.display = "none";
    document.getElementById("loginbutton").style.display = "none";
    document.getElementById("registerbutton").style.display = "block"
    document.getElementById("textbuttonlogin").style.display = "block";
    document.getElementById("email-signup").style.display = "block";
    document.getElementById("password-sign").style.display = "block";
    document.getElementById("username-signup").style.display = "block";
    document.getElementById("legalinfo").textContent = "Currently it is not possible to register new accounts, if you want to use firebird, or Arisoft Chat, create an Arisoft Account.";
    document.getElementById("communityguidlines").style.display = "block";
    document.getElementById("birthdateInputsignup").style.display = "block";
    document.getElementById("headerauthtext").textContent = "Sign Up";
    document.getElementById("pauthtext").textContent = "Welcome to Firebird";
}



function changelogin() {
    document.getElementById("email").style.display = "block";
    document.getElementById("password").style.display = "block";
    document.getElementById("email-signup").style.display = "none";
    document.getElementById("password-sign").style.display = "none";
    document.getElementById("username-signup").style.display = "none";
    document.getElementById("registerbutton").style.display = "none"
    document.getElementById("loginbutton").style.display = "block";
    document.getElementById("textbuttonlogin").style.display = "none";
    document.getElementById("textbuttonsignup").style.display = "block";
    document.getElementById("resetPasswordBtn").style.display = "block";
    document.getElementById("legalinfo").textContent = "By signing in, you accept our updated Terms of Service, Privacy Policy, and Community Guidelines.";
    document.getElementById("communityguidlines").style.display = "none";
    document.getElementById("birthdateInputsignup").style.display = "none";
    document.getElementById("headerauthtext").textContent = "Log In";
    document.getElementById("pauthtext").textContent = "Welcome Back!";
}

//Auth Modal
function openAuthModal() {
    document.getElementById("authModal").style.display = "block"
}

function closeAuthModal() {
    document.getElementById("authModal").style.display = "none";
}
//Add Friend Modal
function openAddFriendModal() {
    document.getElementById("AddFriendModal").style.display = "block";
}

function closeAddFriendModal() {
    document.getElementById("AddFriendModal").style.display = "none";
}
// Log Out Modal

function openlogoutmodal() {
    document.getElementById("LogOutModal").style.display = "block";
}

function closelogoutmodal() {
    document.getElementById("LogOutModal").style.display = "none";
}

function openresetmodal() {
    document.getElementById("ResetPassword").style.display = "block";
}

function closeresetmodal() {
    document.getElementById("ResetPassword").style.display = "none";
}

// Show Profile Settings Tab

function openTab(evt, tabName) {
    var i, tabcontent, tabs;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "none";
    evt.currentTarget.className += " active";
}
function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Moderation Panel PopUp

function upgradeTofounders() {
    var width = 900;
    var height = 900;

    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);

    var options = `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no,status=no`;

    window.open("founders/purchase.html", "Popup", options);
}


function globalchat() {
    var width = 900;
    var height = 900;

    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);

    var options = `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no,status=no`;

    window.open("founders/global-chat.html", "Popup", options);
}




// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5IPrj-v6VpXiOItAr0fdAipOZHwH9A5U",
    authDomain: "vancober-firebird-source-code.firebaseapp.com",
    projectId: "vancober-firebird-source-code",
    storageBucket: "vancober-firebird-source-code.appspot.com",
    messagingSenderId: "697757903991",
    appId: "1:697757903991:web:05118fe623398c5eef2a72"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


function reloadfriends() {
    loadFriendsAndRequests()
}



function checkIfUserDisabledOrDeleted(uid) {
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage")
    firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
        })
        .catch((error) => {
            if (error.code === 'auth/user-disabled') {
                errorMessage.style.display = "block"
                successMessage.style.display = "none"
                errorMessage.innerText = "Your account has been banned. If you believe this is a mistake, please contact us to review your case. You have a total of 15 days to request an appeal.";

                logout(); // Call your logout function to sign out
            } else if (error.code === 'auth/user-token-expired') {
                errorMessage.style.display = "block"
                successMessage.style.display = "none"
                errorMessage.innerText = "Error establishing the connection. This may be because your account has been deleted or the ID has expired. Please log in again to check.";

                logout(); // Call your logout function to sign out
            } else {
                console.error('Error while checking user:', error);
            }
        });
}

function displayName() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Usuario está logueado
            const uid = user.uid;
            const userRef = firebase.firestore().collection("users").doc(uid);

            userRef.get().then((doc) => {
                if (doc.exists) {
                    // Asignar el nombre del usuario al elemento con id 'username-welcome'
                    document.getElementById('username-welcome').textContent = "" + doc.data().displayName;
                } else {
                    console.log("No se encontró documento");
                    document.getElementById('username-welcome').textContent = "Usuario no encontrado";
                }
            }).catch((error) => {
                console.log("Error al obtener el documento:", error);
                document.getElementById('username-welcome').textContent = "Error al cargar el usuario";
            });
        } else {
            // Usuario no está logueado
            console.log("Usuario no logueado");
            document.getElementById('username-welcome').textContent = "Usuario no logueado";
        }
    });
}




// Authentication status listener
document.addEventListener('DOMContentLoaded', function () {
    console.log("loading data")
    firebase.auth().onAuthStateChanged(async function (user) {
        document.getElementById("spinner").style.display = "none";
        reloadfriends()

        if (user) {

            // Ajustes de la UI para usuarios logueados
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("authModal").style.display = "none";
            document.getElementById("chat-container").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("loginBtn").style.display = "none";
            console.log("Attemping to loading firebase")

            const uid = user.uid;
            const userRef = firebase.firestore().collection('users').doc(uid);
            const userDoc = await userRef.get();
            let userData = userDoc.data() || {};

            console.log("Attemping to loading firebase data")

            if (!userDoc.exists) {
                await userRef.set({
                    displayName: '',
                    email: user.email,
                    active: true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    birthdate: null,
                    age: null,
                    agePermit: true
                });
                userData = {
                    displayName: '',
                    email: user.email
                };
                console.log("Documento de usuario nuevo creado.");
            }

            // Revisar si la cuenta está deshabilitada o eliminada

            if (!window.checkUserInterval) {
                window.checkUserInterval = setInterval(() => checkIfUserDisabledOrDeleted(uid), 1000);
            }

            // Actualizar la UI con los datos del usuario
            console.log("Attemping to loading user data")
            document.getElementById('username-value').textContent = userData.displayName || 'The displayname was not found.';
            document.getElementById('user-email-value').textContent = user.email || 'The email was not found.';
            document.getElementById("user-uid-value").placeholder = user.uid;

            // JavaScript para asignar el placeholder

            console.log("UI actualizada con los datos del usuario.");
        } else {
            console.log("Usuario ha cerrado sesión");

            // Ajustes de la UI para usuarios deslogueados
            document.getElementById("foundersbutton").style.display = "none";
            document.getElementById("authModal").style.display = "block";
            document.getElementById("loginBtn").style.display = "block";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("main").style.display = "block";
            document.getElementById("chat-container").style.display = "block";
        }
    });
});


// Function to log out
function logout() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out');
        // 
        window.location.reload()

    });
}

// Show spinner
function showSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

// Hide spinner
function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

// Login function
function login() {
    showSpinner();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            hideSpinner();
            // You can add any successful login handling here
        })
        .catch(error => {
            hideSpinner();
            const errorMessage = document.getElementById("errorMessage");
            const successMessage = document.getElementById("successMessage");

            if (error.code === 'auth/user-disabled') {
                errorMessage.innerText = "Your account has been permanently suspended, and as a result, you are no longer able to log in.";

            } else if (error.code === 'auth/internal-error') {
                errorMessage.style.display = "block"
                successMessage.style.display = "none"
                errorMessage.innerText = "The password or email address provided does not exist in our database.";



            } else {
                errorMessage.innerText = error.message;
            }

            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        });
}


// Register function
function register() {
    showSpinner();
    console.log("Starting registration process...");
    console.log(document.getElementById("email-signup")); // Check if this is null
    const email = document.getElementById("email-signup").value;

    console.log(document.getElementById("password-sign")); // Check if this is null
    const password = document.getElementById("password-sign").value;

    console.log(document.getElementById("username-signup")); // Check if this is null
    const displayName = document.getElementById("username-signup").value;

    console.log(document.getElementById("birthdateInputsignup")); // Check if this is null
    const birthdateString = document.getElementById("birthdateInputsignup").value;


    if (!email || !password || !displayName || !birthdateString) {
        displayError("Please fill in all required fields.");
        console.error("Validation failed: missing fields");
        hideSpinner();
        return;
    }

    if (!isValidAge(birthdateString)) {
        displayError("You must be at least 14 years old to register.");
        console.error("Validation failed: age not valid");
        hideSpinner();
        return;
    }

    const usersRef = firebase.firestore().collection('users');
    usersRef.where('displayName', '==', displayName).get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                throw new Error("Display name already in use. Please choose a different name.");
            }
            console.log("Display name is available");
            return firebase.auth().createUserWithEmailAndPassword(email, password);
        })
        .then(userCredential => {
            console.log("User created, updating profile...");
            document.getElementById("firebird").style.display = "block";
            return userCredential.user.updateProfile({ displayName: displayName });
        })
        .then(() => {
            const user = firebase.auth().currentUser;
            console.log("Sending verification email...");
            user.sendEmailVerification().then(() => {
                console.log("Verification email sent");
            });
            // Store additional details in Firestore under the user's UID.
            return usersRef.doc(user.uid).set({
                displayName: displayName,
                birthdate: birthdateString,
                InitialEmail: email,
            });
        })
        .then(() => {
            console.log("Reloading user data...");
            checkVerificationAndReload();
        })
        .catch(error => {
            displayError(error.message);
            console.error("Error in registration process: ", error);
        })
        .finally(() => {
            hideSpinner();
        });
}


function checkVerificationAndReload() {
    const user = firebase.auth().currentUser;
    console.log("Checking email verification status...");
    if (!user.emailVerified) {
        console.log("Email not verified");
        const element = document.getElementById("AccountNotVerified");
        if (element.style.display !== "block") {
            element.style.display = "block";  // Mostrar mensaje si no está visible
        }
    } else {
        console.log("Email verified, registration successful!");
        displaySuccess("Registration successful!");
    }
}



function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}

function isValidAge(birthdateString) {
    const birthdate = new Date(birthdateString);
    return calculateAge(birthdate) >= 14;
}

function displayError(message) {
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("successMessage").style.display = "none";
    hideSpinner();
}

function displaySuccess(message) {
    document.getElementById("successMessage").innerText = message;
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";
}


// Function to show a loading spinner (You need to implement this based on your HTML and CSS)
function showSpinner() {
    // Add your implementation here to show a spinner or loading indicator
}

// Function to hide a loading spinner
function hideSpinner() {
    // Add your implementation here to hide the spinner or loading indicator
}


var form = document.getElementById('requestForm');

// Agrega un evento 'submit' al formulario



// Agrega escuchadores de eventos u otros inicializadores necesarios aquí


// Reset Password function
function resetPassword() {
    var email = document.getElementById("resetpasswordinput").value;

    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                document.getElementById("resetpasswords").innerText = "Password reset email sent!";
                document.getElementById("resetpasswords").style.display = "block";
                document.getElementById("resetpasswordtext").style.display = "none";
                document.getElementById("ResetPassword").style.display = "none"
            })
            .catch(error => {
                document.getElementById("resetpasswordtext").innerText = error.message;
                document.getElementById("resetpasswordtext").style.display = "block";
                document.getElementById("resetpasswords").style.display = "none";

            });


    } else {
        document.getElementById("resetpasswordtext").innerText = "Please enter your email address";
        document.getElementById("resetpasswordtext").style.display = "block";
        document.getElementById("resetpasswords").style.display = "none";
    }
}

// Asumiendo que 'firebase' ha sido inicializado

async function updateProfile() {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    if (!user) {
        alert('No user logged in');
        return;
    }

    const uid = user.uid;
    const emailInput = document.getElementById('emailInput').value.trim();
    const usernameInput = document.getElementById('newusernameInput').value.trim();
    const profilePicFile = document.getElementById('profilePictureInput').files[0];

    let updates = {};  // Objeto para acumular actualizaciones de Firestore
    let needUpdate = false;  // Bandera para detectar si necesitamos actualizar Firestore

    // Actualiza el nombre de usuario si ha cambiado
    if (usernameInput && usernameInput !== user.displayName) {
        updates.displayName = usernameInput;
        needUpdate = true;
    }

    // Actualiza el correo electrónico si ha cambiado y reautentica si es necesario
    if (emailInput && emailInput !== user.email) {
        try {
            await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, prompt('Please enter your current password:')));
            await user.updateEmail(emailInput);
            await user.sendEmailVerification();
            updates.email = emailInput;
            alert('Please verify your new email address. Check your inbox for the verification email.');
            needUpdate = true;
        } catch (error) {
            console.error('Failed to update email:', error);
            alert('Failed to update email: ' + error.message);
            return;
        }
    }

    // Sube la imagen de perfil si se ha añadido una nueva
    let profilePicUrl;  // Definir la variable fuera del bloque if para asegurar su disponibilidad

    // Asegurarse de que el archivo 'profilePicFile' existe
    if (profilePicFile) {
        // Referencia al Storage donde se guardará la imagen
        const storageRef = firebase.storage().ref(`users/${uid}/ProfilePicture/${profilePicFile.name}`);

        // Subir el archivo al Storage de Firebase
        storageRef.put(profilePicFile).then(() => {
            // Obtener la URL de descarga del archivo subido
            storageRef.getDownloadURL().then((url) => {
                // Aquí ya tienes la URL de la imagen, procede a actualizar Firestore
                updateProfilePictureInFirestore(uid, url);
            }).catch(error => {
                console.error("Error al obtener la URL de descarga:", error);
                alert('Error al obtener la URL de descarga: ' + error.message);
            });
        }).catch(error => {
            console.error("Error al subir la imagen de perfil:", error);
            alert('Error al subir la imagen de perfil: ' + error.message);
        });
    }


    // Ahora puedes usar la variable `profilePicUrl` en cualquier parte del código que sigue después de este bloque.


    // Ahora puedes usar la variable `profilePicUrl` en cualquier parte del código que sigue después de este bloque.


    // Si hay actualizaciones, aplícalas todas a Firestore de una vez
    if (needUpdate) {
        await db.collection('users').doc(uid).update(updates);
        alert('Profile updated successfully!');
    } else {
        alert('No changes detected to update.');
    }
}

function loadFriendsAndRequests() {
    const myUid = firebase.auth().currentUser.uid;
    const friendsList = document.getElementById('friends');
    friendsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos


    // Cargar amigos aceptados
    db.collection('friendRequests')
        .where('receiverId', '==', myUid)
        .where('status', '==', 'accepted')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                friendsList.innerHTML += '<li>No accepted friends.</li>';
            }
            snapshot.forEach(doc => {
                const friendUid = doc.data().senderId;
                db.collection('users').doc(friendUid).get().then(friendDoc => {
                    const friendName = friendDoc.data().displayName;
                    const friendProfilePicUrl = friendDoc.data().profilePicUrl;
                    let li = document.createElement('li');
                    // Supongamos que friendProfilePicUrl y friendName están definidos

                    // Verificar si friendProfilePicUrl está definido y no es null
                    if (friendProfilePicUrl && friendProfilePicUrl.trim() !== "") {
                        // Si la URL de la imagen del perfil del amigo está definida, usarla
                        li.innerHTML = `<img src="${friendProfilePicUrl}" alt="" style="width:30px; height:30px; border-radius:15px;"> ${friendName}`;
                    } else {
                        // Si la URL de la imagen del perfil del amigo no está definida, usar una imagen por defecto
                        const defaultProfilePicFileName = '../images/default-profile.jpg'; // Cambiar por el nombre de tu archivo de imagen por defecto
                        const defaultProfilePicUrl = `ruta/a/tu/carpeta/de/imagenes/${defaultProfilePicFileName}`; // Cambiar la ruta según la ubicación de tu archivo de imagen por defecto
                        li.innerHTML = `<img src="${defaultProfilePicUrl}" alt="" style="width:30px; height:30px; border-radius:15px;"> ${friendName}`;
                    }
                    li.onclick = () => showChat(friendUid, friendName); // Agregar evento onclick para cargar el chat
                    friendsList.appendChild(li);
                });
            });
        });

    // Cargar solicitudes de amistad pendientes
    db.collection('friendRequests')
        .where('receiverId', '==', myUid)
        .where('status', '==', 'pending')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const senderId = doc.data().senderId;
                db.collection('users').doc(senderId).get().then(senderDoc => {
                    const senderName = senderDoc.data().displayName;
                    let li = document.createElement('li');
                    li.textContent = `Pending request from ${senderName}`;
                    li.style.color = "red"

                    const acceptBtn = document.createElement('button');
                    acceptBtn.textContent = 'Accept';
                    acceptBtn.onclick = () => updateFriendRequestStatus(doc.id, 'accepted');

                    const rejectBtn = document.createElement('button');
                    rejectBtn.textContent = 'Reject';
                    rejectBtn.onclick = () => updateFriendRequestStatus(doc.id, 'rejected');

                    li.appendChild(acceptBtn);
                    li.appendChild(rejectBtn);
                    friendsList.appendChild(li);

                });
            });
        }).catch(error => {
            console.error('Error loading data:', error);
        });
}

function setCurrentChatFriend(friendUid, friendName) {
    // Aquí podrías configurar el entorno del chat
    console.log('Chatting with:', friendName);
    // También puedes configurar aquí para recibir mensajes desde Firebase
}



document.addEventListener('DOMContentLoaded', function () {
    loadFriendsAndRequests();
});


function loadFriendsAndRequests() {
    const myUid = firebase.auth().currentUser.uid;
    console.log('Loading friends and requests for user:', myUid);
    setInterval(() => {
    console.log("User Autenticate UID", myUid);
    console.log("Use deleteaccount() if u want to delete this account")
}, 5000);



    const friendsList = document.getElementById('friends');
    friendsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
    console.log('Cleared friends list.');

    // Cargar amigos aceptados
    db.collection('friendRequests')
        .where('receiverId', '==', myUid)
        .where('status', '==', 'accepted')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                friendsList.innerHTML += '<li>No accepted friends.</li>';
                console.log('No accepted friends found.');
            }
            snapshot.forEach(doc => {
                const friendUid = doc.data().senderId;
                db.collection('users').doc(friendUid).get().then(friendDoc => {
                    const friendName = friendDoc.data().displayName;
                    const friendProfilePicUrl = friendDoc.data().profilePicUrl;
                    let li = document.createElement('li');
                    li.innerHTML = `<img src="${friendProfilePicUrl}" alt="" style="width:30px; height:30px; border-radius:15px;"> ${friendName}`;
                    li.onclick = () => showChat(friendUid, friendName);
                    friendsList.appendChild(li);
                    console.log(`Added accepted friend: ${friendName}`);
                });
            });
        });

    // Cargar solicitudes de amistad pendientes
    db.collection('friendRequests')
        .where('receiverId', '==', myUid)
        .where('status', '==', 'pending')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No pending friend requests found.');
            }
            snapshot.forEach(doc => {
                const senderId = doc.data().senderId;
                db.collection('users').doc(senderId).get().then(senderDoc => {
                    const senderName = senderDoc.data().displayName;
                    let li = document.createElement('li');
                    li.textContent = `Pending request from ${senderName}`;
                    console.log(`Found pending friend request from: ${senderName}`);

                    const acceptBtn = document.createElement('button');
                    acceptBtn.textContent = 'Accept';
                    acceptBtn.onclick = () => updateFriendRequestStatus(doc.id, 'accepted', senderId, myUid);

                    const rejectBtn = document.createElement('button');
                    rejectBtn.textContent = 'Reject';
                    rejectBtn.onclick = () => updateFriendRequestStatus(doc.id, 'rejected');

                    li.appendChild(acceptBtn);
                    li.appendChild(rejectBtn);
                    friendsList.appendChild(li);

                    // Enviar notificación de solicitud de amistad
                    sendFriendRequestNotification(senderName);
                });
            });
        }).catch(error => {
            console.error('Error loading data:', error);
        });
}

function sendFriendRequestNotification(senderName) {
    if (Notification.permission === "granted") {
        new Notification("Firebird", {
            body: `Has recibido una solicitud de amistad de ${senderName}`
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Firebird", {
                    body: `Has recibido una solicitud de amistad de ${senderName}`
                });
            }
        });
    }
}

document.getElementById('addFriendForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const username = document.getElementById('friendUsername').value.trim();
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = '';

    // Buscar UID del usuario por el displayName ingresado
    db.collection('users').where('displayName', '==', username).get()
        .then(snapshot => {
            if (snapshot.empty) {
                statusMessage.textContent = 'No user found with that username.';
                return;
            }

            snapshot.forEach(doc => {
                const receiverId = doc.id;
                sendFriendRequest(receiverId);
            });
        })
        .catch(error => {
            console.error('Error finding user:', error);
            statusMessage.textContent = 'Error while trying to find user.';
        });
});


function sendFriendRequest(receiverId) {
    const myUid = firebase.auth().currentUser.uid;

    if (myUid === receiverId) {
        document.getElementById("statusMessage").style.display = "block";
        document.getElementById("statusMessageS").style.display = "none";
        document.getElementById('statusMessage').textContent = 'Cannot send friend request to yourself.';
        return;
    }

    // Verificar si ya se ha enviado una solicitud de amistad
    db.collection('friendRequests').where('senderId', '==', myUid).where('receiverId', '==', receiverId)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                document.getElementById("statusMessage").style.display = "block";
                document.getElementById("statusMessageS").style.display = "none";
                document.getElementById('statusMessage').textContent = 'This user is already your friend or there is a pending request.';
                return;
            }

            // Crear una nueva solicitud de amistad
            db.collection('friendRequests').add({
                senderId: myUid,
                receiverId: receiverId,
                status: 'pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
                .then(() => {
                    document.getElementById("statusMessageS").style.display = "block";
                    document.getElementById("statusMessage").style.display = "none";
                    document.getElementById('statusMessageS').textContent = 'Friend request sent successfully.';
                })
                .catch(error => {
                    console.error('Error sending friend request:', error);
                    document.getElementById("statusMessageS").style.display = "none";
                    document.getElementById("statusMessage").style.display = "block";
                    document.getElementById('statusMessage').textContent = 'Failed to send friend request.';
                });
        });
}

document.querySelectorAll('friend').forEach(item => {
    item.addEventListener('click', event => {
        const friendUid = item.getAttribute('data-uid'); // Asume que cada amigo tiene un atributo data-uid
        changeActiveChat(friendUid);
    });
});


// Variable global para mantener la referencia al listener del chat actual
let currentChatListenerUnsubscribe = null;

function changeActiveChat(friendUid) {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = ''; // Limpia el contenedor de mensajes

    const myUid = firebase.auth().currentUser.uid;

    // Desuscribir de cualquier listener de chat anterior
    if (window.currentChatListenerUnsubscribe) {
        window.currentChatListenerUnsubscribe();
    }

    // Configura el nuevo listener de Firestore para el nuevo chat
    const messagesRef = firebase.firestore().collection('messages');
    const queryAB = messagesRef.where('senderId', '==', myUid).where('receiverId', '==', friendUid).orderBy('timestamp', 'asc');
    const queryBA = messagesRef.where('senderId', '==', friendUid).where('receiverId', '==', myUid).orderBy('timestamp', 'asc');

    window.currentChatListenerUnsubscribe = () => {
        queryAB.onSnapshot(() => { });
        queryBA.onSnapshot(() => { });
    };

    queryAB.onSnapshot(handleSnapshot);
    queryBA.onSnapshot(handleSnapshot);

    function handleSnapshot(snapshot) {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                const messageData = change.doc.data();
                displayMessage(messageData, myUid);
            }
        });
    }
}

function updateActiveChatDisplay(friendName) {
    const activeChatElement = document.getElementById('active-chat');
    if (activeChatElement) {
        activeChatElement.textContent = `Chat with ${friendName}`;
    } else {
        console.error("active-chat element not found in the DOM.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Tu código que manipula el DOM va aquí
    document.getElementById('active-chat').textContent = `Chat with ${friendName}`;
});







function updateFriendRequestStatus(requestId, status) {
    const requestRef = db.collection('friendRequests').doc(requestId);
    requestRef.get().then(doc => {
        if (!doc.exists) {
            console.error('Request not found');
            return;
        }
        const requestData = doc.data();
        const senderId = requestData.senderId;
        const receiverId = requestData.receiverId;

        if (status === 'accepted' && requestData.status !== 'accepted') { // Asegúrate de no volver a aceptar una solicitud ya aceptada
            // Crear la relación de amistad recíproca solo si aún no está aceptada
            const createFriendship = (user1, user2) => {
                db.collection('friendRequests').where('senderId', '==', user1).where('receiverId', '==', user2).get().then(snapshot => {
                    if (snapshot.empty) { // Solo crear si no existe ya la relación
                        db.collection('friendRequests').add({
                            senderId: user1,
                            receiverId: user2,
                            status: 'accepted'
                        });
                    }
                });
            };

            createFriendship(senderId, receiverId);
            createFriendship(receiverId, senderId);
        }

        // Actualizar el estado de la solicitud original
        if (requestData.status !== 'accepted') { // Prevenir actualizaciones innecesarias
            requestRef.update({ status: status })
                .then(() => {
                    console.log(`Request ${requestId} updated to ${status}`);
                    loadFriendsAndRequests(); // Recargar la lista para reflejar los cambios
                }).catch(error => {
                    console.error('Error updating request:', error);
                });
        }
    }).catch(error => {
        console.error('Error fetching request:', error);
    });
}

//Messaging



firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in with UID:", user.uid);
        // Puedes llamar aquí a loadMessages con el UID del amigo como parámetro
        loadMessages(friendUid); // Reemplaza 'FRIEND_UID_HERE' con el UID real del amigo
    } else {
        console.log("No user is signed in.");
    }
});


function loadFriendsList() {
    const friendsList = document.getElementById('friends'); // Asegúrate de que 'friends' es el ID de tu lista de amigos
    const userUid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('friendRequests')
        .where('receiverId', '==', userUid)
        .where('status', '==', 'accepted')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const friendUid = doc.data().senderId;
                const listItem = document.createElement('li');
                listItem.textContent = friendUid; // Aquí deberías poner el nombre del amigo
                listItem.onclick = () => showChat(friendUid);
                friendsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading friends:", error);
        });
}

console.log("Document loaded");
document.addEventListener('DOMContentLoaded', function () {
    // Aquí colocar la lógica de asignación de eventos u otros inicios
});

document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
});

function setupEventListeners() {
    const friendElements = document.querySelectorAll('.friend');
    friendElements.forEach(friend => {
        friend.addEventListener('click', function () {
            const friendUid = this.dataset.uid; // Asegúrate de que cada amigo tiene un data-uid
            showChat(friendUid);
        });
    });
}




document.querySelectorAll('.friend').forEach(item => {
    item.addEventListener('click', () => {
        const friendUid = item.dataset.uid;
        setTimeout(() => {
            showChat(friendUid);
        }, 1000); // Retrasa la llamada para dar tiempo a que el DOM se actualice
    });
});






document.querySelectorAll('.friend').forEach(item => {
    item.addEventListener('click', () => {
        const friendUid = item.dataset.uid; // Asumiendo que cada amigo tiene un data-uid
        showChat(friendUid);
    });
});

// Puedes probar esto en la consola del navegador para ver si el contenedor del chat se muestra




query.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            const messageData = change.doc.data();
            displayMessage(messageData); // Llama aquí a la función que muestra el mensaje en el UI
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.friend').forEach(item => {
        item.addEventListener('click', function () {
            showChat(this.dataset.uid);
        });
    });
});



// Asumiendo que esta función es llamada cuando se hace clic en un amigo de la lista




function loadFriendsList() {
    const friendsList = document.getElementById('friends');
    const userUid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('friendRequests')
        .where('receiverId', '==', userUid)
        .where('status', '==', 'accepted')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const friendUid = doc.data().senderId;
                const friendName = doc.data().displayName; // Nombre del amigo
                const listItem = document.createElement('li');
                listItem.textContent = friendName; // Mostrar el nombre del amigo en la lista
                listItem.dataset.uid = friendUid; // Almacenar el UID del amigo en un atributo de datos
                listItem.onclick = () => showChat(friendUid, friendName); // Asignar evento onclick
                friendsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading friends:", error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    loadFriendsList(); // Cargar la lista de amigos al cargar el DOM
});




// Asegúrate de que los elementos existen y los IDs son correctos
// Verifica también los estilos CSS para asegurarte de que no están interfiriendo con la visibilidad





// Asumiendo que estás creando elementos li para cada amigo en la lista
snapshot.forEach(doc => {
    const friendUid = doc.data().senderId; // o receiverId, dependiendo de la estructura de tus datos
    const friendName = doc.data().displayName;
    let li = document.createElement('li');
    li.textContent = friendName;
    li.onclick = () => showChat(friendUid, friendName); // Asegúrate de que friendUid es definido aquí
    friendsList.appendChild(li);
});

function setupFriendList() {
    const friends = document.querySelectorAll('.friend');
    friends.forEach(friend => {
        friend.addEventListener('click', () => {
            const friendUid = friend.getAttribute('data-uid');
            showChat(friendUid);
        });
    });
}


// birthdate
document.addEventListener('DOMContentLoaded', function () {
    // Verifica si el usuario está autenticado
    auth.onAuthStateChanged(function (user) {
        if (user) {
            CheckBirthday(user.uid);
        } else {
            console.log("Usuario no autenticado");
        }
    });
});

function CheckBirthday(uid) {
    const today = new Date();
    const formattedToday = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    db.doc(`users/${uid}`).get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            if (userData.birthdate) {
                const birthdate = userData.birthdate;
                const [year, month, day] = birthdate.split("-");
                const formattedbirthdate = `${month}-${day}`;

                if (formattedbirthdate === formattedToday) {
                    mostrarMenuCumpleaños();
                } else {
                    console.log("Hoy no es tu cumpleaños.");
                }
            } else {
                console.log("El documento del usuario no tiene una fecha de nacimiento definida.");
            }
        } else {
            console.log("No se encontró el documento del usuario con UID:", uid);
        }
    }).catch((error) => {
        console.log("Error al obtener el documento:", error);
        console.log("UID con error:", uid);
    });
}


function toggleChat() {
    const chat = document.getElementById('chat-container');
    chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
}



function checkUserBirthday() {
    var user = firebase.auth().currentUser;

    if (user) {
        // Usuario está autenticado y el UID está disponible
        CheckBirthday(user.uid);
    } else {
        // No hay usuario autenticado o la sesión expiró
        console.log("Usuario no autenticado o sesión expirada.");
    }
}

// Podrías llamar a checkUserBirthday en el momento adecuado, como después de un evento de inicio de sesión o en la carga de una página.



function mostrarMenuCumpleaños() {
    console.log("¡Feliz cumpleaños! Muestra de modal.");
    // Código para mostrar un modal
    alert("¡Feliz cumpleaños!");
}

function changeEmail() {
    const user = firebase.auth().currentUser;
    // Solicitar al usuario que ingrese su nuevo correo electrónico
    const newEmail = prompt("Please enter your new email address:");

    if (!newEmail) {
        alert("No email address was entered. Operation cancelled.");
        return;
    }

    // Paso 1: Solicitar verificación del nuevo correo
    user.verifyBeforeUpdateEmail(newEmail).then(() => {
        alert("A verification email has been sent to " + newEmail + ". Please verify it to complete the email update process.");

        // Observador para detectar cuando el usuario ha verificado su correo
        firebase.auth().onAuthStateChanged(function (updatedUser) {
            if (updatedUser && updatedUser.emailVerified) {
                // Este bloque se ejecuta después de que el usuario ha verificado el correo
                alert("Your email address has been successfully updated to: " + updatedUser.email);

                // Actualizar el correo en Firestore si es necesario
                const usersRef = firebase.firestore().collection('users');
                usersRef.doc(updatedUser.uid).update({
                    email: updatedUser.email,
                    initialemail: updatedUser.email  // Si mantienes un registro del correo inicial
                }).then(() => {
                    console.log("Email updated in Firestore database.");
                }).catch(error => {
                    console.error("Error updating email in Firestore:", error);
                    alert("Error updating email in the database: " + error.message);
                });
            }
        });

    }).catch(error => {
        console.error("Error during the email verification send process:", error);
        alert("Error sending verification email: " + error.message);
    });
}

// Función para reenviar el correo de verificación
function resendVerificationEmail() {
    const user = firebase.auth().currentUser; // Obtiene el usuario actual
    if (user) {
        user.sendEmailVerification()
            .then(() => {
                console.log('Correo de verificación reenviado exitosamente.');
            })
            .catch(error => {
                console.error('Error al reenviar el correo de verificación:', error);
            });
    } else {
        console.log('No hay usuario activo para reenviar el correo de verificación.');
    }
}

// Asumiendo que cada 'friend' tiene un data-uid que identifica a cada amigo
document.addEventListener('DOMContentLoaded', function () {
    // Asegurarse de que los amigos están cargados correctamente
    setupFriendList();
});

function setupFriendList() {
    const friends = document.querySelectorAll('.friend');
    friends.forEach(friend => {
        friend.addEventListener('click', function () {
            const friendUid = this.dataset.uid;  // Asegúrate de que cada amigo tiene un `data-uid`
            openChat(friendUid);
        });
    });
}

function showChat(selectedFriendUid, friendName) {
    friendUid = selectedFriendUid; // Actualiza la variable global friendUid
    console.log("Abriendo chat para:", friendUid, friendName);

    // Ocultar el mensaje de no-friend-selected
    const noFriendSelected = document.getElementById('no-friend-selected');
    if (noFriendSelected) {
        noFriendSelected.style.display = 'none';
    }

    // Mostrar el contenedor del chat
    const chatContainer = document.getElementById('chatzone');
    if (chatContainer) {
        chatContainer.style.display = 'block';
    }

    const message = document.getElementById('message-datavez');
    if (message) {
        message.style.display = 'block';
    }

    // Limpiar mensajes anteriores
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }

    // Cargar mensajes del amigo seleccionado
    loadMessages(friendUid);
}


function loadMessages() {
    const myUid = firebase.auth().currentUser.uid;

    // Verificar que myUid y friendUid están definidos
    if (!myUid || !friendUid) {
        console.error("Both user UIDs must be defined to load messages.");
        return;
    }

    console.log("Loading Messages for:", myUid, "and", friendUid); // Depuración

    const messagesContainer = document.getElementById('messageapp');

    // Limpia el contenedor de mensajes antes de cargar los nuevos mensajes
    messagesContainer.innerHTML = '';

    // Crear la consulta combinada para los mensajes entre ambos usuarios
    const query = db.collection('messages')
        .where('participants', 'array-contains', myUid)
        .orderBy('timestamp', 'asc');

    // Manejar la carga de mensajes con un listener
    unsubscribe = query.onSnapshot(snapshot => {
        console.log(" Number of messages:", snapshot.size); // Depuración
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                const messageData = change.doc.data();
                console.log("document data:", messageData); // Depuración
                if (!messageData) {
                    console.error("Mensaje sin datos encontrados:", change.doc);
                    return; // Saltar este mensaje si no tiene datos
                }
                if ((messageData.senderId === myUid && messageData.receiverId === friendUid) ||
                    (messageData.senderId === friendUid && messageData.receiverId === myUid)) {
                    displayMessage(messageData, myUid);
                }
            }
        });
    }, error => {
        console.error("Error loading messages:", error);
    });
}

function displayMessage(messageData, myUid) {
    const messagesContainer = document.getElementById('messageapp');
    if (!messagesContainer) {
        console.error("Message container not found");
        return;
    }

    console.log("Message Data:", messageData); // Depuración adicional

    if (!messageData || !messageData.senderId) {
        console.error("Message not Valid:", messageData);
        return;
    }

    const messageLi = document.createElement('li');
    messageLi.classList.add('message');
    if (messageData.senderId === myUid) {
        messageLi.classList.add('my-message');
    } else {
        messageLi.classList.add('their-message');
    }
    messageLi.textContent = messageData.message;
    console.log("Adding Message:", messageLi); // Depuración
    messagesContainer.appendChild(messageLi); // Añadir al final de la lista
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazar al final
}



function sendMessage() {
    const myUid = firebase.auth().currentUser.uid;
    const messageInput = document.getElementById('message-text');
    const messageText = messageInput.value.trim();

    if (!myUid || !friendUid) {
        console.error("Both user UIDs must be defined to send a message.");
        return;
    }

    if (messageText === "") {
        console.error("Message is empty.");
        return;
    }

    const messagesRef = db.collection('messages');

    messagesRef.add({
        senderId: myUid,
        receiverId: friendUid,
        message: messageText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        participants: [myUid, friendUid]
    }).then(() => {
        console.log("Message sent successfully.");
        document.getElementById('footerdata').style.display = 'block';
        messageInput.value = ''; // Limpia el input después de enviar
    }).catch(error => {
        console.error("Error sending message:", error);
    });
}

// Función para detectar cuando el teclado está activo
function hidefooter() {
    document.getElementById('footerdata').style.display = 'none';

}