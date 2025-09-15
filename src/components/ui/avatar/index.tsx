import React from "react";
import { StyledDropdownAvatar } from "../dropdown/styled";
import { AvatarContainer } from "./styled";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 30 }) => {
  if (src) {
    return <StyledDropdownAvatar src={src} alt={name || "avatar"} />;
  }

  return (
    <AvatarContainer $size={size}>
      {name?.charAt(0)?.toUpperCase() || "?"}
    </AvatarContainer>
  );
};

export default Avatar;
