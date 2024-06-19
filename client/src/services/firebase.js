import axios from "axios";

export const apiSendFCMTokenToServer = async ( fcmtoken, userId ) => {
    try {
        const data = { fcmtoken, userId }; 
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/fcmtoken/save-token`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Trả về dữ liệu từ phản hồi của server
    } catch (error) {
        console.log(error)
        // Ném lỗi để bên gọi xử lý
    }
};
