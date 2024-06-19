import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { apiSendFCMTokenToServer } from "./services/firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBYtAZ59Bi9l0SQ83JVX4ERB7V1SiYVTXY",
    authDomain: "booking-a2bf1.firebaseapp.com",
    projectId: "booking-a2bf1",
    storageBucket: "booking-a2bf1.appspot.com",
    messagingSenderId: "894780863286",
    appId: "1:894780863286:web:0158b85c226bd140c7b997",
    measurementId: "G-51XVS2GVKY"
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);
const db = getFirestore(firebaseApp)


export const requestPermission = (userId) => {
    console.log("Requesting user permission.....")
    Notification.requestPermission().then((permission) => {
        console.log("request return")
        if (permission === 'granted') {
            console.log("Notification user permission granted.")

            return getToken(messaging, {
                vapidKey:
                    "BDt3ghCWQsq0Nnoz6f-yqJq1K82RUHE8HIt-pS8dyp6HjQSqwXihDZ6C6Rc56gD4BZZBR6LnQ_cLAYWKIAN0_4M",
            })
                .then(async (currentToken) => {
                    console.log(currentToken)
                    console.log(userId)
                    if (currentToken && userId) {
                        const result = await apiSendFCMTokenToServer(currentToken, userId)
                        console.log(result);
                    } else {
                        console.log(
                            "No registration token available. Request permission to generate one."
                        );

                    }
                })
                .catch((err) => {
                    console.log("An error occurred while retrieving token. ", err);
                });
        } else {
            console.log("User permission denied")
        }
    })
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });



export { messaging };