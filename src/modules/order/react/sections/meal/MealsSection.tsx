import React from 'react'

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { useMeal } from '@ratatouille/modules/order/react/sections/meal/use-meal.hook'

export const MealsSection: React.FC<{}> = () => {
  const presenter = useMeal()
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h4">Pick your menu</Typography>
      <Stack sx={{ marginTop: 4 }} gap={4}>
        {presenter.guests.map(guest => (
          <GuestMealComposer
            key={guest.id}
            guestId={guest.id}
            firstName={guest.firstName}
            lastName={guest.lastName}
            selectedEntryId={guest.meal.entry}
            selectedMainCourseId={guest.meal.mainCourse}
            selectedDessertId={guest.meal.dessert}
            selectedDrinkId={guest.meal.drink}
            entries={presenter.getSelectableEntries(guest.id)}
            mainCourses={presenter.getSelectableMainCourses(guest.id)}
            desserts={presenter.getSelectableDesserts(guest.id)}
            drinks={presenter.getSelectableDrinks(guest.id)}
            onEntrySelected={presenter.assignEntry}
            onMainCourseSelected={presenter.assignMainCourse}
            onDessertSelected={presenter.assignDessert}
            onDrinkSelected={presenter.assignDrink}
          />
        ))}
      </Stack>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant="contained" onClick={presenter.onPrevious}>
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={presenter.onNext} disabled={presenter.isSubmittable() === false}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const GuestMealComposer: React.FC<{
  guestId: string
  firstName: string
  lastName: string

  selectedEntryId: OrderingDomainModel.MealId | null
  selectedMainCourseId: OrderingDomainModel.MealId | null
  selectedDessertId: OrderingDomainModel.MealId | null
  selectedDrinkId: OrderingDomainModel.MealId | null

  entries: OrderingDomainModel.MealCourse[]
  mainCourses: OrderingDomainModel.MealCourse[]
  desserts: OrderingDomainModel.MealCourse[]
  drinks: OrderingDomainModel.MealCourse[]

  onEntrySelected: (guestId: string, id: string) => void
  onMainCourseSelected: (guestId: string, id: string) => void
  onDessertSelected: (guestId: string, id: string) => void
  onDrinkSelected: (guestId: string, id: string) => void
}> = ({
  guestId,
  firstName,
  lastName,

  selectedEntryId,
  selectedMainCourseId,
  selectedDessertId,
  selectedDrinkId,

  entries,
  mainCourses,
  desserts,
  drinks,

  onEntrySelected,
  onMainCourseSelected,
  onDessertSelected,
  onDrinkSelected,
}) => {
  return (
    <Stack rowGap={2}>
      <Typography variant="h6">
        {firstName} {lastName}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Entry</InputLabel>
        <Select
          label="Entry"
          value={selectedEntryId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onEntrySelected(guestId, event.target.value as string)
          }}>
          {entries.map(meal => (
            <MenuItem key={meal.id} value={meal.id}>
              {meal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{' '}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Main Course</InputLabel>
        <Select
          required
          label="Main Course*"
          value={selectedMainCourseId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onMainCourseSelected(guestId, event.target.value as string)
          }}>
          {mainCourses.map(meal => (
            <MenuItem key={meal.id} value={meal.id}>
              {meal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Dessert</InputLabel>
        <Select
          label="Dessert"
          value={selectedDessertId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onDessertSelected(guestId, event.target.value as string)
          }}>
          {desserts.map(meal => (
            <MenuItem key={meal.id} value={meal.id}>
              {meal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Drink</InputLabel>
        <Select
          label="Drink"
          value={selectedDrinkId ?? undefined}
          onChange={(event: SelectChangeEvent) => {
            onDrinkSelected(guestId, event.target.value as string)
          }}>
          {drinks.map(meal => (
            <MenuItem key={meal.id} value={meal.id}>
              {meal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
