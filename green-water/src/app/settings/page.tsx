import React from "react";
import NavBar from "../NavBar/page";

function SettingsPage() {
  return (
    <div style = {{display: "flex"}}>

      <div>
        <NavBar />
      </div>

      <div>
        <h1>Configuration Page</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <br />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <br />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
