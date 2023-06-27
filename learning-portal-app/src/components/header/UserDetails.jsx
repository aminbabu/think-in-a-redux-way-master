import { userLogedOut } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const UserDetails = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();

  const { name, role } = user || {};

  // handle logout
  const handleSignout = () => {
    dispatch(userLogedOut());
    localStorage.removeItem("auth");
  };

  // side effects
  useEffect(() => {
    // handle dropdown menu
    const hanldeDropdown = (e) => {
      const target = e.target;

      if (!target.closest(".dropdown")) {
        return setDropdown(false);
      }

      setDropdown(!dropdown);
    };

    window.addEventListener("click", hanldeDropdown);
  }, [dropdown]);

  return (
    <div className="flex items-center gap-3 md:gap-4 relative dropdown">
      <Button className="font-semibold text-sm md:text-base fill-white">
        {name}
        <svg
          className={`icon ml-3 ${dropdown && "rotate-180"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </Button>
      {dropdown && (
        <div className="absolute top-full right-0 bg-slate-800 rounded-md min-w-[12rem] shadow-xl">
          {role === "admin" ? (
            <ul>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/admin/dashboard"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/admin/videos"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                  </svg>
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/admin/assignments"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                  </svg>
                  Assignments
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/admin/assignment-mark"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z" />
                  </svg>
                  Assignment Marks
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/admin/quizzes"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM368 321.6V328c0 8.8 7.2 16 16 16s16-7.2 16-16v-6.4c0-5.3 4.3-9.6 9.6-9.6h40.5c7.7 0 13.9 6.2 13.9 13.9c0 5.2-2.9 9.9-7.4 12.3l-32 16.8c-5.3 2.8-8.6 8.2-8.6 14.2V384c0 8.8 7.2 16 16 16s16-7.2 16-16v-5.1l23.5-12.3c15.1-7.9 24.5-23.6 24.5-40.6c0-25.4-20.6-45.9-45.9-45.9H409.6c-23 0-41.6 18.6-41.6 41.6z" />
                  </svg>
                  Quizzes
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/course"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M96 32C60.7 32 32 60.7 32 96V384H96V96l384 0V384h64V96c0-35.3-28.7-64-64-64H96zM224 384v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H416V384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32z" />
                  </svg>
                  Course Access
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                  to="/leaderboard"
                >
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>
                  Leaderboard
                </Link>
              </li>
            </ul>
          )}
          <ul>
            <li>
              <Link
                className="text-sm font-medium text-slate-50 py-2.5 px-4 flex items-center gap-3 transition-colors duration-200 hover:bg-slate-900/60 fill-white"
                onClick={handleSignout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="icon md:w-5 md:h-5"
                >
                  <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
                  <path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
                </svg>
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
