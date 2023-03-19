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
      <SimpleGrid w="full" minChildWidth="250px" gap={2}>
        {new Array(3).fill("").map((_, i) => (
          <Card key={i}>
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
            <CardFooter>
              <Skeleton w="full" h={7} />
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default RecipesSkeleton;
