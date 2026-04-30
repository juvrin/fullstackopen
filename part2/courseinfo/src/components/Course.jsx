const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  parts.map((part,id) => <Part key={id} part={part} />)
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  let exercises = parts.map(({ exercises }) => exercises)
  const sum = exercises.reduce((acc, num) => acc + num, 0)
  return (
    <p><b>Total number of exercises {sum}</b></p>
  )   
}

const Course = ({course}) => {
  return( 
    <div>
      <Header course ={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
  
}

export default Course