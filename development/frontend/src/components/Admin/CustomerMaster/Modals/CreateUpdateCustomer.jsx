import { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import BasicDropDown from '../../../General/BasicDropDown'
import * as usersActions from '../../../../actions/users_api'

const CreateUpdateCustomer = ({ createCustomerRef, modalAction }) => {
  const [value, setValue] = useState('')
  const [users, setUsers] = useState([])

  const { data: isUsers, refetch: refetchUsers } = usersActions.useGetAllUsers()

  useEffect(() => {
    refetchUsers()
  }, [])

  useEffect(() => {
    if (isUsers) {
      setUsers(isUsers.map(user => ({ label: user.user_name, value: user.id })))
      if (modalAction === 'Edit') {
        setValue(createCustomerRef.current.user_id)
      }
    }
  }, [isUsers])

  useEffect(() => {
    if (modalAction === 'Edit' && value) {
      createCustomerRef.current.user_id = value
    }
  }, [value])

  return (
    <div style={{ height: '300px', overflow: 'auto', scrollbarWidth: 'thin' }}>
      <Grid container gap={2}>
        <Grid size={12}>
          <TextField
            label='Customer Name'
            defaultValue={createCustomerRef.current.customer_name}
            onChange={e =>
              (createCustomerRef.current.customer_name = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Customer Address'
            defaultValue={createCustomerRef.current.customer_address}
            onChange={e =>
              (createCustomerRef.current.customer_address = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Customer Area'
            defaultValue={createCustomerRef.current.customer_area}
            onChange={e =>
              (createCustomerRef.current.customer_area = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Customer City'
            defaultValue={createCustomerRef.current.customer_city}
            onChange={e =>
              (createCustomerRef.current.customer_city = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Customer State'
            defaultValue={createCustomerRef.current.customer_state}
            onChange={e =>
              (createCustomerRef.current.customer_state = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Pincode'
            defaultValue={createCustomerRef.current.pincode}
            onChange={e => (createCustomerRef.current.pincode = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Email'
            defaultValue={createCustomerRef.current.email}
            onChange={e => (createCustomerRef.current.email = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Contact No'
            defaultValue={createCustomerRef.current.contact_no}
            onChange={e =>
              (createCustomerRef.current.contact_no = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Pending amount'
            defaultValue={createCustomerRef.current.pending_amount}
            onChange={e =>
              (createCustomerRef.current.pending_amount = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='GST amount'
            defaultValue={createCustomerRef.current.gst}
            onChange={e => (createCustomerRef.current.gst = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Whatsapp No'
            defaultValue={createCustomerRef.current.whatsapp_no}
            onChange={e =>
              (createCustomerRef.current.whatsapp_no = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Alternate No'
            defaultValue={createCustomerRef.current.alternate_no}
            onChange={e =>
              (createCustomerRef.current.alternate_no = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label='Response'
            defaultValue={createCustomerRef.current.response}
            onChange={e =>
              (createCustomerRef.current.response = e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <BasicDropDown
            inputLabel='Assign customer'
            menuItems={users}
            value={value}
            setValue={setValue}
          />
        </Grid>
      </Grid>
    </div>
  )
}
export default CreateUpdateCustomer
