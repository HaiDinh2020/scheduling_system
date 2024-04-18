import icons from './icons'

const { ImPencil2, BsClockHistory, BsListUl } = icons

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
        icon: <ImPencil2 />
    },
    {
        id: 3,
        text: 'Lịch hẹn',
        path: '/garage/schedule',
        icon: <BsListUl />
    },
    
]

export default memuSidebarGarage