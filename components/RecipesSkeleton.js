import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

function RecipesSkeleton() {
  return (
    <>
      <Skeleton w="32" h="8" />

      <SimpleGrid mt={3} w="full" minChildWidth="250px" gap={2}>
        {new Array(3).fill("").map((_, i) => (
          <Card key={i} shadow="none" border="1px" borderColor="blackAlpha.300">
            <CardBody>
              <Skeleton w="full" h="40" />

              <Stack mt={6} spacing={2}>
                <Skeleton w="80%" h="6" />

                <Skeleton w="60%" h="2" />
                <Skeleton w="60%" h="2" />
                <Skeleton w="60%" h="2" />
                <Skeleton w="60%" h="2" />
              </Stack>

              <Flex gap="2" wrap="wrap" mt="4">
                <Skeleton w={10} h={4} borderRadius="full" />
                <Skeleton w={10} h={4} borderRadius="full" />
                <Skeleton w={10} h={4} borderRadius="full" />
                <Skeleton w={10} h={4} borderRadius="full" />
              </Flex>
            </CardBody>
            <CardFooter display="flex" flexDir="column" gap={2}>
              <Flex gap="2" wrap="wrap">
                <Skeleton w={10} h={4} borderRadius="full" />
                <Skeleton w={10} h={4} borderRadius="full" />
                <Skeleton w={10} h={4} borderRadius="full" />
              </Flex>
              <Skeleton w="full" h={7} />
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default RecipesSkeleton;
