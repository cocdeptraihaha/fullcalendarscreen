import React from "react";
import { StyledDropdownAvatar } from "../dropdown/styled";

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
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "#e3f2fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#184561",
        fontWeight: "600",
        fontSize: `${Math.max(12, size * 0.4)}px`,
        border: "2px solid #fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
};

export default Avatar;
