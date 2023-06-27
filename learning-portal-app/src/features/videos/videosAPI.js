import { apiSlice } from "features/api/apiSlice";
import { selectedVideo } from "./videosSlice";

// videso api
export const videsoAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVideos: build.query({
      query: (queryStr = "") => `/videos${queryStr}`,
      providesTags: ["Videos"],
      transformResponse: async (response, meta, arg) => {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return { data: response, totalCount };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const { data: videos = [] } = data || {};

          dispatch(selectedVideo(videos[0]));
        } catch (error) {}
      },
    }),
    getVideo: build.query({
      query: (id) => `/videos/${id}`,
    }),
    deleteVideo: build.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: build.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    addVideo: build.mutation({
      query: (data) => ({
        url: `/videos/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useLazyGetVideoQuery,
  useDeleteVideoMutation,
  useEditVideoMutation,
  useAddVideoMutation,
} = videsoAPI;
