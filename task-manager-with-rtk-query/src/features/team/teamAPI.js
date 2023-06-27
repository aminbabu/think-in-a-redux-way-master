import { taskManagerAPI } from "../api/TaskManagerAPI";

export const teamAPI = taskManagerAPI.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query({
      query: () => "/team",
    }),
  }),
  overrideExisting: false,
});

export const { useGetTeamQuery } = teamAPI;
