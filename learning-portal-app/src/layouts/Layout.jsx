import { selectAuth } from "features/auth/authSelectos";
import { useSelector } from "react-redux";
import Brand from "../components/header/Brand";
import UserDetails from "../components/header/UserDetails";

const Layout = ({ children }) => {
  const { accessToken, user } = useSelector(selectAuth);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50">
      <header className="shadow-md shadow-slate-800 fixed top-0 left-0 w-full bg-slate-900">
        <nav className="py-2 md:py-3">
          <div className={`container flex items-center justify-between gap-4`}>
            <Brand />

            {accessToken && user && <UserDetails user={user} />}
          </div>
        </nav>
      </header>
      <main className="flex-1 pt-12 md:pt-16">{children}</main>
    </div>
  );
};

export default Layout;
