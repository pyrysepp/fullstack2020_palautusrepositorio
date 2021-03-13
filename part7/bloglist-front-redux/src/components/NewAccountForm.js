import Togglable from "./Togglable"

const NewAccountForm = () => {
  return (
    <Togglable buttonLabel="register">
      <div>
        <form>
          <div>
            Username: <input></input>
          </div>
          <div>
            Name: <input></input>
          </div>
          <div>
            Password: <input></input>
          </div>
        </form>
      </div>
    </Togglable>
  )
}
export default NewAccountForm
