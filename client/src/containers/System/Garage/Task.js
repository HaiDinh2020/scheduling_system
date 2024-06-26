import React, { useEffect, useState } from 'react'
import { Button, Card, Select, Table, Tag, message } from 'antd';
import moment from 'moment';
import icons from '../../../ultils/icons';
import AddTaskModal from '../../../components/Garage/AddTaskModal';
import { apiCountTasksOfStatus, apiGetTasksOfGarage } from '../../../services/Garage/task';
import { useSelector } from 'react-redux';
import UpdateTaskModal from '../../../components/Garage/UpdateTaskModal';
import './Task.css';
import { taskStatusColors } from '../../../ultils/constants';
import { apiGetAllBooking } from '../../../services/Garage/booking';

const { FaStopwatch, FaSpinner, FaCircleCheck, FiPlus, FaRegClock, MdOutlinePlaylistAddCheck, FaExclamation, MdOutlineAssignmentInd } = icons

const Task = () => {


    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const { mechanics } = useSelector((state) => state.mechanics);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false)
    const [taskSelect, setTaskSelect] = useState()
    const [tasks, setTasks] = useState([])
    const [pendingNum, setPendingNum] = useState()
    const [inProgressNum, setInProgressNum] = useState()
    const [completedNum, setCompletedNum] = useState()
    const [filterCar, setfilterCar] = useState("all");
    const [filterStatus, setfilterStatus] = useState("all");
    const [allBooking, setAllBooking] = useState([])

    useEffect(() => {
        getAllBooking(garageId)
    }, [])

    const getAllBooking = async (garageId) => {
        try {
            const response = await apiGetAllBooking(garageId)

            if (response?.data?.err === 0) {
                setAllBooking(response?.data?.response)
            } else {
                console.log(response?.data?.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getTasksOfGarage = async (garageId) => {
            try {
                const response = await apiGetTasksOfGarage(garageId)

                if (response?.data?.err === 0) {
                    setTasks(response?.data?.response)
                } else {
                    message.error("Fail to get tasks of garage", 2)
                }
            } catch (error) {
                message.error("Fail to get tasks of garage", 2)
            }

        }
        getTasksOfGarage(garageId)
    }, [garageId])

    useEffect(() => {
        const countTasksByStatus = () => {
            // need update: add status assigned 
            const pendingTasks = tasks.filter(task => task.task_status === "pending");
            const inProgressTasks = tasks.filter(task => task.task_status === "in_progress");
            const completedTasks = tasks.filter(task => task.task_status === "completed");

            setPendingNum(pendingTasks.length);
            setInProgressNum(inProgressTasks.length);
            setCompletedNum(completedTasks.length);
        };

        countTasksByStatus();
    }, [tasks]);

    const addTask = () => {
        setIsTaskModalOpen(true)
    }

    const updateTask = (task) => {
        setTaskSelect(task)
        setIsUpdateTaskModalOpen(true)
    }

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

    console.log(filteredTasks)
    return (
        <div >
            <div className="flex-1 ml-2 ">
                <div className="flex flex-col">
                    <div className='flex px-4 gap-4'>
                        <div className="w-1/3">
                            <Card >
                                <h5 class="text-lg font-semibold mb-2">Pending</h5>

                                <div class="flex items-center">
                                    <FaStopwatch size={30} color='#FF6384' />
                                    <div class="ml-3">
                                        <h6 class="text-lg font-semibold">{pendingNum}</h6>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="w-1/3">
                            <Card >
                                <h5 class="text-lg font-semibold mb-2">In progress</h5>

                                <div class="flex items-center">
                                    <FaSpinner className='loading-icon' size={30} color='#64CAFF' />
                                    <div class="ml-3">
                                        <h6 class="text-lg font-semibold">{inProgressNum}</h6>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="w-1/3">
                            <Card >
                                <h5 class="text-lg font-semibold mb-2">Complete</h5>

                                <div class="flex items-center">
                                    <FaCircleCheck size={30} color='#66ed8b' />
                                    <div class="ml-3">
                                        <h6 class="text-lg font-semibold">{completedNum}</h6>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className='w-full px-4 mt-2 flex justify-end'>
                        <Button
                            icon={<FiPlus />}
                            size='large'
                            onClick={addTask}
                        >
                            Add Task
                        </Button>
                        <AddTaskModal isModalOpen={isTaskModalOpen} setIsModalOpen={setIsTaskModalOpen} setTasks={setTasks} />
                    </div>
                    {/* Table task */}
                    <div className="w-full p-4">
                        <Card className="recent-sales overflow-auto">
                            <div className="card-body">
                                <UpdateTaskModal isModalOpen={isUpdateTaskModalOpen} setIsModalOpen={setIsUpdateTaskModalOpen} taskData={taskSelect} setTasks={setTasks} />
                                <div className='flex items-center justify-between '>

                                    <div className='flex gap-2 mb-3 items-center'>
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
                                                allBooking.length > 0 && allBooking.map((booking, index) => {
                                                    const value = booking?.car.make + " " + booking?.car.model + " " + booking?.car.number_plate
                                                    return (
                                                        booking.id && <Select.Option key={index} value={booking.id} >{value}</Select.Option>
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
                                            <Select.Option value={"pending"} >Pending</Select.Option>
                                            <Select.Option value={"assigned"} >Assigned</Select.Option>
                                            <Select.Option value={"in_progress"} >In Progress</Select.Option>
                                            <Select.Option value={"completed"} >Completed</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                <Table
                                    className="custom-table"
                                    dataSource={filteredTasks} pagination={{ current: 1, pageSize: 10 }}
                                >
                                    <Table.Column title="Sr.no." dataIndex="id" key="id" render={(text, record, index) => index + 1} />

                                    <Table.Column title="Assignt to" dataIndex={"assign_to"} key={"assign_to"} render={(assign_to) => (
                                        <>{
                                            mechanics.find((mechanic) => mechanic.id === assign_to)?.user?.name
                                        }</>
                                    )} />
                                    <Table.Column title="Task Name" dataIndex="task_name" key="task_name" width={300} />
                                    <Table.Column title="Level" dataIndex="level" key="level"
                                        render={(text) => (
                                            <Tag color={text === "easy" ? "green" : text === "medium" ? "blue" : "red"}>{text.toUpperCase()}</Tag>
                                        )}
                                    />
                                    <Table.Column title="Allocation Date" dataIndex="allocation_date" key="allocation_date" />
                                    <Table.Column title="Start Date" dataIndex="start_date" key="start_date" />
                                    <Table.Column title="Start Time" dataIndex="start_time" key="start_time" />
                                    <Table.Column title="End Date" dataIndex="end_date" key="end_date" />
                                    <Table.Column title="End Time" dataIndex="end_time" key="end_time" />
                                    <Table.Column title="Status" dataIndex="task_status" key="task_status" render={(status) => (
                                        <Tag color={taskStatusColors[status]}>{status}</Tag>
                                    )} />
                                    <Table.Column title="Action" dataIndex="task_status" render={(status, task) => (
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
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Task