import { taskManagerAPI } from "../api/TaskManagerAPI";
import { projectsAdded } from "../filters/filtersSlice";

export const projectsAPI = taskManagerAPI.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query({
      query: () => "/projects",
      async onQueryStarted(undefined, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          const projects = data.map((project) => project.projectName);

          dispatch(projectsAdded(projects));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetProjectsQuery } = projectsAPI;
