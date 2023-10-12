'use client'

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useGuestsSection } from '@ratatouille/modules/order/react/sections/guests/use-guests-section'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGuestsSection()
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Guests</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map(guest => (
          <Box key={guest.id}>
            <GuestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
              isOrganizer={guest.id === presenter.form.organizerId}
              changeOrganizer={presenter.changeOrganizer}
            />
          </Box>
        ))}
      </Grid>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant="contained" onClick={presenter.addGuest}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" disabled={presenter.isSubmittable() === false} onClick={presenter.onNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const GuestRow: React.FC<{
  id: string
  firstName: string
  lastName: string
  age: number
  isOrganizer: boolean
  changeOrganizer: (id: string) => void
  onChange: <K extends keyof OrderingDomainModel.GuestValues>(
    id: string,
    key: K,
    value: OrderingDomainModel.GuestValues[K],
  ) => void
  remove: (id: string) => void
}> = ({ id, firstName, lastName, age, onChange, remove, isOrganizer, changeOrganizer }) => {
  return (
    <Box>
      <Grid container direction={'row'} alignItems={'center'} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <TextField value={firstName} onChange={e => onChange(id, 'firstName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <TextField value={lastName} onChange={e => onChange(id, 'lastName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField value={age} onChange={e => onChange(id, 'age', e.target.value ? parseInt(e.target.value) : 0)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            label="Organizer"
            control={<Checkbox checked={isOrganizer} onChange={() => changeOrganizer(id)} />}
          />
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={() => remove(id)} color="error" startIcon={<DeleteIcon />}>
            Remove
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}
