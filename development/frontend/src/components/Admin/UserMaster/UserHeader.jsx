import { Add, Search, CameraAlt } from '@mui/icons-material'
import { Button, TextField, InputAdornment } from '@mui/material'

const UserHeader = ({ filter, setModalAction, setIsOpenModal, setFilter }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10,
        gap: '10px'
      }}
    >
      <TextField
        value={filter}
        onChange={e => setFilter(e.target.value)}
        label='Filter'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiInputBase-input': {
            padding: '1px 0',
            fontSize: '14px',
            height: '35px'
          }
        }}
      />

      <Button
        variant='contained'
        startIcon={<Add />}
        style={{ backgroundColor: '#8e70cf' }}
        onClick={() => {
          setModalAction('Add')
          setIsOpenModal(true)
        }}
      >
        CREATE
      </Button>
    </div>
  )
}

export default UserHeader
