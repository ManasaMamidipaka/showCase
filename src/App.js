import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectShowCase from './components/ProjectShowCase'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here

const appStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class App extends Component {
  state = {data: [], app: appStatus.initial, sel: 'ALL'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({app: appStatus.loading})
    const {sel} = this.state

    const url = `https://apis.ccbp.in/ps/projects?category=${sel}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(i => ({
        id: i.id,
        name: i.name,
        imageUrl: i.image_url,
      }))
      this.setState({data: updatedData, app: appStatus.success})
    } else {
      this.setState({app: appStatus.fail})
    }
  }

  one = event => {
    this.setStatus({sel: event.target.value}, this.getData)
  }

  loadingView = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {data} = this.state
    return (
      <div className="success-con">
        <ul className="app-container">
          {data.map(i => (
            <ProjectShowCase details={i} key={i.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="image"
        alt="failure view"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {app} = this.state
    switch (app) {
      case appStatus.loading:
        return this.loadingView()
      case appStatus.success:
        return this.successView()
      case appStatus.fail:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {sel} = this.state
    return (
      <div>
        <nav className="nav-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            className="logo"
            alt="website logo"
          />
        </nav>
        <div className="main-con">
          <ul className="sel-con">
            <select className="sel" value={sel} onChange={this.one}>
              {categoriesList.map(i => (
                <option value={i.id} key={i.id}>
                  {i.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.finalRender()}
        </div>
      </div>
    )
  }
}

export default App
