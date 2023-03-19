import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

function RecipeListItem({ recipe }) {
  const [loadingImage, setloadingImage] = useState(true);

  return (
    <Card rounded="lg" shadow="none" border="1px" borderColor="blackAlpha.300">
      <CardBody>
        {loadingImage && <Skeleton w="full" h="40" />}

        <Image
          loading="lazy"
          src={recipe.image ?? "img/default-img-recipe.jpg"}
          onLoad={() => setloadingImage(false)}
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
          _hover={{
            backgroundColor: "gray.500",
            color: "white",
            border: "none",
          }}
          borderColor="blackAlpha.300"
        >
          Get Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecipeListItem;
