import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

function RecipeListItem({ recipe }) {
  return (
    <Card rounded="lg">
      <CardBody>
        <Image
          loading="lazy"
          src={recipe.image ?? "img/default-img-recipe.jpg"}
          borderRadius="lg"
        />

        <Stack mt={6} spacing={2}>
          <Heading size="md">{recipe.title}</Heading>
          <Text noOfLines={[2, 3, 3]}>{recipe.summary}</Text>
        </Stack>

        <Flex gap="2" wrap="wrap" mt="4">
          {recipe.dishTypes.map((type, i) => (
            <Tag
              size="md"
              key={i}
              _hover={{ background: "gray.100" }}
              variant="outline"
              borderRadius="full"
            >
              <TagLabel>{type}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="recipe/123"
          variant="outline"
          w="full"
          border="1px"
          borderColor="blackAlpha.500"
        >
          Get Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecipeListItem;
