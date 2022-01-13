import React, { useState } from 'react'
import './FunctionalSearch.css'

const FunctionalSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [meals, setMeals] = useState([])
  const [flag, setFlag] = useState(0)

  //   state = {
  //     searchValue: '',
  //     meals: [],
  //     flag: 0,
  //   }

  const makeApiCall = (searchInput) => {
    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    fetch(searchUrl)
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        setMeals(jsonData.meals)
        //this.setState({ meals: jsonData.meals })
      })
  }

  const handleOnChange = (event) => {
    setSearchValue(event.target.value)
    //this.setState({ searchValue: event.target.value })
  }

  const handleSearch = () => {
    setFlag(1)
    //this.setState({ flag: 1 })
    makeApiCall(searchValue)
    //this.makeApiCall(this.state.searchValue)
  }

  return (
    <div id="main">
      <h1>Welcome to the meal search app</h1>
      <input
        name="text"
        type="text"
        placeholder="Search"
        onChange={(event) => handleOnChange(event)}
        value={searchValue}
      />

      <button onClick={handleSearch}>Search</button>
      {flag && meals ? (
        <>
          <table>
            <tr>
              <th>mrn</th>
              <th> firstName</th>
              <th> lastName</th>
              <th> phoneNumber</th>
              <th> dob</th>
              <th> sex</th>
              <th>address</th>
            </tr>
            {meals.map((meal, index) => {
              return (
                <tr key={index}>
                  <td>{meal.idMeal}</td>
                  <td>{meal.strMeal}</td>
                  <td>{meal.strMeal}</td>
                  <td>{meal.strDrinkAlternate}</td>
                  <td>{meal.strCategory}</td>
                  <td>{meal.strArea}</td>
                  <td>{meal.strInstructions.slice(0, 10)}</td>
                </tr>
              )
            })}
          </table>
          {/* <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" /> */}
        </>
      ) : (
        <p>Try searching for a meal</p>
      )}
    </div>
  )
}

export default FunctionalSearch
