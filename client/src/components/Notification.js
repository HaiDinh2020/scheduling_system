import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { requestPermission, onMessageListener } from "../firebase";
import { useSelector } from "react-redux";

function Notification () {
    const [notification, setNotification] = useState({title: '', body: ''});
    const userId = useSelector(state => state.user?.userCurentProfile?.id)

    useEffect(() => {
        requestPermission(userId);

        const unsubcribe = onMessageListener().then(payload => {
            console.log("Received forground message ")
            console.log(payload)
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body
            })
        })

        return () => {
            unsubcribe.catch(err => console.log("failed: ", err))
        }
    }, [userId])

    useEffect(() => {

        // hiển thị thông báo từ fcm
        toast("thông bóa")
    }, [notification])

    return(
        <div>
            <ToastContainer />
        </div>
    )
}

export default Notification;


