import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { apiGetMake, apiGetModel, apiGetYear } from '../../services/Customer/customer';
import icons from '../../ultils/icons';
import * as actions from '../../store/actions'
import { ToastContainer, toast } from 'react-toastify';


const { FiPlus } = icons

const CreateCarModal = ({ isModalOpen, setIsModalOpen }) => {

    const dispatch = useDispatch();

    const [listMake, setListMake] = useState([])
    const [listModel, setListModel] = useState([])
    const [listYear, setListYear] = useState([])
    const [make, setMake] = useState();
    const [model, setModel] = useState("CX5");
    const [year, setYear] = useState();


    useEffect(() => {
        const getMake = async () => {
            const response = await apiGetMake();
            const makes = response.data?.results.map((item) => item.make)
            setListMake(makes)
        }
        getMake()
    }, [])

    useEffect(() => {
        setYear();
        setModel();
        setListModel([])
        setListYear([])
        const getModel = async (make) => {
            const response = await apiGetModel(make)
            const models = response.data?.results.map((item) => item.model)
            setListModel(models)
        }
        make && getModel(make)
    }, [make])

    useEffect(() => {
        setListYear([])
        const getYear = async (make, model) => {
            const response = await apiGetYear(make, model)
            const years = response.data?.results.map((item) => item.year.slice(0,4))
            setListYear(years)
        }
        make && model && getYear(make, model)
    }, [make, model])

    const handleMakeChange = (value) => {
        setMake(value)
        setModel()
        setYear()
    }

    const handleModelChange = (value) => {
        setModel(value)
        setYear()
    }

    const handleYearChange = (value) => {
        setYear(value)
    }

    const handleOk = (value) => {
        if(!make || !model || !year) {
            toast("Please input corect data", {type: "error"})
        } else {
            const dataCreateCar = {
                number_plate: value.number_plate, 
                color: value.color,
                make: make,
                model: model,
                year: year
            }
            dispatch(actions.createCar(dataCreateCar))
            setIsModalOpen(false)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal title="Thêm xe" centered open={isModalOpen} onCancel={handleCancel} footer >
                <Form
                    labelCol={{
                        span: 7,
                    }}
                    labelWrap
                    wrapperCol={{
                        span: 13,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                    variant='filled'
                    onFinish={handleOk}
                >
                    <Form.Item name={"number_plate"} label="Biển số xe" rules={[{required:true, message: "Please input number plate"}]}> 
                        <Input placeholder='Biển số xe' />
                    </Form.Item>

                    <Form.Item name={"color"} label="Màu xe" rules={[{required:true, message: "Please input car's color"}]}> 
                        <Input placeholder='Màu xe' />
                    </Form.Item>

                    <Form.Item
                        name="make"
                        label="Chọn hãng xe"
                        rules={[{ required: true, message: 'Please select make!' }]}
                    >
                        <Select
                            showSearch
                            onChange={handleMakeChange}
                            options={listMake.map((make) => ({
                                label: make,
                                value: make,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="model"
                        label="Chọn dòng xe"
                        rules={[{ required: true, message: 'Please select model!' }]}
                    >
                        <Select
                            value={model}
                            onChange={handleModelChange}
                            options={listModel.map((model) => ({
                                label: model,
                                value: model,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        name="year"
                        label="Năm sản xuất"
                        rules={[{ required: true, message: 'Please select model!' }]}
                    >
                        <Select
                            value={year}
                            onChange={handleYearChange}
                            options={listYear.map((year) => ({
                                label: year,
                                value: year,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        className=' flex justify-end'
                    >
                        <Space>
                            <Button type='default' onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button type="primary" htmlType="submit" icon={<FiPlus />} >
                                Thêm xe
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <ToastContainer autoClose={2000}/>
            </Modal>
        </div>
    )
}

export default CreateCarModal