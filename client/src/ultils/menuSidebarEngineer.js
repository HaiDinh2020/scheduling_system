import icons from './icons'

const { ImPencil2, FaCalendarAlt, BsListTask } = icons

const memuSidebarGarage = [
    {
        id: 1,
        text: 'Thông tin cá nhân',
        path: '/engineer/profile',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Công việc',
        path: '/engineer/view-task',
        icon: <BsListTask />
    },
    {
        id: 3,
        text: 'Lịch làm việc',
        path: '/engineer/work-schedule',
        icon: <FaCalendarAlt />
    },
    
]

export default memuSidebarGarage