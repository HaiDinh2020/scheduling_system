import axios from "axios";

export const apiSendFCMTokenToServer = async ( fcmtoken, userId ) => {
    try {
        const data = { fcmtoken, userId }; // Shorthand property names
        const response = await axios.post('http://localhost:5000/api/v1/fcmtoken/save-token', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Trả về dữ liệu từ phản hồi của server
    } catch (error) {
        throw error; // Ném lỗi để bên gọi xử lý
    }
};
