import icons from './icons'

const { ImPencil2, BsClockHistory, BsListUl } = icons

const memuSidebarCustomer = [
    {
        id: 1,
        text: 'Thông tin cá nhân',
        path: '/customer/profile',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Danh sách xe',
        path: '/customer/list-cars',
        icon: <BsListUl />
    },
    {
        id: 3,
        text: 'Lịch sử đặt lịch',
        path: '/customer/booking-history',
        icon: <BsClockHistory />
    },
]

export default memuSidebarCustomer