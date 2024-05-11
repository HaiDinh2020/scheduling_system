
import React, { useEffect, useState } from 'react'
import { Space, Table, Button, message, Popconfirm } from 'antd';
import CreateCarModal from './CreateCarModal';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import icons from '../../../ultils/icons'
import * as actions from '../../../store/actions'


const { Column } = Table;
const { FiPlus, FiTrash2 } = icons

const ListCars = () => {

  const dispatch = useDispatch();

  const [isModalCreateCarOpen, setIsModalCreateCarOpen] = useState(false);
  const { cars } = useSelector(state => state.cars)

  const createCar = () => {
    setIsModalCreateCarOpen(true)
  }

  const confirmDelete = (e) => {
    dispatch(actions.deleteCar(e.id))
  };




  return (
    <div className='container flex flex-col items-center'>
      <div className='w-[95%] mb-2 flex justify-end'>
        <Button
          icon={<FiPlus />}
          size='large'
          onClick={createCar}
        >
          Thêm xe
        </Button>
      </div>
      <CreateCarModal isModalOpen={isModalCreateCarOpen} setIsModalOpen={setIsModalCreateCarOpen} />
      <div className='bg-white h-full min-h-12 flex items-center rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
        <Table
          className='w-full'
          dataSource={cars}
          pagination={{ pageSize: 5 }}
        >
          <Column title="Biển số" dataIndex="number_plate" key="number_plate" />
          <Column title="Màu xe" dataIndex="color" key="color" />
          <Column title="Hãng xe" dataIndex="make" key="make" />
          <Column title="Dòng xe" dataIndex="model" key="model" />
          <Column title="Năm sản xuất" dataIndex="year" key="year" />
          <Column
            title="Action"
            key="action"
            align='center'
            render={(_, record) => (
              <Space className='items-center' size="large">
                <Popconfirm
                  title="Delete"
                  description="Are you sure to delete this car?"
                  onConfirm={() => confirmDelete(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className='cursor-pointer'  ><FiTrash2 color='red' /></div>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
        <ToastContainer />
      </div>
    </div>
  )
}

export default ListCars