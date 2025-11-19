import { useCallback } from 'react'
import BaseModal from '../../General/BaseModal'
import { Button } from '@mui/material'
import {
  Close,
  Delete,
  Info,
  NoteAdd,
  Save,
  PersonAddAlt,
  Upload
} from '@mui/icons-material'
import { Spinner } from 'react-bootstrap'
import AssignCustomer from './Modals/AssignCustomer'
import CreateUpdateCustomer from './Modals/CreateUpdateCustomer'
import DeleteCustomer from './Modals/DeleteCustomer'
import CustomerInfo from './Modals/CustomerInfo'
import UploadImages from './Modals/UploadImages'
import { CREATE_CUSTOMER } from './CustomerMaster'

const modalParams = {
  Add: {
    title: 'Add Customer',
    size: 'md',
    footerText1: 'Add',
    startIcon: <NoteAdd />
  },
  Edit: {
    title: 'Edit Customer',
    size: 'md',
    footerText1: 'Update',
    startIcon: <Save />
  },
  Info: {
    title: 'Customer Info',
    size: 'md',
    startIcon: <Info />
  },
  Delete: {
    title: 'Delete Customer',
    size: 'md',
    footerText1: 'Delete',
    startIcon: <Delete />
  },
  Assign: {
    title: 'Assign Customer',
    size: 'md',
    footerText1: 'Assign',
    startIcon: <PersonAddAlt />
  },
  Upload: {
    title: 'Upload Images',
    size: 'md',
    footerText1: 'Upload',
    startIcon: <Upload />
  }
}

const handleModalContent = (
  modalAction,
  createCustomerRef,
  uploadImagesRef,
  deleteCustomerRef,
  assignCustomerRef
) => {
  switch (modalAction) {
    case 'Add':
    case 'Edit':
      return (
        <CreateUpdateCustomer
          createCustomerRef={createCustomerRef}
          modalAction={modalAction}
        />
      )
    case 'Info':
      return <CustomerInfo createCustomerRef={createCustomerRef} />
    case 'Delete':
      return <DeleteCustomer deleteCustomerRef={deleteCustomerRef} />
    case 'Assign':
      return <AssignCustomer assignCustomerRef={assignCustomerRef} />
    case 'Upload':
      return <UploadImages uploadImagesRef={uploadImagesRef} />
    default:
      return <div>This is Default Modal Content</div>
  }
}

const handleFooter = (modalAction, handleCancel, handleActions, loader) => {
  if (modalAction === 'Info') {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        <Button variant='outlined' startIcon={<Close />} onClick={handleCancel}>
          Close
        </Button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <Button
        variant='contained'
        startIcon={
          loader ? (
            <Spinner animation='border' size='sm' />
          ) : (
            modalParams[modalAction].startIcon
          )
        }
        style={{ backgroundColor: '#8e70cf' }}
        onClick={handleActions}
      >
        {modalParams[modalAction].footerText1}
      </Button>
      <Button
        variant='outlined'
        startIcon={<Close />}
        onClick={handleCancel}
        style={{ color: '#8e70cf' }}
      >
        Cancel
      </Button>
    </div>
  )
}

const CustomerModals = ({
  isOpenModal,
  setIsOpenModal,
  modalAction,
  createCustomerRef,
  uploadImagesRef,
  deleteCustomerRef,
  assignCustomerRef,
  handleActions,
  loader
}) => {
  const handleCancel = () => {
    setIsOpenModal(false)
    createCustomerRef.current = { ...CREATE_CUSTOMER }
  }

  const modalContent = useCallback(() => {
    if (isOpenModal) {
      return handleModalContent(
        modalAction,
        createCustomerRef,
        uploadImagesRef,
        deleteCustomerRef,
        assignCustomerRef
      )
    }
  }, [modalAction])

  const footer = useCallback(() => {
    if (isOpenModal) {
      return handleFooter(modalAction, handleCancel, handleActions, loader)
    }
  }, [modalAction, loader, isOpenModal])

  return (
    <BaseModal
      open={isOpenModal}
      setOpen={setIsOpenModal}
      toggle={handleCancel}
      title={modalParams[modalAction]?.title}
      footer={footer}
      size={modalParams[modalAction]?.size}
    >
      {modalContent(modalAction)}
    </BaseModal>
  )
}
export default CustomerModals
