import React from "react";

const TeamMember = ({ member = {} }) => {
  const { id, avatar, name } = member;

  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" alt={name} />
      <p className="label">{name}</p>
    </div>
  );
};

export default TeamMember;
