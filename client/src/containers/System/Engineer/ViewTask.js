import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Select, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import icons from '../../../ultils/icons';
import { apiGetTasksOfEngineer } from '../../../services/Engineer/task';
import UpdateTaskModal from '../../../components/Engineer/UpdateTaskModal';
import { taskStatusColors } from '../../../ultils/constants';
import { MdOutlineAssignmentInd } from 'react-icons/md';

const { FaRegClock, MdOutlinePlaylistAddCheck, FaExclamation } = icons

const ViewTask = () => {

    const engineerId = useSelector(state => state.user?.userCurentProfile?.engineer?.id)

    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false)
    const [taskSelect, setTaskSelect] = useState()
    const [tasks, setTasks] = useState([])
    const [filterCar, setfilterCar] = useState("all");
    const [filterStatus, setfilterStatus] = useState("all");


    const filteredTasks = tasks.filter(task => {
        let matchCar = true;
        let matchStatus = true;

        if (filterCar !== "all") {
            matchCar = task.booking_id === filterCar;
        }

        if (filterStatus !== "all") {
            matchStatus = task.task_status === filterStatus;
        }

        return matchCar && matchStatus;
    });


    useEffect(() => {
        console.log(engineerId)
        const getTasksOfGarage = async (engineerId) => {
            try {
                const response = await apiGetTasksOfEngineer(engineerId)

                if (response?.data?.err === 0) {
                    setTasks(response?.data?.response)
                } else {
                    message.error("Fail to get tasks of engineer", 2)
                }
            } catch (error) {
                message.error("Failed to get tasks: Network error", 2);
            }
        }
        getTasksOfGarage(engineerId)
    }, [engineerId])

    const updateTask = (task) => {
        setTaskSelect(task)
        setIsUpdateTaskModalOpen(true)
    }

    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>

                <div>
                    <div className="w-full p-4">

                        <div className="card-body">
                            <UpdateTaskModal isModalOpen={isUpdateTaskModalOpen} setIsModalOpen={setIsUpdateTaskModalOpen} taskData={taskSelect} setTasks={setTasks} />
                            <div className='flex items-center justify-between '>
                                <div className='flex gap-2 mb-3'>
                                    <h4 className='font-bold'>Tasks for </h4>
                                    <Select
                                        defaultValue={"All"}
                                        onChange={(value) => {
                                            setfilterCar(value)
                                        }}
                                        style={{
                                            minWidth: 250
                                        }}
                                    >
                                        <Select.Option value={"all"} >Tất cả</Select.Option>
                                        {
                                            tasks.length > 0 && tasks.map((task, index) => {
                                                const value = task?.belong_booking?.car.make + " " + task?.belong_booking?.car.model + " " + task?.belong_booking?.car.number_plate
                                                return (
                                                    task?.booking_id && <Select.Option key={index} value={task?.booking_id} >{value}</Select.Option>
                                                )
                                            })
                                        }

                                    </Select>
                                </div>
                                <div>
                                    <Select
                                        defaultValue={"All"}
                                        onChange={(value) => {
                                            setfilterStatus(value)
                                        }}
                                        style={{
                                            minWidth: 100
                                        }}
                                    >
                                        <Select.Option value={"all"} >Tất cả</Select.Option>
                                        <Select.Option value={"assigned"} >Assigned</Select.Option>
                                        <Select.Option value={"in_progress"} >In Progress</Select.Option>
                                        <Select.Option value={"completed"} >Completed</Select.Option>
                                    </Select>
                                </div>
                            </div>
                            <Table
                                dataSource={filteredTasks} pagination={{ current: 1, pageSize: 10 }}
                            >
                                <Table.Column title="Sr.no." dataIndex="id" key="id" render={(text, record, index) => index + 1} />
                                <Table.Column title="Task Name" dataIndex="task_name" key="task_name" width={300} />
                                <Table.Column title="Level" dataIndex="level" key="level"
                                    render={(text) => (
                                        <Tag color={text === "easy" ? "green" : text === "medium" ? "blue" : "red"}>{text.toUpperCase()}</Tag>
                                    )}
                                />
                                <Table.Column title="Start Date" dataIndex="start_date" key="start_date" />
                                <Table.Column title="Start Time" dataIndex="start_time" key="start_time" />
                                <Table.Column title="End Date" dataIndex="end_date" key="end_date" />
                                <Table.Column title="End Time" dataIndex="end_time" key="end_time" />
                                <Table.Column title="Status" dataIndex="task_status" key="task_status" render={(status) => (
                                    <Tag color={taskStatusColors[status]}>{status}</Tag>
                                )} />
                                <Table.Column title="Action" dataIndex="task_status" key="action" render={(status, task) => (
                                    status === "pending" ?
                                        (
                                            <Button type='text' icon={<FaExclamation color={taskStatusColors[status]} size={20} onClick={() => updateTask(task)} />} />
                                        )
                                        : status === "assigned" ?
                                            (
                                                <Button type='text' icon={<MdOutlineAssignmentInd color={taskStatusColors[status]} size={20} onClick={() => updateTask(task)} />} />
                                            )
                                            : status === "in_progress" ?
                                                (
                                                    <Button type='text' icon={<FaRegClock color={taskStatusColors[status]} size={20} onClick={() => updateTask(task)} />} />
                                                )
                                                :
                                                (
                                                    <Button type='text' icon={<MdOutlinePlaylistAddCheck color={taskStatusColors[status]} size={20} />} />
                                                )
                                )} />
                            </Table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask