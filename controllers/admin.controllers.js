const firebase = require("firebase/app");
require("firebase/auth");
var FCM = require('fcm-node');
var serverKey = "AAAA3_RMYI0:APA91bFHYoQUGrPIDPByTkhyDFMEWv8Dl2QbcNWrLCVfd0sD2geAGYRnUyLYtK3sFZT0dkdkoC_e8KD4HCVUlmicnWPeVK1d6is5aTd7-4Dd-8rVB7M16tj-Ojh45IPeEsFuyLHqTfnj"
var fcm = new FCM(serverKey);


firebase.initializeApp({
    apiKey: "AIzaSyD4W0Gy9z9-wmLTo7LLjebOfkLPYM6Jh38",
    authDomain: "notiapp-1e69d.firebaseapp.com",
    projectId: "notiapp-1e69d",
    storageBucket: "notiapp-1e69d.appspot.com",
    messagingSenderId: "961876353165",
    appId: "1:961876353165:web:5bca12d0fccc20b65982c4",
    measurementId: "G-GRZRCB46L6"
});
const firebaseAuth = firebase.auth();

exports.getFormLogin = (req, res, next) => {
    res.render('login.hbs')
}
// exports.postSignup = (req, res, next) => {
//     firebaseAuth.createUserWithEmailAndPassword(req.body.email, req.body.password)
//         .then((userCredential) => {
//             // Signed up successfully
//             const user = userCredential.user;
//             console.log(`User ${user.uid} created successfully`);
//         })
//         .catch((error) => {
//             console.error(`Error creating user: ${error.message}`);
//             return res.render('login.hbs',{msg: ' '+error.message}); // render error message
//         });
//
//     res.redirect('/')
// }
exports.postSignin = async (req, res, next) => {
    await firebaseAuth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            // Logged in successfully
            const user = userCredential.user;
            // req.session.user = user
            // console.log(req.session)
        })
        .catch((error) => {
            return res.render('login.hbs', {msg: "" + error.message}); // render error message
        });
}


///////////send noti
exports.getFormNoti = (req, res, next) => {
    res.render('noti.hbs')
}
exports.postNoti = (req, res, next) => {
    if (req.body.title === "" || req.body.content === "") {
        return res.render('noti.hbs', {msg: 'Please enter information'})
    }
    var message = {
        to: "/topics/appweb",
        collapse_key: 'your_collapse_key',

        notification: {
            title: req.body.title,
            body: req.body.content
        },

        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
            return res.render('noti.hbs', {msg: 'Something has gone wrong!'})
        } else {
            console.log("Successfully sent with response: ", response);
            return res.render('noti.hbs', {msg: 'Successfully sent'})
        }
    });
}
exports.getFormAccount = (req, res, next) => {
    const user = firebase.auth().currentUser;
    res.render('account.hbs',{user:user})
}
exports.postLogout = async (req, res, next) => {
    await firebase.auth().signOut()
    res.redirect('/');
}
exports.getFormupdatePass = (req, res, next) => {
    res.render('updatePass.hbs')
}
exports.postUpdate = (req, res, next) => {
    const user = firebase.auth().currentUser;
    user.updatePassword(req.body.new_password).then(() => {
        // Update successful.
        console.log("update thanh cong")
        return res.render('updatePass.hbs', {msg: 'Successfully'})
    }).catch((error) => {
        return res.render('updatePass.hbs', {msg: '' + error.message})
    });
}
exports.getFormRestPass = (req, res, next) => {
    res.render('resetpass.hbs')
}
exports.postRestPass = (req, res, next) => {
    firebase.auth().sendPasswordResetEmail(req.body.email)
        .then(() => {
            return res.render('resetpass.hbs', {msg: 'Pls check email'})
        })
        .catch((error) => {
            return res.render('resetpass.hbs', {msg: '' + error.message})
        });
}