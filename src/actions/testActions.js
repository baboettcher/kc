
// ----- COMPONENT ------ //
// elsewhere in a component where we want to create a project
import {createProject} from './blabla';
import {connect} from 'react-redux';
//...
//...
//... in some component, call:
this.props.createProject(this.state.THINGTOPASSIN)

//...
const mapStateToProps = (dispatch)=>{
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}


export default connect(null, mapDispatchToProps)(project)


// ------- ACTION CREATORS -------- //
// createProject.js --> example with thunk, returning a function

export const createProject = (project)=>{
  return (dispatch, getState)=>{
    // async call to database
    dispatch({
      type: "ADD_PROJECT",
      project: project
    })
    
  }
}


// normal action creator
export const createProject = (project)=>{
  return {
    type: "ADD_PROJECT",
    project: project
  }
}