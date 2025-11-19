import { useCallback, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CustomerHeader from './CustomerHeader'
import CustomerModals from './CustomerModals'
import CustomerList from './CustomersList'
import BaseTable from '../../General/BaseTable'
import { Notification } from '../../General/Notification'
import * as customerActions from '../../../actions/customer_api'

const columns = [
  { key: 'name', label: 'Name', width: '70%', align: 'left' },
  { key: 'actions', label: 'Actions', align: 'center' }
]

export const CREATE_CUSTOMER = {
  id: '',
  customer_name: '',
  customer_address: '',
  customer_area: '',
  customer_city: '',
  customer_state: '',
  pincode: '',
  email: '',
  contact_no: '',
  pending_amount: '',
  user_id: '',
  gst: '',
  whatsapp_no: '',
  alternate_no: ''
}

const UPLOAD_IMAGES = {
  customer_id: '',
  imageData: ''
}

const DELETE_CUSTOMER = {
  customer_id: '',
  customer_name: ''
}

const ASSIGN_CUSTOMER = {
  customer_id: '',
  user_id: ''
}

export default function CustomerMaster () {
  const [filter, setFilter] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [customers, setCusomers] = useState([])
  const [loader, setLoader] = useState(false)

  const createCustomerRef = useRef(CREATE_CUSTOMER)
  const uploadImagesRef = useRef(UPLOAD_IMAGES)
  const deleteCustomerRef = useRef(DELETE_CUSTOMER)
  const assignCustomerRef = useRef(ASSIGN_CUSTOMER)

  const {
    data: isCustomers,
    refetch: refetchCustomers,
    isFetching: isFetchingCustomers
  } = customerActions.useGetCustomers(page, pageSize, filter)

  const { status: isCustomerAdded, mutate: createCustomer } =
    customerActions.useCreateCustomer()

  const { status: isImagesUploaded, mutate: uploadImages } =
    customerActions.useUploadCustomerImages(UPLOAD_IMAGES.customer_id)

  const { status: isDeleteCustomers, mutate: deleteCustomer } =
    customerActions.useDeleteCustomer()

  const { status: isCustomerUpdated, mutate: updateCustomer } =
    customerActions.useUpdateCustomer()

  const { status: isCustomerAssigned, mutate: assignCustomer } =
    customerActions.useAssignCustomer()

  useEffect(() => {
    if (isCustomerAdded) {
      if (isCustomerAdded === 'success') {
        setIsOpenModal(false)
        createCustomerRef.current = { ...CREATE_CUSTOMER }
        setPage(1)
        setPageSize(10)
        Notification({
          type: 'success',
          title: 'Customer created successfully!'
        })
        setLoader(false)
      } else if (isCustomerAdded === 'error') {
        Notification({ type: 'error', title: 'Failed to create a customer!' })
        setLoader(false)
      }
    }
  }, [isCustomerAdded])

  useEffect(() => {
    if (isImagesUploaded) {
      if (isImagesUploaded === 'success') {
        setIsOpenModal(false)
        uploadImagesRef.current = UPLOAD_IMAGES
        Notification({
          type: 'success',
          title: 'Image uploaded successfully!'
        })
        setLoader(false)
      } else if (isImagesUploaded === 'error') {
        setIsOpenModal(false)
        Notification({
          type: 'success',
          title: 'Failed to upload the images!'
        })
        setLoader(false)
      }
    }
  }, [isImagesUploaded])

  useEffect(() => {
    if (isDeleteCustomers) {
      if (isDeleteCustomers === 'success') {
        setIsOpenModal(false)
        setPage(1)
        setPageSize(10)
        Notification({
          type: 'success',
          title: 'Customer deleted successfully!'
        })
        setLoader(false)
      } else if (isDeleteCustomers === 'error') {
        setIsOpenModal(false)
        Notification({
          type: 'error',
          title: 'Failed to delete the customer!'
        })
        setLoader(false)
      }
    }
  }, [isDeleteCustomers])

  useEffect(() => {
    if (isCustomerUpdated) {
      if (isCustomerUpdated === 'success') {
        setIsOpenModal(false)
        setCusomers(prevData => {
          const newData = [...prevData]
          const index = newData.findIndex(
            item => item.id === createCustomerRef.current.id
          )
          if (index !== -1) {
            newData[index] = {
              ...newData[index],
              user_id: assignCustomerRef.current.user_id
            }
          }
          return newData
        })
        Notification({
          type: 'success',
          title: 'Customer updated successfully!'
        })
        setLoader(false)
      } else if (isCustomerUpdated === 'error') {
        setIsOpenModal(false)
        Notification({
          type: 'error',
          title: 'Failed to update the customer!'
        })
        setLoader(false)
      }
    }
  }, [isCustomerUpdated])

  useEffect(() => {
    if (isCustomerAssigned) {
      if (isCustomerAssigned === 'success') {
        setIsOpenModal(false)
        setCusomers(prevData => {
          const newData = [...prevData]
          const index = newData.findIndex(
            item => item.id === assignCustomerRef.current.customer_id
          )
          if (index !== -1) {
            newData[index] = {
              ...newData[index],
              user_id: assignCustomerRef.current.user_id
            }
          }
          return newData
        })
        Notification({
          type: 'success',
          title: 'Customer assigned successfully!'
        })
        setLoader(false)
      } else if (isCustomerAssigned === 'error') {
        Notification({
          type: 'success',
          title: 'Failed to assign successfully!'
        })
        setLoader(false)
      }
    }
  }, [isCustomerAssigned])

  useEffect(() => {
    refetchCustomers()
  }, [page, pageSize, filter])

  useEffect(() => {
    if (isCustomers) {
      setCusomers(isCustomers.customers)
    }
  }, [isCustomers])

  const handleActions = useCallback(() => {
    setLoader(true)
    switch (modalAction) {
      case 'Add':
        createCustomer(createCustomerRef.current)
        break
      case 'Edit':
        updateCustomer(createCustomerRef.current)
        break
      case 'Upload':
        uploadImages(uploadImagesRef.current.imageData)
        break
      case 'Delete':
        deleteCustomer(deleteCustomerRef.current.customer_id)
        break
      case 'Assign':
        assignCustomer(assignCustomerRef.current)
        break
      default:
        break
    }
  }, [modalAction])

  return (
    <>
      <CustomerHeader
        filter={filter}
        setFilter={setFilter}
        setModalAction={setModalAction}
        setIsOpenModal={setIsOpenModal}
      />
      <InfiniteScroll
        dataLength={customers.length}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        scrollableTarget='scrollable-table'
      >
        <BaseTable
          isLoading={isFetchingCustomers}
          height={450}
          columns={columns}
          rows={customers}
          renderRow={({ row, index }) => (
            <CustomerList
              item={row}
              setModalAction={setModalAction}
              setIsOpenModal={setIsOpenModal}
              uploadImagesRef={uploadImagesRef}
              deleteCustomerRef={deleteCustomerRef}
              createCustomerRef={createCustomerRef}
              assignCustomerRef={assignCustomerRef}
            />
          )}
        />
      </InfiniteScroll>
      <CustomerModals
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        modalAction={modalAction}
        createCustomerRef={createCustomerRef}
        uploadImagesRef={uploadImagesRef}
        deleteCustomerRef={deleteCustomerRef}
        assignCustomerRef={assignCustomerRef}
        handleActions={handleActions}
        loader={loader}
      />
    </>
  )
}
