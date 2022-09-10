import React, { useState, useEffect } from 'react'
import Styles from './hero.module.css'
import ArrowUp from './images/VectorUp.svg'
import ArrowDown from './images/VectorDown.svg'
import Image from './images/01-01-1000.jpg'
import { database } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const Hero = () => {
  const [bicycles, setBicycles] = useState([])
  const [filterParameters, setFilterParameters] = useState({
    models: [],
    colors: [],
    locations: [],
  })
  const bicycleRef = collection(database, 'bicycles')
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isBicycleOpen, setIsBicycleOpen] = useState(false)
  const [currentBicycle, setCurrentBicycle] = useState({
    model: '',
    color: '',
    location: '',
  })

  const toggleBrand = () => {
    setIsBrandOpen(!isBrandOpen)
  }

  const toggleColor = () => {
    setIsColorOpen(!isColorOpen)
  }

  const toggleLocation = () => {
    setIsLocationOpen(!isLocationOpen)
  }

  const openBicycleDetails = (bicycle) => {
    setCurrentBicycle(bicycle)
    setIsBicycleOpen(true)
  }

  console.log(filterParameters)
  console.log(bicycles)

  const changeFilterParameter = (index, value) => {
    setFilterParameters((prevState) => ({
      ...prevState,
      [index]: prevState[index].includes(value)
        ? [...prevState[index].filter((el) => el !== value)]
        : [...prevState[index], value],
    }))
  }

  const getBicycleData = async () => {
    const data = await getDocs(bicycleRef)
    const tempData = data.docs.map((item) => {
      return { ...item.data(), id: item.id }
    })
    setBicycles(tempData)
  }

  const renderBicycles = (bicycles) => {
    const output = []
    for (let i = 0; i < bicycles.length; i++) {
      const bicycleElement = (
        <li key={i} onClick={() => openBicycleDetails(bicycles[i])}>
          <div>
            <img src={Image} className={Styles['bicycle-img']} />
          </div>
          <div className={Styles['li-div']}>
            <h2 className={Styles['bicycle-name']}>{bicycles[i].model}</h2>
          </div>
        </li>
      )
      let pushElement = true
      if (
        filterParameters.models.length !== 0 &&
        !filterParameters.models.includes(bicycles[i].model)
      ) {
        pushElement = false
      }

      if (
        filterParameters.colors.length !== 0 &&
        !filterParameters.colors.includes(bicycles[i].color)
      ) {
        pushElement = false
      }

      if (
        filterParameters.locations.length !== 0 &&
        !filterParameters.locations.includes(bicycles[i].location)
      ) {
        pushElement = false
      }

      if (pushElement) {
        output.push(bicycleElement)
      }
    }
    if (output.length == 0) {
      return <p>Bicycles Not Found</p>
    }
    return output
  }

  useEffect(() => {
    getBicycleData()
  }, [])

  return (
    <div className={Styles['home-div']}>
      <div>
        <section>
          <List name='Model' click={toggleBrand} />
          <div
            style={{
              display: isBrandOpen ? 'block' : 'none',
            }}
          >
            <Checkbox
              name='Scott'
              change={() => changeFilterParameter('models', 'Scott')}
            />
            <Checkbox
              name='Giant Bicycle'
              change={() => changeFilterParameter('models', 'Giant Bicycle')}
            />
          </div>
        </section>
        <section>
          <List name='Color' click={toggleColor} />
          <div style={{ display: isColorOpen ? 'block' : 'none' }}>
            <Checkbox
              name='Red'
              change={() => changeFilterParameter('colors', 'Red')}
            />
            <Checkbox
              name='Green'
              change={() => changeFilterParameter('colors', 'Green')}
            />
            <Checkbox
              name='Purple'
              change={() => changeFilterParameter('colors', 'Purple')}
            />
            <Checkbox
              name='Orange'
              change={() => changeFilterParameter('colors', 'Orange')}
            />
          </div>
        </section>
        <section>
          <List name='Location' click={toggleLocation} />
          <div style={{ display: isLocationOpen ? 'block' : 'none' }}>
            <Checkbox
              name='Tbilisi'
              change={() => changeFilterParameter('locations', 'Tbilisi')}
            />
            <Checkbox
              name='Batumi'
              change={() => changeFilterParameter('locations', 'Batumi')}
            />
          </div>
        </section>
      </div>
      <div>
        <div className={Styles['bicycle-div']}>{renderBicycles(bicycles)}</div>
      </div>
      <div
        style={{ display: isBicycleOpen ? 'block' : 'none' }}
        className={Styles['details-page']}
      >
        <div className={Styles['details-container']}>
          <h2 className={Styles['bike-description']}>
            Model: {currentBicycle.model}
          </h2>
          <img src={Image} className={Styles['bicycle-details-img']} />
          <div className={Styles['desctiprion-div']}>
            <h2 className={Styles['bike-description']}>
              Color: {currentBicycle.color}
            </h2>
            <h2 className={Styles['bike-description']}>
              Location: {currentBicycle.location}
            </h2>
          </div>
          <button
            className={Styles['back-btn']}
            onClick={() => setIsBicycleOpen(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

const List = (props) => {
  const [arrow, setArrow] = useState(ArrowDown)

  const listChange = () => {
    if (arrow === ArrowDown) {
      setArrow(ArrowUp)
    } else {
      setArrow(ArrowDown)
    }
  }

  return (
    <div className={Styles['list-div']}>
      <h2
        className={Styles['list-name']}
        onClick={() => (listChange(), props.click())}
      >
        {props.name}
      </h2>
      <img src={arrow} className={Styles.arrow} />
    </div>
  )
}

const Checkbox = (props) => {
  return (
    <div className={Styles.form}>
      <input type='checkbox' onChange={props.change} className={Styles.input} />
      <label className={Styles['label-name']}>{props.name}</label>
    </div>
  )
}

export default Hero
