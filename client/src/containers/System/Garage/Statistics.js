import { DatePicker, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';      // can't delete
import { apiStatTask, apiGetRankingMechanic } from '../../../services/Garage/statistics';
import icons from '../../../ultils/icons'
import { taskStatusColors } from '../../../ultils/constants';

const { RangePicker } = DatePicker
const { FaRegStar } = icons


const Statistics = () => {

    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const mechanics = useSelector((state) => state.mechanics.mechanics)

    const [dateRange, setDateRange] = useState(null);
    const [filterMechanic, setFilterMechanic] = useState("")
    const [dataRanking, setDataRanking] = useState([])
    const [tasks, setTasks] = useState({
        "pending": 0,
        "in_progress": 0,
        "completed": 0
    })

    useEffect(() => {
        const getStatTask = async (garageId) => {
            try {

                const optionsFilter = {}
                if (filterMechanic) optionsFilter.mechanicId = filterMechanic
                if (dateRange) {
                    const startDate = dateRange[0].startOf('day').format('YYYY-MM-DD');
                    const endDate = dateRange[1].endOf('day').format('YYYY-MM-DD');
                    optionsFilter.startTime = startDate;
                    optionsFilter.endTime = endDate;
                }


                const statTask = await apiStatTask(garageId, optionsFilter)

                if (statTask?.data?.err === 0) {
                    setTasks(statTask?.data?.response)
                } else {
                    message.error("Server Error", 2)
                }
            } catch (error) {
                message.error("Server Error", 2)
            }
        }
        getStatTask(garageId)
    }, [garageId, filterMechanic, dateRange])

    useEffect(() => {
        const getRanking = async (garageId) => {
            try {
                const rank = await apiGetRankingMechanic(garageId)

                if (rank?.data?.err === 0) {
                    setDataRanking(rank?.data?.response)
                } else {
                    message.error("Server Error", 2)
                }
            } catch (error) {
                message.error("Server Error", 2)
            }

        }
        getRanking(garageId)
    }, [garageId])

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };


    const taskLabels = Object.keys(tasks);

    const data = {
        labels: taskLabels,
        datasets: [{
            label: 'Tasks',
            data: taskLabels.map(label => tasks[label]),
            backgroundColor: taskLabels.map(label => taskStatusColors[label]),
            borderWidth: 1
        }]
    };

    return (
        <>
            <div className='mx-1 px-4 pb-2 font-bold text-lg'>Thống Kê Công Việc</div>
            <div className=' h-fit min-h-12 flex mx-1 mb-2 gap-2'>
                <div className='flex flex-col flex-1 items-center bg-white rounded-xl border-2 shadow-md '>

                    <div className=' flex p-4 gap-2 '>
                        <div>Thống kê theo:</div>
                        <RangePicker onChange={handleDateChange} />
                        <Select onChange={(value => setFilterMechanic(value))} placeholder="Thợ sửa chữa">
                            <Select.Option value={""} >Tất cả</Select.Option>
                            {mechanics && mechanics.map((mechanic, index) => (
                                <Select.Option key={index} value={mechanic.id} >{mechanic.user.name}</Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className='p-4 w-[90%] rounded border-2 m-4  '>
                        <Bar
                            data={data}
                            width={400}
                            height={200}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>

                <div className='flex flex-col items-center bg-white rounded-xl border-2 shadow-md '>
                    <div className='p-4 font-semibold'>
                        Bảng xếp hạng
                    </div>
                    <Table dataSource={dataRanking} className='p-4' pagination={false}>
                        <Table.Column title="Hạng" key="index" render={(text, record, index) => index + 1} />
                        <Table.Column title="Thợ" dataIndex={"id"} key={"id"} render={(id) => (
                            <>{
                                mechanics.find((mechanic) => mechanic.id === id)?.user?.name
                            }</>
                        )} />
                        <Table.Column
                            title={
                                <div className='flex flex-col items-center'>
                                    <FaRegStar color='red' />
                                    <div className='text-xs'>hard</div>
                                </div>
                            }
                            dataIndex="hard"
                            key="hard"
                        />
                        <Table.Column
                            title={
                                <div className='flex flex-col items-center'>
                                    <FaRegStar color='yellow' />
                                    <div className='text-xs'>medium</div>
                                </div>
                            }
                            dataIndex="medium"
                            key="medium"
                        />
                        <Table.Column
                            title={
                                <div className='flex flex-col items-center'>
                                    <FaRegStar color='green' />
                                    <div className='text-xs'>easy</div>
                                </div>
                            }
                            dataIndex="easy"
                            key="easy"
                        />
                        <Table.Column title="Điểm" dataIndex="score" key="score" />
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Statistics