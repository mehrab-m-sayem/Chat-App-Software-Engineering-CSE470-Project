import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import UserProfile from "../profile/UserProfile";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-semibold">ChatApp</h1>
        <div>
          <Link
            to="/settings"
            className="btn btn-outline btn-sm bg-gray-700 hover:bg-gray-600"
          >
            Settings
          </Link>
          {/* Game Link */}
          <Link
            to="/game"
            className="btn btn-primary ml-4 btn-sm bg-blue-500 hover:bg-blue-400"
          >
            Play Game
          </Link>
        </div>
      </nav>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
        <UserProfile />
      </div>
    </div>
  );
};

export default Home;
