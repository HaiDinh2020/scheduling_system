import React, { useEffect, useId, useState } from "react";
import { notification as antdNotification } from "antd";
import { requestPermission, onMessageListener } from "../firebase";
import { useSelector } from "react-redux";

function Notification() {
    const [notification, setNotification] = useState({ title: '', body: '' });
    const userId = useSelector(state => state.user?.userCurentProfile?.id)

    const unsubcribe = onMessageListener().then(payload => {
        // console.log(payload)
        setNotification({
            title: payload?.notification?.title,
            body: payload?.notification?.body
        })
    })

    useEffect(() => {
        if (useId !== null && userId !== undefined) {
            requestPermission(userId);
        }

        return () => {
            unsubcribe.catch(err => console.log("failed: ", err))
        }
    }, [userId])


    useEffect(() => {
        if (notification.title || notification.body) {
            antdNotification.open({
                message: notification.title,
                description: notification.body,
                placement: "topRight",
            });
        }
    }, [notification]);

    return (
        <div>

        </div>
    )
}

export default Notification;


