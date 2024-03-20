import { IoMdClose } from "react-icons/io"

import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import { Skill } from "api-models"

import CloseButtonTag from "@components/Tag/components/CloseButtonTag"
import { FieldProps } from "@components/TechStack/hooks/useTechStack"

import { filterSelectedId } from "@pages/ProjectEditPage/utils/filterSelectedId"

import StackSearchBox from "../../pages/ProjectEditPage/components/TechStacksFields/components/StackSearchBox"

//useTechStack hook을 사용하여 제어 컴포넌트처럼 사용
const TechStackSection = ({
  fieldValue,
  onAppendField,
  onAppendStack,
  onDeleteField,
  onDeleteStack,
  onChangeCategory,
  render,
}: FieldProps<Skill>) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)")

  return (
    <Box
      w="100%"
      position="relative">
      <Text
        fontSize="xl"
        fontFamily="SCDream_Bold"
        margin="1.5rem 0 1.5rem 1rem">
        기술스택
      </Text>
      {fieldValue?.map((field, index) => {
        const selectedData = field.data
        return (
          <Flex
            key={field.id || index}
            direction={isLargerThan500 ? "row" : "column"}
            mb={isLargerThan500 ? "3rem" : "1.5rem"}>
            {render({
              value: field.category,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onChangeCategory(e, index)
              },
            })}
            <Box pr={isLargerThan500 ? "2rem" : "0rem"}>
              {onDeleteField && (
                <Box
                  pos="absolute"
                  right="0.5rem"
                  cursor="pointer">
                  <IoMdClose
                    size="2rem"
                    onClick={() => onDeleteField?.(index)}
                  />
                </Box>
              )}
            </Box>

            <Box
              flex="0 0 30rem"
              borderLeft={isLargerThan500 ? "1px solid" : ""}
              borderTop={isLargerThan500 ? "" : "1px solid"}
              borderColor="grey.200"
              px={isLargerThan500 ? "2rem" : "0rem"}
              py={isLargerThan500 ? "0rem" : "1rem"}>
              <StackSearchBox
                render={({ techStacks }) => {
                  return (
                    <Box>
                      {filterSelectedId(techStacks, selectedData).map(
                        (techStack) => {
                          return (
                            <Box
                              ml="1rem"
                              mb="0.3rem"
                              fontSize="1.2rem"
                              cursor="pointer"
                              _hover={{ fontWeight: "bold" }}
                              onClick={() => onAppendStack?.(techStack, index)}
                              key={techStack.name}>
                              {techStack.name}
                            </Box>
                          )
                        },
                      )}
                    </Box>
                  )
                }}
              />
            </Box>

            <Box
              flexWrap="nowrap"
              flex="1 1 auto"
              borderLeft={isLargerThan500 ? "1px solid" : ""}
              borderTop={isLargerThan500 ? "" : "1px solid"}
              borderColor="grey.200"
              pl={isLargerThan500 ? "2rem" : 0}
              pt={isLargerThan500 ? "0" : "1rem"}>
              {selectedData?.map((stack) => (
                <CloseButtonTag
                  key={stack.name}
                  label={stack.name}
                  leftElement={
                    <Image
                      src={stack.iconImageUrl}
                      w="1.4rem"
                      h="1.4rem"
                    />
                  }
                  onClickCloseButton={() => onDeleteStack?.(stack, index)}
                />
              ))}
            </Box>
          </Flex>
        )
      })}
      {onAppendField && (
        <Center>
          <Button
            w="99%"
            h="3.2rem"
            border="1px solid"
            borderColor="grey.300"
            borderRadius="1rem"
            margin="auto auto"
            onClick={() => onAppendField()}>
            + 기술스택 추가
          </Button>
        </Center>
      )}
    </Box>
  )
}
export default TechStackSection
