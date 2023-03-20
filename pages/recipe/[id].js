import useAxios from "@/hooks/useAxios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Skeleton,
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
  // const { id } = ;
  const toast = useToast();
  const [recipe, setRecipe] = useState(null);

  const reSummarize = (summary) => {
    return summary.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const [{ data, error, loading }] = useAxios(
    `recipes/${router.query.id}/information`
  );

  useEffect(() => {
    if (error) {
      toast({ status: "error", title: "Token Habis", duration: 9000 });
    }

    if (data) {
      setRecipe(data);
    }
  }, [error, data]);

  return (
    <>
      <Head>
        <title>{recipe ? recipe.title : "Details"}</title>
      </Head>

      <Flex color="gray.700" w="full" alignItems="center" gap={4}>
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
        {recipe ? (
          <Text fontWeight="semibold" fontSize={["md", "xl", "2xl"]}>
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
            </Flex>
          </Flex>

          <Card
            rounded="lg"
            shadow="none"
            border="1px"
            borderColor="blackAlpha.300"
            mt={4}
          >
            <CardBody>
              <Text color="gray.700" fontSize="lg" textAlign="justify">
                {reSummarize(recipe.summary)}
              </Text>
            </CardBody>
          </Card>
        </Box>
      )}
    </>
  );
}

export default RecipeDetails;
