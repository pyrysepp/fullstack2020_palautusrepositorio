import React from "react"
import { connect } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
    marginTop: 20,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter,
}
const connectedComponent = connect(null, mapDispatchToProps)(Filter)
export default connectedComponent
