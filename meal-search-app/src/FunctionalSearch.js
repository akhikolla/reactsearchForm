import React, { useState } from 'react'
import './FunctionalSearch.css'
import { nanoid } from 'nanoid'
const FunctionalSearch = () => {
  const [mrnValue, setMrnValue] = useState('')
  const [firstNameValue, setFirstNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [dobValue, setdobValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [meals, setMeals] = useState([])

  const [members, setMembers] = useState([])
  const [resmembers, setResMembers] = useState([])
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

  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...members }
    newFormData[fieldName] = fieldValue
    console.log('newForm field NAme', newFormData[fieldName])

    console.log('newForm alone', newFormData)
    setMembers(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    setFlag(1)
    event.preventDefault()
    console.log('In handleForm Submit', members)
    console.log('In handleForm Submit ID', members.mrn)
    console.log('In handleForm Submit firstname', members.firstName)

    const newSearch = {
      id: nanoid(),
      mrn: members.mrn,
      firstName: members.firstName,
      lastName: members.lastName,
      dob: members.dob,
    }

    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${
      newSearch.firstName
    }`
    fetch(searchUrl)
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        setResMembers(jsonData.meals)
        //this.setState({ meals: jsonData.meals })
      })
  }

  return (
    <div id="main">
      {/* <h1>Welcome to the meal search app</h1>
      <input
        name="text"
        type="text"
        placeholder="Search"
        onChange={(event) => handleOnChange(event)}
        value={searchValue}
      /> */}

      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="mrn"
          required="required"
          placeholder="mrn"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="firstName"
          required="required"
          placeholder="FirstName"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="lastName"
          required="required"
          placeholder="LastName"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="dob"
          required="required"
          placeholder="dob"
          onChange={handleAddFormChange}
        />
        <button type="submit">Search Members</button>
      </form>

      {/* <button onClick={handleSearch}>Search</button> */}
      {flag && resmembers ? (
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
            {/* {meals.map((meal, index) => {
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
            })} */}

            {resmembers.map((member, index) => {
              return (
                <tr key={index}>
                  <td>akhila</td>
                  <td>kolla</td>
                  <td>{member.idMeal}</td>
                  <td>{member.strMeal}</td>
                  <td>{member.strDrinkAlternate}</td>
                  <td>{member.strCategory}</td>
                  <td>That's all</td>
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
