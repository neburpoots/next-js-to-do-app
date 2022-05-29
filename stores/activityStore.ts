import { makeAutoObservable, runInAction } from "mobx";
import { getActivities, getActivity, postActivity, putActivity, deleteActivity } from "../api/agent";
import { Activity } from '../lib/activity';


export default class ActivityStore {
    activityRegistry: Activity[] = [];
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get getAll() {
        console.log(this.activityRegistry);
        return this.activityRegistry;
    }

    get getDone() {
        return this.activityRegistry.filter(activity => activity.done === true);
    }

    get getToDo() {
        return this.activityRegistry.filter(activity => activity.done === false);
    }

    getActivity(id: number) {
        return this.activityRegistry.find(object => object.id === id);
    }

    loadActivity = async (id: number) => {
        let activity = this.getActivity(id);
        if (activity) {
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await getActivity(id.toString());
                this.activityRegistry.push(activity);
                this.loadingInitial = false;
                return activity;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }

    createActivity = async (activity: Activity): Promise<boolean> => {
        this.loading = true;
        let check = false;
        try {
            const createdActivity = await postActivity(activity);
                        
            runInAction(() => {
                if(createdActivity) {
                    this.activityRegistry.push(createdActivity);
                    this.orderOnDate();
                    console.log(this.activityRegistry);
                    check = true;
                    this.loading = false; 
                }  
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
        return check;
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await getActivities(); 
            runInAction(() => {
                this.activityRegistry = activities;
                this.orderOnDate();
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    orderOnDate() {
        //Sort the activities on date
        console.log(this.activityRegistry);
        this.activityRegistry.sort(
            (objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(),
        );
        console.log(this.activityRegistry);
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            const updatedActivity = await putActivity(activity);

            runInAction(() => {
                const objIndex = this.activityRegistry.findIndex((obj => obj.id == updatedActivity.id));
                this.activityRegistry[objIndex] = updatedActivity;
                this.orderOnDate();                
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (activity: Activity): Promise<boolean> => {
        let check = false;
        this.loading = true;
        try {
            const deletedActivity = await deleteActivity(activity);
            console.log(deletedActivity);
            runInAction(() => {
                if(deletedActivity) {
                    const objIndex = this.activityRegistry.findIndex((obj => obj.id == activity.id));
                    this.activityRegistry.splice(objIndex, 1);
                    check = true;
                }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

        return check;
    }
}