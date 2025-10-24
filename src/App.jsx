import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to LearnHub</h1>
      <div className="text-center">
        <p className="text-lg mb-4">Navigate using the menu to access different features based on your role.</p>
        <p className="text-md">Login to get started with the platform.</p>
      </div>
    </div>
  );
}

export default App;
