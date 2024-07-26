import icons from './icons'

const { GrSchedules, FaCheckCircle, GrScheduleNew, TbProgressCheck, MdCancel } = icons

const menuScheduleStatus = [
    {
        id: 2,
        text: 'Yêu cầu',
        status: 'request',
        icon: <GrScheduleNew />
    },
    {
        id: 2,
        text: 'Đặt trước',
        status: 'schedule',
        icon: <GrScheduleNew />
    },
    {
        id: 3,
        text: 'Đang xử lý',
        status: 'in-progress',
        icon: <TbProgressCheck />
    },
    {
        id: 4,
        text: 'Hoàn thành',
        status: 'complete',
        icon: <FaCheckCircle />
    }
]

export default menuScheduleStatus;