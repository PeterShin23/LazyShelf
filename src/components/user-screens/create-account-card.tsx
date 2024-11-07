import * as React from "react";
import { UserScreenCard } from "./user-screen-card";

export const CreateAccountCard = () => {

  return (
    <UserScreenCard headerText={"3. Create an account"}>
      <p>Please make an account with me to link everything together!</p>
      <div className="flex flex-col pt-4 h-full justify-left">
        <label className="flex flex-col mb-4">
          <span className="font-medium text-sm ml-2 mb-2">Name</span>
          <input 
              type="text"
              name="name"
              value={""}
              onChange={() => {}}
              placeholder="Name"
              className="py-2 px-4 rounded-lg font-medium"
              style={{ 
                  // color: Colors.EnglishViolet,
                  // backgroundColor: Colors.EnglishVioletLight,
                  outline: "none"
              }}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="font-medium text-sm ml-2 mb-2">Email Address</span>
          <input 
              type="text"
              name="name"
              value={""}
              onChange={() => {}}
              placeholder="Email Address"
              className="py-2 px-4 rounded-lg font-medium"
              style={{ 
                  // color: Colors.EnglishViolet,
                  // backgroundColor: Colors.EnglishVioletLight,
                  outline: "none"
              }}
            />
        </label>
        <label className="flex flex-col mb-4">
            <span className="font-medium text-sm ml-2 mb-2">Password</span>
            <input 
                type="text"
                name="name"
                value={""}
                onChange={() => {}}
                placeholder="Password"
                className="py-2 px-4 rounded-lg font-medium"
                style={{ 
                    // color: Colors.EnglishViolet,
                    // backgroundColor: Colors.EnglishVioletLight,
                    outline: "none"
                }}
            />
        </label>
        <div className="flex flex-row justify-center mt-4">
          <button className="px-4 py-2 bg-white rounded-lg">
            Sign Up
          </button>
        </div>
      </div>
    </UserScreenCard>
  )
}