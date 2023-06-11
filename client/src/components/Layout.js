import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Container maxW="container.lg">{children}</Container>
    </>
  );
};

export default Layout;
