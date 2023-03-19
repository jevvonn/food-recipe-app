import { SimpleGrid } from "@chakra-ui/react";
import RecipeListItem from "./RecipeListItem";

function RecipeLists({ recipes }) {
  return (
    <SimpleGrid w="full" minChildWidth="250px" gap={2}>
      {recipes.map((recipe) => (
        <RecipeListItem recipe={recipe} key={recipe.id} />
      ))}
    </SimpleGrid>
  );
}

export default RecipeLists;
