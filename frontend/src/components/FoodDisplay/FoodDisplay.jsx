import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = () => {

    const {food_list} = useContext(StoreContext)

  return (
    <div>

    </div>
  )
}

export default FoodDisplay