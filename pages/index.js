import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
  Spinner,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import Head from "next/head";
import RecipeLists from "@/components/RecipeLists";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import RecipesSkeleton from "@/components/RecipesSkeleton";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [recipes, setRecipes] = useState([]);

  const getRandomRecipes = async () => {
    setRecipes([]);
    const { data } = await axios.get(
      "recipes/random?limitLicense=true&number=21"
    );

    setRecipes(data.recipes);
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Box display="flex" justifyContent="center" w="full" position="relative">
        <InputGroup w={["full", "lg"]}>
          <InputLeftElement pointerEvents="none">
            <CiSearch size={20} />
          </InputLeftElement>
          <Input
            type="search"
            onFocus={(e) => (e.target.value ? onOpen() : false)}
            onInput={(e) => (e.target.value ? onOpen() : false)}
            onBlur={() => setTimeout(onClose, 200)}
            placeholder="Martabak's recipe..."
          />
        </InputGroup>
        <Box
          position="absolute"
          zIndex={10}
          py="2"
          background="white"
          shadow="md"
          w={["full", "lg"]}
          h="min-content"
          bottom="0"
          top="12"
          borderRadius="lg"
          display={isOpen ? "flex" : "none"}
          flexDirection="column"
          alignItems="center"
        >
          {/* <Box py="2" ps="4" w="full" display="flex" justifyContent="center">
            <Spinner size="md" />
          </Box> */}
          {new Array(5).fill("10").map((_, i) => (
            <Box
              py="2"
              ps="4"
              key={i}
              w={["full", "lg"]}
              cursor="pointer"
              _hover={{ background: "gray.100" }}
              onClick={() => console.log(i)}
            >
              <Text>Martabak</Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Heading mt={4} size="lg">
        Popular Recipes
      </Heading>
      <Box mt={4}>
        {recipes.length ? (
          <RecipeLists recipes={recipes} />
        ) : (
          <RecipesSkeleton />
        )}
      </Box>
    </>
  );
}
