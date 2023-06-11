// import {
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   HStack,
//   Heading,
//   Input,
//   Stack,
//   Text,
//   Textarea,
//   VStack,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { Field, FieldArray, Formik, useFormik } from "formik";
// import { Link } from "react-router-dom";
import * as Yup from "yup";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";

// const CreateRecipe = () => {
//   const formBackground = useColorModeValue("gray.100", "gray.700");

//   const ingredientsGroup = { name: "" };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       ingredients: [ingredientsGroup],
//       instructions: "",
//       imageUrl: "",
//       cookingTime: 0,
//       userOwner: 0,
//     },
//     onSubmit: (values) => console.log(values),

//     validationSchema: Yup.object({
//       name: Yup.string().required("Please enter an Name"),
//       ingredients: Yup.array()
//         .of(Yup.string())
//         .required("Please enter an Ingredients"),
//       instructions: Yup.string().required("Please enter Instructions"),
//       imageUrl: Yup.string().required("Please enter an Image Url"),
//       cookingTime: Yup.number()
//         .typeError("Cooking Time must be a number")
//         .positive("Cooking Time must be greater than zero")
//         .required("Please enter Cooking Time"),
//     }),
//   });
//   return (
//     <VStack alignItems="center" justifyContent="center">
//       <VStack
//         p={8}
//         bg={formBackground}
//         borderRadius={8}
//         boxShadow="lg"
//         alignItems="flex-start"
//         width="100%"
//       >
//         <Heading>Create Recipe</Heading>

//         <VStack spacing={8} width="100%">
//           <form onSubmit={formik.handleSubmit}>
//             <>
//               <FormControl
//                 isInvalid={!!formik.errors.name && formik.touched.name}
//               >
//                 <FormLabel htmlFor="name">Name: </FormLabel>
//                 <Input
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder="enter name"
//                 />
//                 <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
//               </FormControl>
//               <FormControl
//                 isInvalid={
//                   !!formik.errors.ingredients && formik.touched.ingredients
//                 }
//                 {...formik.getFieldProps("ingredients")}
//               >
//                 <FormLabel htmlFor="ingredients">Ingredients: </FormLabel>
//                 <FieldArray name="ingredients">
//                   {({ push, remove }) => (
//                     <VStack alignItems="start">
//                       {formik?.values?.ingredients.map((_, index) => (
//                         <HStack width="full">
//                           <Text>{index + 1}</Text>
//                           <Input
//                             type="text"
//                             id="ingredients"
//                             placeholder="enter ingredients"
//                             name={`ingredients.${index}.name`}
//                           />
//                           <FormErrorMessage>
//                             {formik.errors.ingredients}
//                           </FormErrorMessage>

//                           {index > 0 && (
//                             <Button
//                               type="button"
//                               size="xs"
//                               variant="ghost"
//                               colorScheme="red"
//                               onClick={() => remove(index)}
//                             >
//                               Delete
//                             </Button>
//                           )}
//                         </HStack>
//                       ))}

//                       <Button
//                         type="button"
//                         size="sm"
//                         colorScheme="teal"
//                         variant="solid"
//                         onClick={() => push(ingredientsGroup)}
//                       >
//                         Add Ingredients
//                       </Button>
//                     </VStack>
//                   )}
//                 </FieldArray>
//               </FormControl>
//               <FormControl
//                 isInvalid={
//                   !!formik.errors.instructions && formik.touched.instructions
//                 }
//                 {...formik.getFieldProps("instructions")}
//               >
//                 <FormLabel htmlFor="instructions">Instructions : </FormLabel>
//                 <Textarea
//                   type="text"
//                   id="instructions"
//                   name="instructions"
//                   placeholder="enter instructions"
//                   size="sm"
//                   resize="vertical"
//                 />
//                 <FormErrorMessage>
//                   {formik.errors.instructions}
//                 </FormErrorMessage>
//               </FormControl>
//               <FormControl
//                 isInvalid={!!formik.errors.imageUrl && formik.touched.imageUrl}
//                 {...formik.getFieldProps("imageUrl")}
//               >
//                 <FormLabel htmlFor="instructions">Image : </FormLabel>
//                 <Input
//                   display="flex"
//                   alignItems="center"
//                   type="file"
//                   id="imageUrl"
//                   name="imageUrl"
//                 />
//                 <FormErrorMessage>{formik.errors.imageUrl}</FormErrorMessage>
//               </FormControl>
//               <FormControl
//                 isInvalid={
//                   !!formik.errors.cookingTime && formik.touched.cookingTime
//                 }
//                 {...formik.getFieldProps("cookingTime")}
//               >
//                 <FormLabel htmlFor="cookingTime">
//                   Cooking Time (min):{" "}
//                 </FormLabel>
//                 <Input
//                   type="text"
//                   id="cookingTime"
//                   name="cookingTime"
//                   placeholder="enter cooking time"
//                 />
//                 <FormErrorMessage>{formik.errors.cookingTime}</FormErrorMessage>
//               </FormControl>
//               <Button type="submit" colorScheme="orange">
//                 Login
//               </Button>
//             </>
//           </form>
//         </VStack>
//       </VStack>
//     </VStack>
//   );
// };

// export default CreateRecipe;

const CreateRecipe = () => {
  const initialValues = {
    name: "",
    ingredients: [{ name: "" }],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  };
  const onSubmit = (values) => console.log(values);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter an Name"),

    // ingredients: Yup.array().of(
    //   Yup.object().shape({
    //     name: Yup.string().required("Please enter an Ingredient"),
    //   })
    // ),

    // instructions: Yup.string().required("Please enter Instructions"),
    // imageUrl: Yup.string().required("Please enter an Image Url"),
    // cookingTime: Yup.number()
    //   .typeError("Cooking Time must be a number")
    //   .positive("Cooking Time must be greater than zero")
    //   .required("Please enter Cooking Time"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, values, getFieldProps }) => (
        <Form>
          <FormControl
            isInvalid={!!errors.name && touched.name}
            {...getFieldProps("name")}
          >
            <FormLabel htmlFor="name">Name: </FormLabel>
            <Field type="text" id="name" name="name" placeholder="enter name" />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FieldArray name="ingredients">
            {({ insert, remove }) => (
              <>
                {values.ingredients.map((ingredient, index) => (
                  <FormControl key={index} {...getFieldProps(`${ingredient}`)}>
                    <FormLabel htmlFor="ingredients">
                      Ingredients {index + 1} :
                    </FormLabel>
                    <HStack>
                      <Field
                        name={`ingredients.${index}.name`}
                        id={`ingredients.${index}.name`}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      )}
                    </HStack>
                  </FormControl>
                ))}
                <Button
                  type="button"
                  size="sm"
                  colorScheme="teal"
                  variant="solid"
                  onClick={() =>
                    insert(values.ingredients.length + 1, { name: "" })
                  }
                >
                  Add Ingredients
                </Button>
              </>
            )}
          </FieldArray>
          <Button type="submit" colorScheme="orange">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateRecipe;
