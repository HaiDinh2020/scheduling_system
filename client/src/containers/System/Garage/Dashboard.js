import React from 'react'
import { Badge, Card, Menu, Table } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import icons from '../../../ultils/icons';
import { Header } from '../../Public';

const { FaStopwatch, FaSpinner, FaCircleCheck } = icons
const {BsListUl} = icons

const Dashboard = () => {
    // Giả sử result là một mảng các công việc như bạn đã sử dụng trong PHP
    const result = [];

    return (
        <section>
            <div>
                <Header />
            </div>
            <div className="flex flex-row">

                <div className="pt-4">
                    <Menu
                        mode="inline"
                        style={{ width: 240 }}
                    >
                        <SubMenu key="sub1" title="Task Manager">
                            <Menu.Item key="1">Create Task</Menu.Item>
                            <Menu.Item key="2">View Tasks</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="Engineer Manager">
                            <Menu.Item key="3">Assign Tasks</Menu.Item>
                            <Menu.Item key="4">View Engineers</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                {/* Right side columns */}
                <div className="flex-1 ">
                    <div className="flex flex-col">
                        <div className='flex'>
                            <div className="w-1/3 p-4">
                                <Card >
                                    <h5 class="text-lg font-semibold mb-2">Pending</h5>

                                    <div class="flex items-center">
                                        <FaStopwatch size={30} color='red' />
                                        <div class="ml-3">
                                            <h6 class="text-lg font-semibold">10</h6>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="w-1/3 p-4">
                                <Card >
                                    <h5 class="text-lg font-semibold mb-2">In progress</h5>

                                    <div class="flex items-center">
                                        <FaSpinner size={30} color='orange' />
                                        <div class="ml-3">
                                            <h6 class="text-lg font-semibold">10</h6>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="w-1/3 p-4">
                                <Card >
                                    <h5 class="text-lg font-semibold mb-2">Complete</h5>

                                    <div class="flex items-center">
                                        <FaCircleCheck size={30} color='green' />
                                        <div class="ml-3">
                                            <h6 class="text-lg font-semibold">10</h6>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        


                        {/* Recent Sales */}
                        <div className="w-full p-4">
                            <Card className="recent-sales overflow-auto">
                                <div className="card-body">
                                    <h5 className="card-title">Task Report <span></span></h5>
                                    <Table dataSource={result} pagination={true}>
                                        <Table.Column title="Sr.no." dataIndex="srNo" key="srNo" />
                                        <Table.Column title="Assigned By" dataIndex="assignBy" key="assignBy" />
                                        <Table.Column title="Employee Name" dataIndex="empName" key="empName" />
                                        <Table.Column title="Company Name" dataIndex="companyName" key="companyName" />
                                        <Table.Column title="Task Name" dataIndex="taskName" key="taskName" />
                                        <Table.Column title="Allocation Date" dataIndex="allocationDate" key="allocationDate" />
                                        <Table.Column title="Start Date" dataIndex="startDate" key="startDate" />
                                        <Table.Column title="Start Time" dataIndex="startTime" key="startTime" />
                                        <Table.Column title="End Date" dataIndex="endDate" key="endDate" />
                                        <Table.Column title="End Time" dataIndex="endTime" key="endTime" />
                                        <Table.Column title="Deadline" dataIndex="deadline" key="deadline" />
                                        <Table.Column title="Status" dataIndex="workStatus" key="workStatus" render={status => (
                                            <Badge color={status === 'Pending' ? 'danger' : status === 'In-progress' ? 'warning' : 'success'} text={status} />
                                        )} />
                                    </Table>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default Dashboard;