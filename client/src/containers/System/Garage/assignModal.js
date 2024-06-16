import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Radio, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { apiGetAllEngineer, apiGetAvailableEngineer } from '../../../services/Engineer/engineer';

const AssignModal = ({ isModalOpen, setIsModalOpen, bookingId, socket }) => {

    const dispatch = useDispatch();
    const garage_id = useSelector(state => state.garage?.garageInfor?.id)

    const [engineers, setEngineers] = useState([])
    const [availableEngineer, setAvailableEngineer] = useState([])

    useEffect(() => {
        const getAllEngineer = async (garageId) => {
            try {
                const engineers = await apiGetAllEngineer(garageId)
                if (engineers?.data?.err === 0) {
                    setEngineers(engineers?.data?.response)
                }
            } catch (error) {
                message.error("server error", 2)
            }

        }
        const getAvailableEngineer = async (garageId) => {
            try {
                const availableEngin = await apiGetAvailableEngineer(garageId)
                if (availableEngin?.data?.err === 0) {
                    setAvailableEngineer(availableEngin?.data.response)
                }
            } catch (error) {
                message.error("server error")
            }
        }

        getAllEngineer(garage_id)
        getAvailableEngineer(garage_id)
    }, [garage_id])

    useEffect(() => {
        console.log(availableEngineer)
    }, [availableEngineer])

    const onFinish = async (value) => {
        dispatch(actions.updateBookingGarage(garage_id, bookingId, value.level, value.estimated_time))
        setIsModalOpen(false);
    }

    const onFinishFailed = async (value) => {
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal title={`Đánh giá tổng quan`} centered open={isModalOpen} onCancel={handleCancel} footer >

            <div>
                <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            label="Độ khó"
                            name={"level"}
                        >
                            <Radio.Group defaultValue={"easy"} >
                                <Radio value={"easy"}>easy</Radio>
                                <Radio value={"medium"}>medium</Radio>
                                <Radio value={"hard"}>hard</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian dự kiến"
                            name="estimated_time"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian dự kiến hoàn thành!' }]}
                        >
                            <Input type="number" addonAfter="phút" />
                        </Form.Item>
                        {/* <Form.Item name={"engineerId"} initialValue={""} label="Phân công cho">
                            <Radio.Group defaultValue="" name="engineerId">
                                {
                                    engineers && engineers.length > 0 &&
                                    engineers.map((engineer, index) => (
                                        <div key={index}>
                                            <Radio value={engineer.id}>
                                                {engineer.user?.name} -
                                                {availableEngineer.some(available => available.id === engineer.id) ? ' (free)' : ' (busy)'}
                                            </Radio>

                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item> */}

                        <Form.Item>

                            <Button type="primary" htmlType="submit">
                                Gửi
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default AssignModal