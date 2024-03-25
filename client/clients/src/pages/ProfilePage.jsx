import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNavegation from "../Components/Places/AccountNavegation";
import { UserContext } from "../UserContext";
import PlacePage from "./PlacePage";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return "Loading..";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
    console.log(subpage);
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
    console.log("2");
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  return (
    <div>
      <AccountNavegation />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <p>
            {" "}
            Logged in as {user.name} ({user.email})
          </p>
          <br></br>
          <button className="primary" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacePage />
        </div>
      )}
    </div>
  );
}
