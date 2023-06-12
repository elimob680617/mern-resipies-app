import * as Yup from "yup";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useCreateRecipeMutation } from "../../store/slices/recipesApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateRecipe = () => {
  const navigate = useNavigate();

  // to get user data
  const { userInfo } = useSelector((state) => state.auth);

  const [create, { isLoading }] = useCreateRecipeMutation();

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const initialValues = {
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userInfo._id,
  };
  const onSubmit = (values) => handleSubmit(values);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter an Name"),

    ingredients: Yup.array().of(
      Yup.string().required("Please enter an Ingredient")
    ),

    instructions: Yup.string().required("Please enter Instructions"),
    imageUrl: Yup.string().required("Please enter an Image Url"),
    cookingTime: Yup.number()
      .typeError("Cooking Time must be a number")
      .positive("Cooking Time must be greater than zero")
      .required("Please enter Cooking Time"),
  });

  const handleSubmit = async (values) => {
    try {
      await create({
        name: values.name,
        ingredients: values.ingredients,
        instructions: values.instructions,
        imageUrl: values.imageUrl,
        cookingTime: values.cookingTime,
        userOwner: userInfo._id,
      });
      alert("Recipe Created");
      // navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <VStack
      p={8}
      spacing={4}
      bg={formBackground}
      borderRadius={8}
      boxShadow="lg"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Heading>Add Recipe</Heading>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values, getFieldProps }) => (
          <Form>
            <VStack spacing={2} alignItems="flex-start">
              <FormControl
                isInvalid={!!errors.name && touched.name}
                {...getFieldProps("name")}
              >
                <FormLabel htmlFor="name">Name: </FormLabel>
                <Field
                  as={Input}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="enter name"
                />
                {/* <FormErrorMessage>{errors.name}</FormErrorMessage> */}
                <ErrorMessage component={FormErrorMessage} name="name" />
              </FormControl>

              <FieldArray name="ingredients">
                {({ insert, remove }) => (
                  <>
                    {values.ingredients.map((ingredient, index) => (
                      <FormControl
                        key={index}
                        {...getFieldProps(`ingredients.${index}`)}
                        isInvalid={!!errors.ingredients && touched.ingredients}
                      >
                        <FormLabel htmlFor="ingredients">
                          Ingredients {index + 1} :
                        </FormLabel>
                        <HStack>
                          <Field
                            as={Input}
                            name={`ingredients.${index}`}
                            id={`ingredients.${index}`}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </Button>
                          )}
                        </HStack>
                        <ErrorMessage
                          component={FormErrorMessage}
                          name={`ingredients.${index}`}
                        />
                      </FormControl>
                    ))}
                    <Button
                      my="4"
                      type="button"
                      size="sm"
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => insert(values.ingredients.length + 1)}
                    >
                      Add Ingredients
                    </Button>
                  </>
                )}
              </FieldArray>

              <FormControl
                isInvalid={!!errors.instructions && touched.instructions}
                {...getFieldProps("instructions")}
              >
                <FormLabel htmlFor="instructions">Instructions : </FormLabel>
                <Field
                  as={Textarea}
                  type="text"
                  id="instructions"
                  name="instructions"
                  placeholder="enter instructions"
                />
                <FormErrorMessage>{errors.instructions}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.imageUrl && touched.imageUrl}
                {...getFieldProps("imageUrl")}
              >
                <FormLabel htmlFor="instructions">Image : </FormLabel>
                <Field as={Input} type="file" id="imageUrl" name="imageUrl" />
                <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.cookingTime && touched.cookingTime}
                {...getFieldProps("cookingTime")}
              >
                <FormLabel htmlFor="cookingTime">Cooking Time (min):</FormLabel>
                <Field
                  as={Input}
                  type="number"
                  id="cookingTime"
                  name="cookingTime"
                  placeholder="enter cooking time"
                />
                <FormErrorMessage>{errors.cookingTime}</FormErrorMessage>
              </FormControl>

              <Button my="4" type="submit" colorScheme="orange">
                Add
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default CreateRecipe;
