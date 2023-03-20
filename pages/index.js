import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
  Spinner,
  useDisclosure,
  useToast,
  InputRightElement,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import Head from "next/head";
import RecipeLists from "@/components/RecipeLists";
import { useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import RecipesSkeleton from "@/components/RecipesSkeleton";
import debounce from "@/utils/debounce";
import { AiOutlineReload } from "react-icons/ai";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [recipes, setRecipes] = useState(null);
  const [searchedRecipes, setsearchedRecipes] = useState(null);
  const inputSearch = useRef(null);

  const getRandomRecipes = async () => {
    setRecipes(null);
    try {
      const { data } = await axios(
        "recipes/complexSearch?tags=indonesia&number=21&limitlicense=true&addRecipeInformation=true"
      );
      localStorage.setItem("current", JSON.stringify(data.results));
      setRecipes(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const searchRecipes = async (q) => {
    if (!q) return setsearchedRecipes(null);
    setsearchedRecipes(null);
    const { data } = await axios.get(
      `recipes/autocomplete?number=10&query=${q}`
    );
    setsearchedRecipes(data);
  };

  const choosedRecipe = async (id, title) => {
    inputSearch.current.value = title;
    setRecipes(null);
    const similiar = await axios.get(`recipes/${id}/similar?number=11`);
    let idsQuery = id;
    similiar.data.forEach((recipe) => (idsQuery += `,${recipe.id}`));

    const { data } = await axios.get(`recipes/informationBulk?ids=${idsQuery}`);
    localStorage.setItem("current", JSON.stringify(data));
    setRecipes(data);
  };

  useEffect(() => {
    if (localStorage.getItem("current")) {
      setRecipes(JSON.parse(localStorage.getItem("current")));
    } else {
      getRandomRecipes();
    }
  }, []);

  const startSearching = debounce((q) => {
    searchRecipes(q);
  }, 1000);

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
            onKeyUp={(e) => startSearching(e.target.value)}
            onFocus={(e) => onOpen()}
            onBlur={() => setTimeout(onClose, 200)}
            ref={inputSearch}
            placeholder="Martabak..."
          />
          <InputRightElement w="3rem" me="1.5">
            <Tooltip placement="bottom" label="Generate New Random Recipes">
              <Button h="2rem" w="full" onClick={() => getRandomRecipes()}>
                <AiOutlineReload />
              </Button>
            </Tooltip>
          </InputRightElement>
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
          {searchedRecipes ? (
            searchedRecipes.map((recipe, i) => (
              <Box
                py="2"
                ps="4"
                key={i}
                w={["full", "lg"]}
                cursor="pointer"
                _hover={{ background: "gray.200" }}
                onClick={() => choosedRecipe(recipe.id, recipe.title)}
              >
                <Text>{recipe.title}</Text>
              </Box>
            ))
          ) : (
            <Box py="2" ps="4" w="full" display="flex" justifyContent="center">
              <Spinner size="md" />
            </Box>
          )}
        </Box>
      </Box>

      <Box mt={4}>
        {recipes ? (
          <RecipeLists recipes={recipes} title="Random Recipes" />
        ) : (
          <RecipesSkeleton />
        )}
      </Box>
    </>
  );
}
