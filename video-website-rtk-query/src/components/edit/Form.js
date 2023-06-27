import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form({ video }) {
  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();
  const [newVideo, setNewVideo] = useState(video);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setNewVideo((prevVideo) => ({ ...prevVideo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editVideo({ id: video.id, data: newVideo });
  };

  const { title, description, author, link, thumbnail, date, duration, views } =
    newVideo;

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                name="link"
                value={link}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                name="thumbnail"
                value={thumbnail}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                name="date"
                value={date}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                name="duration"
                value={duration}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                name="views"
                value={views}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success>Video was added successfully</Success>}
        {isError && <Error>There was an error occured!</Error>}
      </div>
    </form>
  );
}
