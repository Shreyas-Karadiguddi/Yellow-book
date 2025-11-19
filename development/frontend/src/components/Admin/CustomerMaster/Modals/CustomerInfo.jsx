import { useEffect, useState } from 'react'
import { Divider, Grid } from '@mui/material'
import {
  Person,
  Home,
  LocationCity,
  Public,
  PinDrop,
  // Email,
  Phone,
  AccountBalanceWallet,
  AssignmentInd,
  Receipt,
  WhatsApp
} from '@mui/icons-material'
import { Spinner } from 'react-bootstrap'
import * as userActions from '../../../../actions/users_api'
import * as customerActions from '../../../../actions/customer_api'

const CustomerInfo = ({ createCustomerRef }) => {
  const [userName, setUserName] = useState('')

  const { data: isUsers, refetch: refetchUsers } = userActions.useGetAllUsers()

  const {
    data: isCustomerImages,
    refetch: refetchCustomerImages,
    remove: removeCache,
    isFetching: isFetchingCustomerImages
  } = customerActions.useGetCustomerImages(createCustomerRef.current.id)

  useEffect(() => {
    refetchUsers()
    refetchCustomerImages()
    return () => {
      removeCache()
    }
  }, [])

  useEffect(() => {
    if (isUsers) {
      setUserName(
        isUsers.find(user => user.id === createCustomerRef.current.user_id)
          ?.user_name || ''
      )
    }
  }, [isUsers])

  return (
    <div style={{ height: '400px', overflow: 'auto', scrollbarWidth: 'thin' }}>
      <Grid
        container
        flexDirection='column'
        sx={{ fontSize: '16px', color: '#333' }}
      >
        <Grid item>
          <Person color='primary' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Name:</b>
          {createCustomerRef.current.customer_name}
        </Grid>

        <Grid item>
          <Home color='action' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Address:</b>
          {createCustomerRef.current.customer_address}
        </Grid>

        <Grid item>
          <LocationCity color='error' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Area:</b>
          {createCustomerRef.current.customer_area || 'Not found'}
        </Grid>

        <Grid item>
          <LocationCity
            color='secondary'
            sx={{ verticalAlign: 'middle', mr: 1 }}
          />
          <b style={{ display: 'inline-block', width: '120px' }}>City:</b>
          {createCustomerRef.current.customer_city || 'Not found'}
        </Grid>

        <Grid item>
          <Public color='success' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>State:</b>
          {createCustomerRef.current.customer_state || 'Not found'}
        </Grid>

        <Grid item>
          <PinDrop color='warning' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Pincode:</b>
          {createCustomerRef.current.pincode || 'Not found'}
        </Grid>

        {/* <Grid item>
          <Email color='info' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Email:</b>
          {createCustomerRef.current.email || 'Not found'}
        </Grid> */}

        <Grid item>
          <Phone color='primary' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Contact No:</b>
          {createCustomerRef.current.contact_no || 'Not found'}
        </Grid>

        <Grid item>
          <AccountBalanceWallet
            color='secondary'
            sx={{ verticalAlign: 'middle', mr: 1 }}
          />
          <b style={{ display: 'inline-block', width: '120px' }}>
            Pending Amt:
          </b>
          {createCustomerRef.current.pending_amount || 'Not found'}
        </Grid>

        <Grid item>
          <AssignmentInd
            color='success'
            sx={{ verticalAlign: 'middle', mr: 1 }}
          />
          <b style={{ display: 'inline-block', width: '120px' }}>
            Assigned To:
          </b>
          {userName || 'Not found'}
        </Grid>

        <Grid item>
          <Receipt color='error' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>GST:</b>
          {createCustomerRef.current.gst || 'Not found'}
        </Grid>

        <Grid item>
          <WhatsApp color='success' sx={{ verticalAlign: 'middle', mr: 1 }} />
          <b style={{ display: 'inline-block', width: '120px' }}>Whatsapp:</b>
          {createCustomerRef.current.whatsapp_no || 'Not found'}
        </Grid>
      </Grid>
      <Divider sx={{ height: 2 }} />
      <div style={{ padding: '10px', fontWeight: 'bold' }}>Business Image</div>
      <div
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '10px',
          padding: '2px',
          textAlign: 'center',
          height: '180px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#fafafa',
          transition: 'background 0.2s ease-in-out',
          position: 'relative'
        }}
      >
        {isFetchingCustomerImages && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            <Spinner animation='border' variant='primary' size='sm' />
          </div>
        )}
        {isCustomerImages?.business_image ? (
          <img
            src={isCustomerImages.business_image}
            alt='Business'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          !isFetchingCustomerImages && 'No Business Image Found'
        )}
      </div>

      <div style={{ padding: '10px', fontWeight: 'bold' }}>Customer Image</div>
      <div
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '10px',
          padding: '2px',
          textAlign: 'center',
          height: '180px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#fafafa',
          transition: 'background 0.2s ease-in-out',
          position: 'relative'
        }}
      >
        {isFetchingCustomerImages && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            <Spinner animation='border' variant='primary' size='sm' />
          </div>
        )}
        {isCustomerImages?.customer_image ? (
          <img
            src={isCustomerImages.customer_image}
            alt='Customer'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          !isFetchingCustomerImages && 'No Customer Image Found'
        )}
      </div>
    </div>
  )
}
export default CustomerInfo
