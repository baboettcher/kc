import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar_temp";
import Navbar_new from "./layout/Navbar";
import Players from "./Players";
import Teams from "./Teams";
import TeamPage from "./TeamPage";
import Articles from "./Articles";
import TopLevelAdmin from "./TopLevelAdmin";

import SignIn from "./auth/SignIn";
import SignUpSuper from "./auth/SignUpSuper";
import SignUpTeacher from "./auth/SignUpTeacher";
import SignUpStudent from "./auth/SignUpStudent";
import SignUpAdmin from "./auth/SignUpAdmin";

import SuperDashboard from "./app_super/SuperDashboard";
import SuperAddDistrict from "./app_super/DistrictAdd";
import DistrictMasterList from "./app_super/DistrictMasterList";
import SchoolMasterList from "./app_super/SchoolMasterList";
import StudentMasterList from "./app_super/StudentMasterList";
import TeacherMasterList from "./app_super/TeacherMasterList";

import AdminDashboard from "./app_admin/AdminDashboard";

import StudentDashboard from "./app_student/StudentDashboard";
import TradeZone from "./app_student/TradeZone";
import MyRoom from "./app_student/MyRoom";

import TeacherDashboard from "./app_teacher/TeacherDashboard";
import Colleagues from "./app_teacher/Colleagues";
import Scoreboard from "./app_teacher/Scoreboard";
import CallOnMe from "./app_teacher/CallOnMe";
import ClassCreate from "./app_teacher/ClassCreate";
import GroupsCreate from "./app_teacher/GroupsCreate";
import GroupsEdit from "./app_teacher/GroupsEdit";
import GroupsAll from "./app_teacher/GroupsAll";
import StudentsAdd from "./app_teacher/StudentsAdd";
import StudentsAll from "./app_teacher/StudentsAll";

import ToDo from "./ToDo";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Navbar_new />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/todolist" component={ToDo} />
            <Route path="/adminProtectedRoute" component={TopLevelAdmin} />

            <Route path="/signin" component={SignIn} />
            <Route path="/signupsuper" component={SignUpSuper} />
            <Route path="/signupteacher" component={SignUpTeacher} />
            <Route path="/signupstudent" component={SignUpStudent} />
            <Route path="/signupadmin" component={SignUpAdmin} />

            <Route path="/super" component={SuperDashboard} />
            <Route path="/super_add_district" component={SuperAddDistrict} />
            <Route path="/districtmasterlist" component={DistrictMasterList} />
            <Route path="/schoolmasterlist" component={SchoolMasterList} />
            <Route path="/teachermasterlist" component={TeacherMasterList} />
            <Route path="/studentmasterlist" component={StudentMasterList} />

            <Route path="/admin" component={AdminDashboard} />

            <Route path="/teacher" component={TeacherDashboard} />
            <Route path="/scoreboard" component={Scoreboard} />
            <Route path="/colleagues" component={Colleagues} />
            <Route path="/callonme" component={CallOnMe} />
            <Route path="/classcreate" component={ClassCreate} />
            <Route path="/groupscreate" component={GroupsCreate} />
            <Route path="/groupsedit" component={GroupsEdit} />
            <Route path="/groupsall" component={GroupsAll} />
            <Route path="/studentsall" component={StudentsAll} />
            <Route path="/studentsadd" component={StudentsAdd} />

            <Route path="/student" component={StudentDashboard} />
            <Route path="/myroom" component={MyRoom} />
            <Route path="/tradezone" component={TradeZone} />

            <Route path="/:teamId" exact component={TeamPage} />
            <Route path="/:teamId/articles" component={Articles} />
            <Route
              render={() => <h1 className="text-center">Four oh Four.</h1>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
