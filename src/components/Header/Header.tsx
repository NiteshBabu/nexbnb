"use client";
import React from "react";
import ProfileMenu from "./ProfileMenu";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between">
      <div className="logo">
        <img src="images/logo.png" alt="logo" className="w-10" />
      </div>
      <div className="flex ">
        <p className="cursor-not-allowed">NexBnB your home</p>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
