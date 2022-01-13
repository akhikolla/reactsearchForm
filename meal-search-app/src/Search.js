import React, { Component } from 'react'
import './Search.css'

class Search extends Component {
  state = {
    searchValue: '',
    meals: [],
    flag: 0,
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  handleSearch = () => {
    this.setState({ flag: 1 })
    this.makeApiCall(this.state.searchValue)
  }

  makeApiCall = (searchInput) => {
    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    fetch(searchUrl)
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        this.setState({ meals: jsonData.meals })
      })
  }

  render() {
    return (
      <div id="main">
        <h1>Welcome to the meal search app</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />

        <button onClick={this.handleSearch}>Search</button>
        {this.state.flag && this.state.meals ? (
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
              {this.state.meals.map((meal, index) => {
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
}

export default Search
