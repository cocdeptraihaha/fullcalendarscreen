import styled from "styled-components";

interface AvatarContainerProps {
  $size: number;
}

export const AvatarContainer = styled.div<AvatarContainerProps>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  background-color: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #184561;
  font-weight: 600;
  font-size: ${({ $size }) => `${Math.max(12, $size * 0.4)}px`};
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
