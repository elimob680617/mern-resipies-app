import { Text, VStack } from "@chakra-ui/react";
import {
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
} from "../../store/slices/recipesApiSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [getRecipes, { isLoading }] = useGetRecipesQuery();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await getRecipes();
      setRecipes(response.data);
    };
    getRecipes();
  }, [getRecipes]);

  return (
    <VStack>
      {recipes?.map((recipe) => (
        <Text key={recipe?._id}>{recipe?.name}</Text>
      ))}
      <Text>Home</Text>
    </VStack>
  );
};

export default Home;
