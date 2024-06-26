export const path = {
    HOME: '/*',
    GARAGE_DETAIL: 'garage-detail/:garageId',
    LOGIN: 'login',
    REGISTER: 'register',
    GARAGE: '/garage/*',
    CUSTOMER: '/customer/*',
    SERVICES: 'services',
    REPAIR: 'services/repair',
    MAINTENANCE: 'services/maintenance',
    List_CARS: 'list-cars',
    BOOKING_HISTORY: 'booking-history',
    PAYMENTRESULT: 'vnpay_return',
    USERPROFILE: 'profile',
    GARAGEPROFILE: 'profile',
    GARAGEINFO: 'infor',
    GARAGESCHEDULE: 'schedule',
    GARAGEBOOKING: 'booking',
    GARAGETASK: 'task',
    GARAGESTAT: 'statistics',

    GARAGE_DASHBOARD: 'garage/dashboard',
    
    SYSTEM: 'system',
    MESSAGE: 'message',

    MECHANIC: '/mechanic/',
    MECHANICPROFILE: 'profile',
    MECHANICWORKSCHEDULE: 'work-schedule',
    MECHANICTASK: 'view-task'

    
}

export const servicesOptions = ['Sửa chữa', 'Bảo dưỡng', 'Bán phụ tùng', 'Tư vấn khách hàng', 'Dạy nghề']
export const bookingStatus = ["request", "reject", "complete", "in progress"]
export const services = [
    
]

export const taskStatusColors = {
    "pending": '#FF6384',
    "assigned": "#C4AC54",
    "in_progress": '#64CAFF',
    "completed": '#66ed8b'
};

export const bookingStatusColors = {
    "request": "#FFD700",
    "schedule": "#00FFFF",
    "in-progress": "#64CAFF",
    "complete": "#32CD32",
    "reject": "#FF6347",
    "cancelled": "#D3D3D3"
}