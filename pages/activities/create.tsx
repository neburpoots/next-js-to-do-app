import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import Input from "../../components/Input";
import Page from "../../components/Page";
import TextArea from "../../components/TextArea";
import { useStore } from "../../stores/store";
import { Activity } from "../../lib/activity";
import { observer } from "mobx-react-lite";
import { toast } from 'react-nextjs-toast'

export default observer(function CreateActivityPage() {

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const { activityStore } = useStore();

  let createError = false;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    createError = false;

    const activity = new Activity();
    activity.title = title;
    activity.date = new Date(date);
    activity.description = description;
    activity.done = false;

    const valid = await activityStore.createActivity(activity);

    if (valid) {
      //Checks if store is empty to refresh all of the activities
      if(activityStore.activityRegistry.length <= 1) {
        await activityStore.loadActivities();
      }
      router.push("/");
      toast.remove();
      toast.notify("De activiteit \"" + activity.title + "\" is succesvol aangemaakt.", {
        type: "success"
      })
    } else {
      createError = true;
      toast.remove();
      toast.notify("Er is iets fout gegaan bij het maken van de activiteit.", {
        type: "error"
      })
    }
  };

  return (
    <Page title="Maak nieuwe activiteit aan">
      <form onSubmit={handleSubmit}>
        <Field label="Titel">
          <Input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Field>
        <Field label="Datum en tijd">
          <Input
            type="datetime-local"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Field>
        <Field label="Beschrijving">
          <TextArea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></TextArea>
        </Field>

        {createError && <p className="text-red-500">Er is iets misgegaan met het aanmaken van de activiteit</p>}
        {activityStore.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Creeer activiteit</Button>
        )}
      </form>
    </Page>
  );
});

