import * as React from "react";
import { UserScreenCard } from "./user-screen-card";

const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*']

export const CreateAccountCard = () => {

  const [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
    test: "",
  });

  const [passwordErrorText, setPasswordErrorText] = React.useState<string>("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      let hasSpecialCharacter = false;

      for (let char of value) {
        if (hasSpecialCharacter) {
          break;
        }
        if (specialCharacters.includes(char)) {
          hasSpecialCharacter = true;
        }
      }

      if (value.length < 10 || !hasSpecialCharacter) {
        setPasswordErrorText("Must be more than 10 characters, include a number, and include !,@,#,$,%,^,&, or *")
      } else {
        setPasswordErrorText("");
      }
    }

    setFormValues({ ...formValues, [name]: value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let checkErrorState = Object.entries(formValues).reduce((acc, curr) => {
      const field = curr[0];
      const value = curr[1];

      if (!value) acc.push(field);

      return acc;
    }, [])

    if (!checkErrorState.includes("test")) {
      alert("Something went wrong. Sorry!");

      return; // Checking for hidden field submission
    }

    checkErrorState = checkErrorState.filter(field => field !== "test");

    if (checkErrorState.length > 0) {

      return;
    }
  };

  const formUnfilled = React.useMemo(() => {
    return !formValues.name || !formValues.email || !formValues.password || !!passwordErrorText;
  }, [formValues, passwordErrorText]);

  return (
    <UserScreenCard headerText={"4. Create an account"}>
      <p>Please make an account with me to link everything together!</p>
      <div className="flex flex-col pt-4 h-full justify-left">
        <label className="flex flex-col mb-4">
          <span className="font-medium text-sm ml-2 mb-2">Name</span>
          <input 
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Name"
              className="py-2 px-4 rounded-lg font-medium"
              style={{ 
                  outline: "none"
              }}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="font-medium text-sm ml-2 mb-2">Email Address</span>
          <input 
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="py-2 px-4 rounded-lg font-medium"
              style={{ 
                  outline: "none"
              }}
            />
        </label>
        <label className="flex flex-col mb-4">
          <span className="font-medium text-sm ml-2 mb-2">Password</span>
          <input 
              type="text"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-2 px-4 rounded-lg font-medium"
              style={{
                  outline: "none"
              }}
          />
          <span className="text-red-500 text-xs ml-2">{passwordErrorText}</span>
        </label>
        {/* TEST FIELD */}
        <label className="hidden flex-col mb-8">
          <span className="text-white font-medium text-sm ml-2 mb-2">Your Secret Message to Me</span>
          <input 
              type="text"
              name="test"
              value={formValues.test}
              onChange={handleChange}
              placeholder="Tell me something."
              className="py-4 px-4 rounded-lg font-medium"
              style={{ 
                  outline: "none"
              }}
          />
        </label>
        <div className="flex flex-row justify-center mt-4">
          <button 
            className={`px-4 py-2 rounded-lg bg-white ${formUnfilled && "cursor-not-allowed"}`}
            disabled={formUnfilled}
          >
            Sign Up
          </button>
        </div>
      </div>
    </UserScreenCard>
  )
}