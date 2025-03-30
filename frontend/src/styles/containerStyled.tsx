import styled from "styled-components";

interface ContainerProps {
  sidebarOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  height: 100vh;
  line-height: 1.1;
  background: #fdf6ff;
  margin-left: ${(props) => (props.sidebarOpen ? "273px" : "80px")};
  transition: margin-left 0.3s ease-out;
`;
