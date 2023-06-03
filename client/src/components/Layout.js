import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
