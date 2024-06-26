import icons from './icons'

const { ImPencil2, FaCalendarAlt, BsListTask } = icons

const memuSidebarGarage = [
    {
        id: 1,
        text: 'Thông tin cá nhân',
        path: '/mechanic/profile',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Công việc',
        path: '/mechanic/view-task',
        icon: <BsListTask />
    },
    {
        id: 3,
        text: 'Lịch làm việc',
        path: '/mechanic/work-schedule',
        icon: <FaCalendarAlt />
    },
    
]

export default memuSidebarGarage