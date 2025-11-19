import { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import BasicDropDown from '../../../General/BasicDropDown'

const ResetPassword = ({ resetPasswordRef }) => {
  return (
    <Grid container gap={2}>
      <Grid size={12}>
        <TextField
          label='New password'
          defaultValue={resetPasswordRef.current.newPassword}
          onChange={e =>
            (resetPasswordRef.current.newPassword = e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label='Confirm password'
          defaultValue={resetPasswordRef.current.confirmPassword}
          onChange={e =>
            (resetPasswordRef.current.confirmPassword = e.target.value)
          }
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
export default ResetPassword
