import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Container h="100vh" maxW="container.lg">
        {children}
      </Container>
    </>
  );
};

export default Layout;
