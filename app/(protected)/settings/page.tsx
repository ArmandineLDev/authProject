"use client";

import {logout} from "@/src/actions/logout";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";

const SettingsPage = () => {

  const user =useCurrentUser();
console.log(user)
  const onClick=()=> logout();

  return (
    <div className="bg-white p-10 rounded-xl">
        <button onClick={onClick} type="submit">Déconnexion</button>
    </div>
  );
};

export default SettingsPage;
