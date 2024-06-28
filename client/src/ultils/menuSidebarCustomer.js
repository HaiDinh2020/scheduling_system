import icons from './icons'

const { ImPencil2, RiListSettingsLine, BsListUl } = icons

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
        text: 'Quản lý lịch đặt',
        path: '/customer/booking-history',
        icon: <RiListSettingsLine />
    },
]

export default memuSidebarCustomer