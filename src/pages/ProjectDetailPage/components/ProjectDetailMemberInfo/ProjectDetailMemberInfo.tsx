import { Flex, Text } from "@chakra-ui/react"
import { Member } from "api-models"

import getGroupedCategory from "@pages/ProjectDetailPage/utils/getGroupedCategory"

import ProjectDetailMemberList from "./ProjectDetailMemberList/ProjectDetailMemberList"

interface ProjectDetailMemberInfoProps {
  members: Member[]
}

const ProjectDetailMemberInfo = ({ members }: ProjectDetailMemberInfoProps) => {
  const groupedByCategory = getGroupedCategory(members)
  console.log(groupedByCategory)
  return (
    <Flex
      direction="column"
      gap="2rem">
      <Text
        fontSize="3xl"
        fontFamily="SCDream_Bold">
        팀원
      </Text>
      <Flex gap="1rem">
        {groupedByCategory.map(([category, members]) => (
          <ProjectDetailMemberList
            key={category}
            category={category}
            members={members}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default ProjectDetailMemberInfo
