import {
  AddIcon,
  ArrowForwardIcon,
  CopyIcon,
  HamburgerIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/food-recipe-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        translateY={0}
        transitionProperty="transform"
        transitionDuration=".3s"
        transitionTimingFunction="ease-in-out"
        backgroundColor="brand.900"
        ref={headerRef}
      >
        <Box margin="0 auto" width="100%">
          <nav>
            <HStack
              px={[4, 6, 8, 16]}
              py={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src={logo}
                boxSize={{ base: "30px", md: "40px", lg: "60px" }}
              />

              <Show above="lg">
                <HStack spacing={8}>
                  <Link to="/">Home</Link>
                  <Link to="/new-recipe">New Recipe</Link>
                  <Link to="/saved-recipe">Saved Recipe</Link>
                  <Link to="/auth">Login/Register</Link>
                  <ColorModeSwitch />
                </HStack>
              </Show>

              <Show below="lg">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    color="brand.100"
                  />
                  <MenuList>
                    <MenuItem icon={<StarIcon />}>
                      <Link to="/">Home</Link>
                    </MenuItem>
                    <MenuItem icon={<AddIcon />}>
                      <Link to="/new-recipe">New Recipe</Link>
                    </MenuItem>

                    <MenuItem icon={<CopyIcon />}>
                      <Link to="/saved-recipe">Saved Recipe</Link>
                    </MenuItem>

                    <MenuItem icon={<ArrowForwardIcon />}>
                      <Link to="/auth">Login/Register</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Show>
            </HStack>
          </nav>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
