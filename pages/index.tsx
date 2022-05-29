import React, { useEffect } from "react";
import Page from "../components/Page";
import { useStore } from '../stores/store';
import Link from "next/link";
import ActivityDashBoard from "../components/activities/ActivityDashBoard";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
    const {activityStore} = useStore();

  const {loadActivities, activityRegistry} = activityStore;
  
  useEffect(() => {
    if(activityRegistry.length <= 0) loadActivities();
  }, [activityRegistry.length, loadActivities])

  return (
    <Page title="To do lijst">
      <Link href={`/activities/create`}>
        <a>
          <div
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="mb-5 inline-block px-6 py-2.5 text-lg bg-green-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Voeg een activiteit toe
          </div>
        </a>
      </Link>
      <ActivityDashBoard />
    </Page>
  );
})
