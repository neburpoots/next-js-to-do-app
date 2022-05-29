import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Page from "../../components/Page";
import { ApiError } from "../../lib/api";
import { Activity } from "../../lib/activity";
import { getActivity, getActivities } from "../../api/agent";
import { useStore } from "../../stores/store";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { toast } from 'react-nextjs-toast'

interface ActivityPageParams extends ParsedUrlQuery {
  id: string;
}

interface ActivityPageProps {
  activity: Activity;
}

export const getStaticPaths: GetStaticPaths<ActivityPageParams> = async () => {
  const activities = await getActivities();

  return {
    paths: activities.map((activity) => ({
      params: { id: activity.id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ActivityPageProps,
  ActivityPageParams
> = async ({ params: { id } }) => {
  try {
    const activity = await getActivity(id);
    return {
      props: { activity },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
};

const ActivityPage: React.FC<ActivityPageProps> = ({ activity }) => {
  const router = useRouter();
  const {activityStore} = useStore();
  

  async function removeActivity() {
    const valid = await activityStore.deleteActivity(activity);

    if (valid) {
      //Checks if store is empty to refresh all of the activities
      if(activityStore.activityRegistry.length <= 1) {
        activityStore.loadActivities;
      }
      router.push("/");
      toast.remove();
      toast.notify("De activiteit \"" + activity.title + "\" is succesvol verwijdert.", {
        type: "success"
      })
    } else {
      toast.remove();
      toast.notify("Er gaat iets fout bij het verwijderen", {
        type: "error"
      })    }
  }

  console.log("[Activity detail] render:", activity);

  return (
    <Page title={activity.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image
            src={activity.image}
            alt=""
            width={640}
            height={480}
            priority={true}
          />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{activity.description}</p>
          <p className="text-lg font-bold mt-2">
            {format(new Date(activity.date), "MM/dd/yyyy")}{" "}
            {new Date(activity.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div onClick={() => removeActivity()} className="cursor-pointer text-white w-40 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Verwijder activiteit
      </div>

    </Page>
  );
};

export default ActivityPage;
