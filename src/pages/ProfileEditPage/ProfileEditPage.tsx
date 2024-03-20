import { useState } from "react"

import {
  Flex,
  Input,
  StackDivider,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react"
import { useUserInfoData } from "@services/caches/useUserInfoData"

import TechStackSection from "@components/TechStack/TechStackSection"
import { useTechStack } from "@components/TechStack/hooks/useTechStack"

import { processTechStacks } from "@utils/processTechStacks"
import { revertTechStacks } from "@utils/revertTechStacks"

import ChangePWModal from "./components/Modal/ChangePWModal"
import ProfileCard from "./components/Profile/ProfileCard"
import ProfileIntroduction from "./components/Profile/ProfileIntroduction"
import usePutUserDetailMutation from "./hooks/mutation/usePutUserDetailMutation"
import { useUserInfo } from "./hooks/query/useUserInfo"
import StyledButton from "./styles/StyledButton"
import { ProfileInfo } from "./types/types"

const ProfileEditPage = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const data = useUserInfoData()
  const userId = Number(data?.id)

  const { data: userInfoDetail } = useUserInfo(userId)

  const method = useTechStack(processTechStacks(userInfoDetail.techStacks))

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    profileImageUrl: userInfoDetail.profileImageUrl,
    nickname: userInfoDetail.nickname,
    career: userInfoDetail.career,
    introduction: userInfoDetail.introduction,
    job: userInfoDetail.job,
    githubUrl: userInfoDetail.githubUrl,
    blogUrl: userInfoDetail.blogUrl,
    techStacks: processTechStacks(userInfoDetail.techStacks),
  })

  const { putUserDetailMutation } = usePutUserDetailMutation(userId)

  const handleUpdateProfile = () => {
    putUserDetailMutation.mutate({
      userId: userId,
      userInfo: {
        ...profileInfo,
        techStacks: revertTechStacks(method.fieldValue),
      },
    })
  }

  return (
    <VStack
      w="80%"
      align="start"
      m="auto">
      <VStack
        w="100%"
        divider={<StackDivider borderColor="grey.100" />}>
        <ProfileCard
          profileImageUrl={profileInfo.profileImageUrl}
          nickname={profileInfo.nickname}
          career={profileInfo.career}
          job={profileInfo.job}
          setProfileInfo={setProfileInfo}
        />
        <ProfileIntroduction
          introduction={profileInfo.introduction}
          githubUrl={profileInfo.githubUrl}
          blogUrl={profileInfo.blogUrl}
          setProfileInfo={setProfileInfo}
        />

        <TechStackSection
          {...method}
          render={(renderProps) => (
            <Input
              w="30rem"
              flex={isLargerThan500 ? "0 0 25rem" : "0 0 3.5rem"}
              {...renderProps}
            />
          )}
        />
      </VStack>

      <Flex
        w="100%"
        gap="0.5rem"
        justifyContent={isLargerThan500 ? "flex-end" : "center"}
        mt="1.5rem"
        mb="3rem">
        <StyledButton onClick={onOpen}>비밀번호 변경</StyledButton>
        <StyledButton onClick={handleUpdateProfile}>변경내용 저장</StyledButton>
        <ChangePWModal
          isOpen={isOpen}
          onClose={onClose}
          userId={userId}
        />
      </Flex>
    </VStack>
  )
}

export default ProfileEditPage
