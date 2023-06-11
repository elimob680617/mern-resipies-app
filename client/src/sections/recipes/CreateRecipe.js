import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const CreateRecipe = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const formik = useFormik({
    initialValues: {
      name: "",
      ingredients: [],
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      userOwner: 0,
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter an Name"),
      instructions: Yup.string().required("Please enter Instructions"),
      imageUrl: Yup.string().required("Please enter an Image Url"),
      cookingTime: Yup.number().required("Please enter Cooking Time"),
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
        <Heading>Create Recipe</Heading>

        <form onSubmit={formik.handleSubmit} noValidate>
          <VStack spacing={8} width="100%">
            <FormControl
              isInvalid={!!formik.errors.name && formik.touched.name}
              {...formik.getFieldProps("name")}
            >
              <FormLabel htmlFor="name">Name: </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="enter name"
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.instructions && formik.touched.instructions
              }
              {...formik.getFieldProps("instructions")}
            >
              <FormLabel htmlFor="instructions">Instructions: </FormLabel>
              <Textarea
                type="text"
                id="instructions"
                name="instructions"
                placeholder="enter instructions"
                size="sm"
                resize="vertical"
              />
              <FormErrorMessage>{formik.errors.instructions}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.imageUrl && formik.touched.imageUrl}
              {...formik.getFieldProps("imageUrl")}
            >
              <FormLabel htmlFor="instructions">Image: </FormLabel>
              <Input
                display="flex"
                alignItems="center"
                type="file"
                id="imageUrl"
                name="imageUrl"
              />
              <FormErrorMessage>{formik.errors.imageUrl}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.cookingTime && formik.touched.cookingTime
              }
              {...formik.getFieldProps("cookingTime")}
            >
              <FormLabel htmlFor="cookingTime">Cooking Time (min): </FormLabel>
              <Input
                type="number"
                id="cookingTime"
                name="cookingTime"
                placeholder="enter cooking time"
              />
              <FormErrorMessage>{formik.errors.cookingTime}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="orange">
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
  );
};

export default CreateRecipe;
