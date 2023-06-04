import {
  AddIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  CopyIcon,
  HamburgerIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/food-recipe-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useLogoutMutation } from "../store/slices/usersApiSlice";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create a function to call the mutation
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // destroy the cookie and then gonna dispatch local logout clear localStorage
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
                  {userInfo ? (
                    <Box>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          {userInfo?.name}
                        </MenuButton>
                        <MenuList>
                          <Link to="/profile">
                            <MenuItem>Profile</MenuItem>
                          </Link>

                          <Link onClick={logoutHandler}>
                            <MenuItem>Logout</MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    </Box>
                  ) : (
                    <Link to="/login">Login/Register</Link>
                  )}

                  <ColorModeSwitch />
                </HStack>
              </Show>

              <Show below="lg">
                <Box>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      variant="outline"
                      color="brand.100"
                    />
                    <MenuList>
                      <Link to="/">
                        <MenuItem icon={<StarIcon />}>Home</MenuItem>
                      </Link>
                      <Link to="/new-recipe">
                        <MenuItem icon={<AddIcon />}>New Recipe</MenuItem>
                      </Link>

                      <Link to="/saved-recipe">
                        <MenuItem icon={<CopyIcon />}>Saved Recipe</MenuItem>
                      </Link>

                      <Link to="/auth">
                        <MenuItem icon={<ArrowForwardIcon />}>
                          Login/Register
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </Box>
              </Show>
            </HStack>
          </nav>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
