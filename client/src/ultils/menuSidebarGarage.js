import icons from './icons'

const { ImPencil2, FaCalendarAlt, BsListUl, PiGarageBold, IoBarChartOutline } = icons

const memuSidebarGarage = [
    {
        id: 1,
        text: 'Thông tin người sở hữu',
        path: '/garage/profile',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Thông tin garage',
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
        path: '/garage/statistics',
        icon: <IoBarChartOutline />
    },
]


export default memuSidebarGarage