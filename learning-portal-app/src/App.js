import AdminRoute from "components/routes/AdminRoute";
import PublicRoute from "components/routes/PublicRoute";
import StudentRoute from "components/routes/StudentRoute";
import Loader from "components/ui/loaders/Loader";
import useAuthCheck from "hooks/useAuthCheck";
import Layout from "layouts/Layout";
import NotFound from "pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Assignments from "./pages/admin/Assignments";
import Dashboard from "./pages/admin/Dashboard";
import Dashboardquizzes from "./pages/admin/Quizzes";
import DashboardSignin from "./pages/admin/Signin";
import Videos from "./pages/admin/Videos";
import Course from "./pages/student/Course";
import Leaderboard from "./pages/student/Leaderboard";
import Quizzes from "./pages/student/Quizzes";
import Signin from "./pages/student/Signin";
import Signup from "./pages/student/Signup";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <Loader />
  ) : (
    <Router>
      <Layout>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Signin />} />
            <Route path="login" element={<Signin />} />
            <Route path="register" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="admin" element={<DashboardSignin />} />
          </Route>

          {/* student routes */}
          <Route path="/" element={<StudentRoute />}>
            <Route path="course" element={<Course />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="quizzes/:videoId" element={<Quizzes />} />
          </Route>

          {/* admin routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />

            {/* assignments routes */}
            <Route path="assignments" element={<Assignments />}>
              <Route path="add" element={<Assignments />} />
              <Route path="edit/:assignmentId" element={<Assignments />} />
            </Route>

            {/* assignment mark routes */}
            <Route path="assignment-mark" element={<AssignmentMark />}>
              <Route path="add" element={<AssignmentMark />} />
              <Route
                path="edit/:assignmentMarkId"
                element={<AssignmentMark />}
              />
            </Route>

            {/* quizzes routes */}
            <Route path="quizzes" element={<Dashboardquizzes />}>
              <Route path="add" element={<Dashboardquizzes />} />
              <Route path="edit/:quizId" element={<Dashboardquizzes />} />
            </Route>

            {/* videos routes */}
            <Route path="videos" element={<Videos />}>
              <Route path="add" element={<Videos />} />
              <Route path="edit/:videoId" element={<Videos />} />
            </Route>
          </Route>

          {/* not found routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
