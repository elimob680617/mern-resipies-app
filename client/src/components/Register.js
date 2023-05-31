import {
  Button,
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
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Please enter an email"),
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      confirmPassword: Yup.string()
        .required("Please confirm the password")
        .oneOf(
          [Yup.ref("password"), null],
          'Must match "password" field value'
        ),
    }),
  });

  return (
    <VStack h="100vh" alignItems="center" justifyContent="center">
      <VStack
        p={8}
        bg={formBackground}
        borderRadius={8}
        boxShadow="lg"
        alignItems="flex-start"
        width="100%"
      >
        <Heading>Register</Heading>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} width="100%">
            <FormControl
              isInvalid={!!formik.errors.name && formik.touched.name}
              {...formik.getFieldProps("name")}
            >
              <FormLabel htmlFor="name">Name: </FormLabel>
              <Input
                type="name"
                id="name"
                name="name"
                placeholder="enter name"
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
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
            <FormControl
              isInvalid={
                !!formik.errors.confirmPassword &&
                formik.touched.confirmPassword
              }
              {...formik.getFieldProps("confirmPassword")}
            >
              <FormLabel htmlFor="password">Confirm Password: </FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="enter confirm password"
              />
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full">
              Register
            </Button>
            <HStack alignItems="baseline">
              <Text fontSize="xs">Already have an Account?</Text>
              <Link to="/auth">Login</Link>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

export default Register;
