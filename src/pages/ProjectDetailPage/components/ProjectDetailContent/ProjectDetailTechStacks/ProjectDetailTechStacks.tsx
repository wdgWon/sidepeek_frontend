// TODO: 1. 기술스택 이미지 URL 추가
import { Flex, HStack, Text } from "@chakra-ui/react"
import { TechStack } from "api-models"

import CustomTag from "@components/Tag/components/CustomTag"

import getGroupedCategory from "@pages/ProjectDetailPage/utils/getGroupedCategory"

interface ProjectDetailTechStacksProps {
  techStacks: TechStack[]
}
const ProjectDetailTechStacks = ({
  techStacks,
}: ProjectDetailTechStacksProps) => {
  const groupedByCategory = getGroupedCategory(techStacks)

  return (
    <Flex
      direction="column"
      gap="3rem">
      <Text
        fontSize="2xl"
        fontFamily="SCDream_Bold">
        기술 스택
      </Text>
      <Flex
        gap="3rem"
        pl="5rem"
        direction="column">
        {groupedByCategory.map((category) => (
          <Flex
            key={category[0]}
            direction="column"
            gap="1rem">
            <Text fontSize="xl">{category[0]}</Text>
            <HStack
              spacing="1rem"
              flexWrap="wrap">
              {category[1].map((stack) => (
                <CustomTag
                  label={stack.skill.name}
                  key={stack.skill.id}
                />
              ))}
            </HStack>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default ProjectDetailTechStacks
