import { Activity } from "../lib/activity";
import { fetchJson } from "./api";
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios';

const URL = "http://localhost:1337";
const API_URL = URL + "/api";
const ACTIVITY_QUERY_KEY = "activity";
axios.defaults.baseURL = API_URL;

//GETTERS
export async function getActivity(id: string): Promise<Activity> {
  const activity = await fetchJson(`${API_URL}/activities/${id}?populate=*`);
  return stripActivity(activity.data);
}

export async function getActivities(): Promise<Activity[]> {
  const activities = await fetchJson(`${API_URL}/activities?populate=*`);
  return activities.data.map(stripActivity);
}

export async function putActivity(activity: Activity): Promise<Activity> {
  let updatedActivity;
  activity.done = !activity.done;
  await axios.put(`/activities/${activity.id}?populate=*`, {
    data: {
        title: activity.title,
        date: activity.date, 
        description: activity.description,
        done: activity.done
    }
  }).then(function (response) {
    updatedActivity = stripActivity(response.data.data);
  }).catch(function (error) {
    console.log(error);
    return false;
  });
  return updatedActivity; 
}

export async function postActivity(activity: Activity): Promise<Activity> {
  let createdActivity;

  await axios.post(`/activities?populate=*`, {
    data: {
        title: activity.title,
        date: activity.date, 
        description: activity.description,
        done: activity.done
    }
  }).then(function (response) {
    createdActivity = stripActivity(response.data.data);
  }).catch(function (error) {
    console.log(error);
    return false;
  });
  return createdActivity; 
}

export async function deleteActivity(activity: Activity): Promise<Boolean> {
  let deletedActivity = false;

  await axios.delete(`/activities/${activity.id}`
  ).then(function (response) {
    console.log(response);
    deletedActivity = true;
    return true; 
  }).catch(function (error) {
    console.log(error);
  });
  return deletedActivity; 
}

function stripActivity(activity: any): Activity {
  let image;
  if (activity.attributes.image.data) {
    image = URL + activity.attributes.image.data.attributes.formats.large.url;
  } else {
    image = "http://localhost:3000/images/activity.webp";
  }

  return {
    id: activity.id,
    title: activity.attributes.title,
    description: activity.attributes.description,
    date: activity.attributes.date,
    image: image,
    done: activity.attributes.done,
  };
}
