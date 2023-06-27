import React from "react";
import { useGetTeamQuery } from "../../features/team/teamAPI";
import TeamLoader from "../UI/Loaders/TeamLoader";
import Message from "../UI/Message";
import TeamMember from "./TeamMember";

const TeamMembers = () => {
  const { data, isLoading, isError, error } = useGetTeamQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <TeamLoader />
        <TeamLoader />
        <TeamLoader />
        <TeamLoader />
        <TeamLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Message className="error">{error.error}</Message>;
  }

  if (!isLoading && !isError && data?.length === 0) {
    content = (
      <Message className="error">There is no team member found!</Message>
    );
  }

  if (!isLoading && !isError && data?.length) {
    content = data.map((member) => (
      <TeamMember key={member.id} member={member} />
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;
