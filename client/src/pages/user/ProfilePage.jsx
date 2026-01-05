import React from "react";
import UserMenu from "../../components/UserMenu";

const ProfilePage = () => {
  return (
    <div className="flex">
      <UserMenu />
      <div className="bg-green-300">ProfilePage</div>
    </div>
  );
};

export default ProfilePage;
