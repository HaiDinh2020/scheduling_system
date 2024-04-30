import icons from './icons'

const { GrSchedules, FaCheckCircle, GrScheduleNew, TbProgressCheck, MdCancel } = icons

const menuScheduleStatus = [
    {
        id: 1,
        text: 'Tất cả',
        status: 'all',
        icon: <GrSchedules />
    },
    {
        id: 2,
        text: 'Yêu cầu',
        status: 'request',
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
    },
    {
        id: 5,
        text: 'Từ chối',
        status: 'reject',
        icon: <MdCancel />
    },
]

export default menuScheduleStatus;