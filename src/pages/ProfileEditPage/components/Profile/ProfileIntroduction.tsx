import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FaSquarePen } from "react-icons/fa6"
import { ImGithub } from "react-icons/im"
import { MdCancel } from "react-icons/md"

import {
  Box,
  Flex,
  HStack,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react"

import { ErrorMessage } from "@components/ErrorMessage/ErrorMessage"
import CommonInput from "@components/Input/CommonInput"

import {
  BLOG_URL_VALIDATION_OPTION,
  GITHUB_URL_VALIDATION_OPTION,
} from "@pages/ProfileEditPage/constants/validation"

import { ProfileInfo } from "../../types/types"

interface Urls {
  githubUrl: string
  blogUrl: string
}
interface ProfileIntroductionProps
  extends Pick<ProfileInfo, "introduction" | "githubUrl" | "blogUrl"> {
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInfo>>
  register: UseFormRegister<Urls>
  errors: FieldErrors
  setValue: UseFormSetValue<Urls>
}

const ProfileIntroduction = ({
  register,
  errors,
  setValue,
  introduction = "",
  setProfileInfo,
}: ProfileIntroductionProps) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)")
  console.log(errors)
  return (
    <Box
      w="100%"
      pb="2rem">
      <Text
        fontSize="xl"
        fontFamily="SCDream_Bold"
        margin="1.5rem 0 1.5rem 1rem">
        소개
      </Text>
      <Textarea
        height="10rem"
        resize="none"
        value={introduction}
        placeholder="소개글을 입력해주세요"
        onChange={(e) =>
          setProfileInfo((profileInfo) => ({
            ...profileInfo,
            introduction: e.target.value,
          }))
        }
      />

      <Flex
        direction="column"
        mt="2rem"
        w="100%">
        <Flex direction="row">
          <HStack
            mb="0.5rem"
            w={isLargerThan500 ? "38rem" : "100%"}>
            <ImGithub size="2.36rem" />
            <InputGroup
              size="sm"
              alignItems="center">
              <InputLeftAddon
                ml="0.5rem"
                pl="1rem"
                h="2.5rem"
                fontSize="1.1rem"
                borderLeftRadius="0.8rem">
                https://
              </InputLeftAddon>
              <CommonInput
                size="md"
                ml="0.5rem"
                pr="2.5rem"
                fontSize="1.2rem"
                variant="flushed"
                borderColor={errors.githubUrl && "red.100"}
                _focus={{ borderColor: errors.githubUrl && "red.100" }}
                placeholder="github.com/sidepeek"
                register={register("githubUrl", GITHUB_URL_VALIDATION_OPTION)}>
                <MdCancel
                  size="15"
                  cursor="pointer"
                  onClick={() => setValue("githubUrl", "")}
                />
              </CommonInput>
            </InputGroup>
          </HStack>
          {isLargerThan500 && (
            <ErrorMessage
              errors={errors}
              name="githubUrl"
              render={({ message }) => (
                <Text
                  fontSize="1.1rem"
                  color="red.100"
                  ml="0.8rem"
                  mt="0.5rem">
                  {message}
                </Text>
              )}
            />
          )}
        </Flex>

        <Flex
          direction="column"
          mt="0.7rem"
          w="100%">
          <Flex direction="row">
            <HStack
              mb="0.5rem"
              w={isLargerThan500 ? "38rem" : "100%"}>
              <FaSquarePen size="2.35rem" />
              <InputGroup
                size="sm"
                alignItems="center">
                <InputLeftAddon
                  ml="0.5rem"
                  pl="1rem"
                  h="2.5rem"
                  fontSize="1.1rem"
                  borderLeftRadius="0.8rem">
                  https://
                </InputLeftAddon>
                <CommonInput
                  size="md"
                  ml="0.5rem"
                  pr="2.5rem"
                  fontSize="1.2rem"
                  variant="flushed"
                  _focus={{ borderColor: errors.blogUrl && "red.100" }}
                  borderColor={errors.blogUrl && "red.100"}
                  placeholder="blog.sidepeek.com"
                  register={register("blogUrl", BLOG_URL_VALIDATION_OPTION)}>
                  <MdCancel
                    size="15"
                    cursor="pointer"
                    onClick={() => setValue("blogUrl", "")}
                  />
                </CommonInput>
              </InputGroup>
            </HStack>
            <ErrorMessage
              errors={errors}
              name="blogUrl"
              render={({ message }) => (
                <Text
                  color="red.100"
                  fontSize="1.1rem"
                  ml="0.8rem"
                  mt="0.5rem">
                  {message}
                </Text>
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProfileIntroduction
