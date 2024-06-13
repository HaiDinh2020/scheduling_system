import icons from './icons'

const { ImPencil2, FaCalendarAlt, BsListUl, PiGarageBold, IoBarChartOutline } = icons

const memuSidebarGarage = [
    {
        id: 1,
        text: 'Thông tin cá nhân',
        path: '/garage/profile',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Garage',
        path: '/garage/infor',
        icon: <PiGarageBold />
    },
    {
        id: 3,
        text: 'Quản lý lịch hẹn',
        path: '/garage/schedule',
        icon: <BsListUl />
    },
    {
        id: 4,
        text: 'Công việc',
        path: '/garage/task',
        icon: <FaCalendarAlt />
    },
   
    {
        id: 5,
        text: 'Thống kê',
        path: '/garage/monthly-statistics',
        icon: <IoBarChartOutline />
    },
]


export default memuSidebarGarage