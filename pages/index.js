import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import Head from "next/head";
import RecipeLists from "@/components/RecipeLists";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import RecipesSkeleton from "@/components/RecipesSkeleton";
import debounce from "@/utils/debounce";
import useAxios from "@/hooks/useAxios";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [recipes, setRecipes] = useState(null);
  const [searchedRecipes, setsearchedRecipes] = useState([]);

  const toast = useToast();
  const [{ data, error, loading }] = useAxios(
    "recipes/random?limitLicense=true&number=21"
  );

  useEffect(() => {
    if (error) {
      toast({ status: "error", title: "Token Habis", duration: 9000 });
    }

    if (data) {
      setRecipes(data.recipes);
    }
  }, [error, data]);

  const searchRecipes = async (q) => {
    if (!q) return setsearchedRecipes([]);
    setsearchedRecipes([]);
    const { data } = await axios.get(
      `recipes/autocomplete?number=10&query=${q}`
    );

    setsearchedRecipes(data);
  };

  const choosedRecipe = async (id, title) => {
    setRecipes(null);
    const similiar = await axios.get(`recipes/${id}/similar?number=11`);
    let idsQuery = id;
    similiar.data.forEach((recipe) => (idsQuery += `,${recipe.id}`));

    const { data } = await axios.get(`recipes/informationBulk?ids=${idsQuery}`);
    setRecipes(data);
  };

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
            placeholder="Martabak..."
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
          {searchedRecipes.length ? (
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
          <RecipeLists recipes={recipes} title="Popular Recipes" />
        ) : (
          <RecipesSkeleton />
        )}
      </Box>
    </>
  );
}
