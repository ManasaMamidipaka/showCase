import './index.css'

const ProjectShowCase = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="list-app">
      <img src={imageUrl} className="picture" alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}

export default ProjectShowCase
