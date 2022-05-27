import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Content = styled.main`
  /* max-width: 930px;
  width: 100%;
  margin: 0px auto;
  margin-top: 45px;
  background-color: green; */
`;
type BoxProps = {
  children?: React.ReactNode; // 👈️ added type for children
};

const Layout:React.FC<BoxProps> = ({children}) => {
  return <Content>
    <Helmet>
      <title>
        쏘 큐티 - 이메일 인증
      </title>
    </Helmet>
    {children}
  </Content>;
};

export default Layout;