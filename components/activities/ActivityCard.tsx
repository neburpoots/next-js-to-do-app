import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Activity } from "../../lib/activity";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { toast } from 'react-nextjs-toast'

interface ActivityCardProps {
  activity: Activity;
}

export default observer(function ActivityCard({ activity }: ActivityCardProps) {
  const { activityStore } = useStore();

  async function toggleDone() {
    await activityStore.updateActivity(activity);
    if(activity.done) {
      toast.remove();
      toast.notify("Activiteit: \"" + activity.title + "\" voltooid!", {
        type: "success"
      })
    } else {
      toast.remove();
      toast.notify("Activiteit: \"" + activity.title + "\" terug op Te doen gezet.", {
        type: "success"
      })
    }

  }

  return (
    <div className="border rounded-lg w-100 shadow hover:shadow-xl">
      <div className="md:flex">
        <div className="md:w-24 imagecontainer">
          <Image
            className="rounded-lg"
            src={activity.image}
            alt="Activity image"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="p-2 justify-between items-baseline items-end flex flex-col">
          <h2 className="text-lg font-bold">
            {activity.title}, {format(new Date(activity.date), "MM/dd/yyyy")}{" "}
            {new Date(activity.date).toLocaleTimeString()}
          </h2>
          <div className="pt-5">
            <span>{activity.description}</span>
          </div>
          <Link href={`/activities/${activity.id}`}>
            <a>
              <div className="mt-auto	mb-5 inline-block px-6 py-2.5 text-lg bg-green-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Bekijk de taak
              </div>
            </a>
          </Link>
        </div>
        <div
          onClick={() => toggleDone()}
          className="cursor-pointer md:w-24 sm:w-12 iconcontainer md:ml-auto p-2"
        >
          {activity.done ? (
            <Image
              className="rounded-lg p-5"
              src="/images/tick.png"
              alt="Activity image"
              width={10}
              height={10}
              layout="responsive"
              objectFit="cover"
            />
          ) : (
            <Image
              className="rounded-lg p-5"
              src="/images/cancel.png"
              alt="Activity image"
              width={10}
              height={10}
              layout="responsive"
              objectFit="cover"
            />
          )}
        </div>
      </div>
    </div>
  );
});
