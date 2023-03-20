import useAxios from "@/hooks/useAxios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { MdAttachMoney, MdTimer } from "react-icons/md";

function RecipeDetails() {
  const router = useRouter();
  const toast = useToast();
  const [recipe, setRecipe] = useState(null);

  const reSummarize = (summary) => {
    return summary.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const [{ data, error }] = useAxios(`recipes/${router.query.id}/information`);

  useEffect(() => {
    if (error) {
      toast({ status: "error", title: "Token Habis", duration: 9000 });
    }

    if (data) {
      console.log(data);
      setRecipe(data);
    }
  }, [error, data, toast]);

  return (
    <>
      <Head>
        <title>{recipe ? recipe.title : "Details"}</title>
      </Head>

      <Flex color="gray.700" w="full" alignItems="center" gap={4}>
        <Box>
          <Button
            as={Link}
            href="/"
            rounded="full"
            w="12"
            h="12"
            variant="outline"
          >
            <AiOutlineArrowLeft size={20} />
          </Button>
        </Box>
        {recipe ? (
          <Text fontWeight="semibold" fontSize={["sm", "xl", "2xl"]}>
            {recipe.title}
          </Text>
        ) : (
          <Skeleton w={"80"} h={8} />
        )}
      </Flex>
      {recipe && (
        <Box>
          <Flex color="gray.700" w="full" mt={4} gap={4} wrap="wrap">
            <Image
              alt={recipe.title}
              src={recipe.image}
              width={["full", "full", "40%"]}
              borderRadius="lg"
            />
            <Flex flexDirection="column" gap={2}>
              <Box display={recipe.cuisines.length ? "block" : "none"}>
                <Text fontWeight="semibold" fontSize="xl">
                  Cuisines
                </Text>

                <Flex gap={2} mt={2} flexWrap="wrap">
                  {recipe.cuisines.map((cuisines) => (
                    <Tag
                      size="lg"
                      key={cuisines}
                      _hover={{ background: "gray.100" }}
                      variant="outline"
                      borderRadius="full"
                    >
                      <TagLabel>{cuisines}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Box>
              <Box>
                <Text fontWeight="semibold" fontSize="xl">
                  Dish Types
                </Text>

                <Flex gap={2} mt={2} flexWrap="wrap">
                  {recipe.dishTypes.map((type) => (
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
              </Box>
              <Flex gap={2} mt={4} wrap="wrap">
                <Tooltip placement="bottom" label="Price per Serving">
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
                  placement="bottom"
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
              <Flex gap={2} mt={4} wrap="wrap" cursor="pointer">
                <Tag
                  as={Link}
                  href="#summary"
                  size="lg"
                  _hover={{ background: "gray.200" }}
                  borderRadius="full"
                  cursor="pointer"
                >
                  <TagLabel>Summary</TagLabel>
                </Tag>
                {recipe.extendedIngredients.length && (
                  <Tag
                    as={Link}
                    href="#ingredients"
                    size="lg"
                    _hover={{ background: "gray.200" }}
                    borderRadius="full"
                    cursor="pointer"
                  >
                    <TagLabel>Ingredients</TagLabel>
                  </Tag>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Card
            id="summary"
            rounded="lg"
            shadow="none"
            border="1px"
            borderColor="blackAlpha.300"
            mt={4}
          >
            <CardHeader>
              <Heading size="md">Summary</Heading>
            </CardHeader>

            <CardBody>
              <Text color="gray.700" fontSize="lg" textAlign="justify">
                {reSummarize(recipe.summary)}
              </Text>
            </CardBody>
          </Card>

          {recipe.extendedIngredients.length ? (
            <Card
              id="ingredients"
              mt={6}
              rounded="lg"
              shadow="none"
              border="1px"
              borderColor="blackAlpha.300"
            >
              <CardHeader>
                <Heading size="md">Ingredients</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {recipe.extendedIngredients.map((ing) => (
                    <Box key={ing.id}>
                      <Heading size="xs" textTransform="uppercase">
                        {ing.original}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Amount : {ing.amount}
                      </Text>
                      <Text pt="2" fontSize="sm">
                        Type : {ing.aisle}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          ) : null}
        </Box>
      )}
    </>
  );
}

export default RecipeDetails;
