const firebase = require("firebase/app");
require("firebase/auth");
const firebaseAuth = firebase.auth();

exports.YeuCauDangNhap =async (req,res,next)=>{
   await firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            next();
        } else {
            res.redirect('/')
        }
    });
}
exports.ChuaDangNhap =async (req,res,next)=>{
    await firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            next();
        } else {
            return res.redirect('/notification');
        }
    });
}