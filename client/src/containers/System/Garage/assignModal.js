import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Radio, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { apiGetAllMechanic, apiGetAvailableMechanic } from '../../../services/Mechanic/mechanic';

const AssignModal = ({ isModalOpen, setIsModalOpen, bookingId, socket }) => {

    const dispatch = useDispatch();
    const garage_id = useSelector(state => state.garage?.garageInfor?.id)

    const [mechanics, setMechanics] = useState([])
    const [availableMechanic, setAvailableMechanic] = useState([])

    useEffect(() => {
        const getAllMechanic = async (garageId) => {
            try {
                const mechanics = await apiGetAllMechanic(garageId)
                if (mechanics?.data?.err === 0) {
                    setMechanics(mechanics?.data?.response)
                }
            } catch (error) {
                message.error("server error", 2)
            }

        }
        const getAvailableMechanic = async (garageId) => {
            try {
                const availableEngin = await apiGetAvailableMechanic(garageId)
                if (availableEngin?.data?.err === 0) {
                    setAvailableMechanic(availableEngin?.data.response)
                }
            } catch (error) {
                message.error("server error")
            }
        }

        getAllMechanic(garage_id)
        getAvailableMechanic(garage_id)
    }, [garage_id])

    useEffect(() => {
        console.log(availableMechanic)
    }, [availableMechanic])

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
                        {/* <Form.Item name={"mechanicId"} initialValue={""} label="Phân công cho">
                            <Radio.Group defaultValue="" name="mechanicId">
                                {
                                    mechanics && mechanics.length > 0 &&
                                    mechanics.map((mechanic, index) => (
                                        <div key={index}>
                                            <Radio value={mechanic.id}>
                                                {mechanic.user?.name} -
                                                {availableMechanic.some(available => available.id === mechanic.id) ? ' (free)' : ' (busy)'}
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