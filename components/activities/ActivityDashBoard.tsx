import React from "react";
import ActivityCard from "./ActivityCard";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityDashBoard() {
  const { activityStore } = useStore();
  const { getDone, getToDo } = activityStore;

  if (activityStore.loadingInitial) return <h1>Loading...</h1>;

  return (
    <>
      <ul className="text-white	grid grid-cols-1 gap-4">
        <h2 className="text-2xl pb-4">Te doen:</h2>
        {getToDo.map((activity) => (
          <li key={activity.id}>
            <ActivityCard activity={activity} />
          </li>
        ))}
      </ul>
      <ul className="text-white	grid grid-cols-1 gap-4 mt-20">
        <h2 className="pt-5 text-2xl pb-5">Gedaan:</h2>
        {getDone.map((activity) => (
          <li key={activity.id}>
            <ActivityCard activity={activity} />
          </li>
        ))}
      </ul>
    </>
  );
});
