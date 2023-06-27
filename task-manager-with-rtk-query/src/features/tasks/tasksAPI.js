import { taskManagerAPI } from "../api/TaskManagerAPI";

export const tasksAPI = taskManagerAPI.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => "/tasks",
      keepUnusedDataFor: 600,
    }),
    getTask: build.query({
      query: (id) => `/tasks/${id}`,
    }),
    addTask: build.mutation({
      query: (patch) => ({
        url: "/tasks",
        method: "POST",
        body: patch,
      }),
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const patchResult = dispatch(
            taskManagerAPI.util.updateQueryData(
              "getTasks",
              undefined,
              (draftTasks) => {
                draftTasks.push(data);
              }
            )
          );
        } catch (error) {}
      },
    }),
    editTask: build.mutation({
      query: ({ id, patch }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const patchResult = dispatch(
            taskManagerAPI.util.updateQueryData(
              "getTasks",
              undefined,
              (draftTasks) => {
                const indexToRemove = draftTasks.findIndex(
                  (task) => task?.id == id
                );

                draftTasks.splice(indexToRemove, 1, data);
              }
            )
          );
        } catch (error) {}
      },
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskManagerAPI.util.updateQueryData(
            "getTasks",
            undefined,
            (draftTasks) => {
              const indexToRemove = draftTasks.findIndex(
                (task) => task.id == id
              );
              draftTasks.splice(indexToRemove, 1);
            }
          )
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateStatus: build.mutation({
      query: ({ id, patch }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      onQueryStarted: ({ id, patch }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          taskManagerAPI.util.updateQueryData(
            "getTasks",
            undefined,
            (draftTasks) => {
              const task = draftTasks.find((task) => task?.id == id);

              task.status = patch?.status;
            }
          )
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useAddTaskMutation,
  useUpdateStatusMutation,
} = tasksAPI;
