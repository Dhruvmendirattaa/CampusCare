import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome back! Here’s a quick overview of your progress:</p>
      <div style={{ marginTop: "1rem" }}>
        <p>✅ Sessions Completed: 3</p>
        <p>📅 Upcoming Sessions: 2</p>
        <p>⭐ Overall Progress: 70%</p>
      </div>
    </div>
  );
};

export default Dashboard;
