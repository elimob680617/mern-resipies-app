import { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// to dispatch an action and to get data from the state
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useLoginMutation } from "../../store/slices/usersApiSlice";
// after we hit our backend we get our user data we then want to call that setCredential
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // to get the function to call to fire off our mutation
  const [login, { isLoading }] = useLoginMutation();

  // to get user data
  const { userInfo } = useSelector((state) => state.auth);

  const formBackground = useColorModeValue("gray.100", "gray.700");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Please enter an email"),
      password: Yup.string().required("Please enter a password"),
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // if there is userInfo >>> we're logged in >>> redirect to home page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <VStack h="100vh" alignItems="start" justifyContent="center">
        <ArrowBackIcon
          boxSize={6}
          colorScheme="orange"
          onClick={() => navigate("/")}
        />
        <VStack
          p={8}
          bg={formBackground}
          borderRadius={8}
          boxShadow="lg"
          alignItems="flex-start"
          width="100%"
        >
          <Heading>Login</Heading>

          <form onSubmit={formik.handleSubmit} noValidate>
            <VStack spacing={4} width="100%">
              <FormControl
                isInvalid={!!formik.errors.email && formik.touched.email}
                {...formik.getFieldProps("email")}
              >
                <FormLabel htmlFor="email">Email: </FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.password && formik.touched.password}
                {...formik.getFieldProps("password")}
              >
                <FormLabel htmlFor="password">Password: </FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="enter password"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              {isLoading && <Loader />}
              <Button type="submit" colorScheme="orange" width="full">
                Login
              </Button>
              <HStack alignItems="baseline">
                <Text fontSize="xs">New Account?</Text>
                <Link to="/register">Register</Link>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Login;
