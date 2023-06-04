import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUpdateUserMutation } from "../../store/slices/usersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import Loader from "../../components/Loader";

const Profile = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const dispatch = useDispatch();

  // to get user data
  const { userInfo } = useSelector((state) => state.auth);

  const [update, { isLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInfo.name,
      email: userInfo.email,
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email"),

      password: Yup.string()

        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
    }),
  });

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await update({
          _id: userInfo._id,
          name: values.name,
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

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
                value={formik.values.name}
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
                value={formik.values.email}
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
            {isLoading && <Loader />}
            <Button type="submit" colorScheme="orange" width="full">
              Update
            </Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

export default Profile;
