import { Heading, SimpleGrid } from "@chakra-ui/react";
import RecipeListItem from "./RecipeListItem";

function RecipeLists({ recipes, title }) {
  return (
    <>
      <Heading mt={4} size="lg">
        {title}
      </Heading>

      <SimpleGrid w="full" mt={3} minChildWidth="250px" gap={2}>
        {recipes.map((recipe) => (
          <RecipeListItem recipe={recipe} key={recipe.id} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default RecipeLists;
