/* eslint-disable no-plusplus */
import React      from 'react'
import { Modal }  from 'antd'

type FinishModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen:    boolean
  onFinish?:      ((values: any) => void) | undefined
};

const FinishModal = ({ isModalOpen, setIsModalOpen, onFinish }:FinishModalProps) => {

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal title='Ar norite pabaigti?' open={isModalOpen} onOk={onFinish} onCancel={handleCancel} />
  )
}

export default FinishModal
