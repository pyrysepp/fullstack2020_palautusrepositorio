const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter
    default:
      return state
  }
}

export const changeFilter = (input) => {
  return {
    type: "SET_FILTER",
    data: {
      filter: input,
    },
  }
}
export default filterReducer
