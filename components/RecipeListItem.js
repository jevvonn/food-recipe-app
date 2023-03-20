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
  TagLeftIcon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { MdAttachMoney, MdTimer } from "react-icons/md";
import { BiLike } from "react-icons/bi";

function RecipeListItem({ recipe }) {
  const [loadingImage, setloadingImage] = useState(true);

  const reSummarize = (summary) => {
    return summary.replace(/<\/?[^>]+(>|$)/g, " ");
  };

  return (
    <Card rounded="lg" shadow="none" border="1px" borderColor="blackAlpha.300">
      <CardBody>
        {loadingImage && <Skeleton w="full" h="40" />}

        <Image
          loading="lazy"
          src={recipe.image ?? "img/default-img-recipe.jpg"}
          alt={recipe.title}
          onLoad={() => setloadingImage(false)}
          borderRadius="lg"
        />

        <Stack mt={6} spacing={2}>
          <Heading size="md">{recipe.title}</Heading>
          <Text noOfLines={[2, 3, 3]}>{reSummarize(recipe.summary)}</Text>
        </Stack>

        <Flex gap="2" wrap="wrap" mt="4">
          {recipe.dishTypes?.map((type) => (
            <Tag
              size="lg"
              key={type}
              _hover={{ background: "gray.100" }}
              variant="outline"
              borderRadius="full"
            >
              <TagLabel>{type}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </CardBody>
      <CardFooter display="flex" flexDir="column" gap={2}>
        <Flex gap={2} wrap="wrap">
          <Tooltip placement="top" label="Price per Serving">
            <Tag
              size="lg"
              variant="solid"
              colorScheme="green"
              borderRadius="full"
              cursor="default"
            >
              <TagLeftIcon as={MdAttachMoney} />
              <TagLabel>{recipe.pricePerServing}</TagLabel>
            </Tag>
          </Tooltip>
          <Tooltip
            placement="top"
            label={`Ready in ${recipe.readyInMinutes} minutes`}
          >
            <Tag
              size="lg"
              variant="solid"
              colorScheme="blue"
              borderRadius="full"
              cursor="default"
            >
              <TagLeftIcon as={MdTimer} />
              <TagLabel>{recipe.readyInMinutes} m</TagLabel>
            </Tag>
          </Tooltip>

          <Tag
            size="lg"
            variant="solid"
            colorScheme="red"
            borderRadius="full"
            cursor="default"
          >
            <TagLeftIcon as={BiLike} />
            <TagLabel>{recipe.aggregateLikes}</TagLabel>
          </Tag>
        </Flex>
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
