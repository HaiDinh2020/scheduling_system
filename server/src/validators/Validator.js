// Hàm kiểm tra định dạng email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Hàm kiểm tra định dạng số điện thoại
export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/; // Định dạng: ít nhất 10 chữ số
    return phoneRegex.test(phone);
};

// Hàm kiểm tra định dạng địa chỉ chính xấc garage dạng (latitude, longitude)
export const validateExactAdrress = (exactAddress) => {
    const addressRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return addressRegex.test(exactAddress);
};

// Hàm kiểm tra lịch đặt endtime > startTime
export const validateStartTimeEndTime = (startTime, endTime) => {
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);
    return endTimeDate > startTimeDate
}