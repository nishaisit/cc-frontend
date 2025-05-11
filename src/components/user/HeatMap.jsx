import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import "./HeatMapProfile.css"; // Add this line

const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const intensity = Math.floor((i / maxCount) * 180);
    colors[i] = `rgb(${intensity}, 0, ${intensity})`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 90);

    const data = generateActivityData(pastDate, today);
    setActivityData(data);

    const maxCount = Math.max(...data.map((d) => d.count));
    setPanelColors(getPanelColors(maxCount));
    setStartDate(pastDate);
  }, []);

  return (
    <div className="heatmap-container">
      <h3 className="heatmap-title">Contribution Heatmap</h3>
      <div className="heatmap-wrapper">
        <HeatMap
          className="HeatMapProfile"
          style={{ width: "100%", maxWidth: "100%" }}
          value={activityData}
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          startDate={startDate}
          rectSize={15}
          space={3}
          rectProps={{
            rx: 2.5,
          }}
          panelColors={panelColors}
        />
      </div>
    </div>
  );
};

export default HeatMapProfile;
