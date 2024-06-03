import icons from './icons'

const { ImPencil2, FaCalendarAlt, BsListUl, PiGarageBold } = icons

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
        text: 'Lịch hẹn',
        path: '/garage/schedule',
        icon: <BsListUl />
    },
    {
        id: 4,
        text: 'Lịch làm việc',
        path: '/garage/work-schedule',
        icon: <FaCalendarAlt />
    },
    
]

export default memuSidebarGarage