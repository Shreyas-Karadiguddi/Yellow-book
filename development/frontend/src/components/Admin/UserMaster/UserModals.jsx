import { useCallback, useEffect } from 'react'
import BaseModal from '../../General/BaseModal'
import { Button } from '@mui/material'
import {
  Close,
  Delete,
  Info,
  NoteAdd,
  Save,
  LockReset
} from '@mui/icons-material'
import { Spinner } from 'react-bootstrap'
import CreateUser from './Modals/CreateUser'
import DeleteUser from './Modals/DeleteUser'
import ResetPassword from './Modals/ResetPassword'
import UpdateUser from './Modals/UpdateUser'
import { CREATE_USER, UPDATE_USER, RESET_PASSWORD } from './UserMaster'

const modalParams = {
  Add: {
    title: 'Add User',
    size: 'md',
    footerText1: 'Add',
    startIcon: <NoteAdd />
  },
  Edit: {
    title: 'Edit User',
    size: 'md',
    footerText1: 'Update',
    startIcon: <Save />
  },
  Delete: {
    title: 'Delete User',
    size: 'md',
    footerText1: 'Delete',
    startIcon: <Delete />
  },
  ResetPassword: {
    title: 'Reset Password',
    size: 'md',
    footerText1: 'Reset',
    startIcon: <LockReset />
  }
}

const handleModalContent = (
  modalAction,
  createUserRef,
  updateUserRef,
  resetPasswordRef,
  deleteUserRef
) => {
  switch (modalAction) {
    case 'Add':
      return <CreateUser createUserRef={createUserRef} />
    case 'Edit':
      return <UpdateUser updateUserRef={updateUserRef} />
    case 'Delete':
      return <DeleteUser deleteUserRef={deleteUserRef} />
    case 'ResetPassword':
      return <ResetPassword resetPasswordRef={resetPasswordRef} />
    default:
      return <div>This is Default Modal Content</div>
  }
}

const handleFooter = (modalAction, handleCancel, handleActions, isLoading) => {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <Button
        variant='contained'
        startIcon={
          isLoading ? (
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

const UserModals = ({
  isOpenModal,
  setIsOpenModal,
  modalAction,
  handleActions,
  isLoading,
  createUserRef,
  updateUserRef,
  resetPasswordRef,
  deleteUserRef
}) => {
  const handleCancel = () => {
    setIsOpenModal(false)
    createUserRef.current = { ...CREATE_USER }
    updateUserRef.current = { ...UPDATE_USER }
    resetPasswordRef.current = { ...RESET_PASSWORD }
  }

  const modalContent = useCallback(() => {
    if (isOpenModal) {
      return handleModalContent(
        modalAction,
        createUserRef,
        updateUserRef,
        resetPasswordRef,
        deleteUserRef
      )
    }
  }, [modalAction])

  const footer = useCallback(() => {
    if (isOpenModal) {
      return handleFooter(modalAction, handleCancel, handleActions, isLoading)
    }
  }, [modalAction, isLoading, isOpenModal])

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
export default UserModals
