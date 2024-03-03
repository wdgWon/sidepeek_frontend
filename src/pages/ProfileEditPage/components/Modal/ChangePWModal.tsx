import { SubmitHandler, useForm } from "react-hook-form"

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react"

import CommonInput from "@components/Input/CommonInput"

interface FormValues {
  currentPassword: string
  newPassword: string
  checkPassword: string
}
interface ModalProps {
  isOpen: boolean
  onClose: () => void
}
const ChangePWModal = ({ isOpen, onClose }: ModalProps) => {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
  })
  const onValid = () => {
    // TODO: 비밀번호 변경 api 요청
    console.log("1")
    reset()
    onClose()
  }
  const onInvalid = () => {
    console.log("Submit 실패")
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // TODO: 기존 비밀번호 api 불러와서 비교 후 다르면 setError하도록 해야함
    const { newPassword, checkPassword } = data
    if (newPassword !== checkPassword) {
      setError("checkPassword", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      })
      onInvalid()
    } else {
      onValid()
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            {/* TODO: 기존 비밀번호 api 불러와서 비교 validation */}
            <Flex
              direction="column"
              gap="1.5rem">
              <Box>
                <Flex alignItems="center">
                  <Text fontSize="1.3rem">현재 비밀번호</Text>
                  <Spacer />
                  {errors.currentPassword?.message && (
                    <Text color="red.100">
                      {errors.currentPassword.message.toString()}
                    </Text>
                  )}
                </Flex>

                <CommonInput
                  type="password"
                  size="lg"
                  register={register("currentPassword", {
                    required: "현재 비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "현재 비밀번호는 8자 이상입니다",
                    },
                  })}
                  placeholder="현재 비밀번호"
                />
              </Box>

              <Box>
                <Flex alignItems="center">
                  <Text fontSize="1.3rem">새로운 비밀번호</Text>
                  <Spacer />
                  {errors.newPassword?.message && (
                    <Text color="red.100">
                      {errors.newPassword?.message.toString()}
                    </Text>
                  )}
                </Flex>

                <CommonInput
                  type="password"
                  size="lg"
                  register={register("newPassword", {
                    required: "새로운 비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "새로운 비밀번호는 8자 이상이어야 합니다",
                    },
                  })}
                  placeholder="새로운 비밀번호"
                />
              </Box>

              <Box>
                <Flex alignItems="center">
                  <Text fontSize="1.3rem">비밀번호 확인</Text>
                  <Spacer />
                  {errors.checkPassword?.message ? (
                    <Text color="red.100">
                      {errors.checkPassword?.message.toString()}
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </Flex>

                <CommonInput
                  type="password"
                  size="lg"
                  register={register("checkPassword", {
                    required: "새로운 비밀번호를 한번 더 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "새로운 비밀번호는 8자 이상이어야 합니다",
                    },
                  })}
                  placeholder="비밀번호 확인"
                />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              w="6rem"
              h="3.5rem"
              fontSize="1.3rem"
              color="white"
              bg="blue.100"
              borderRadius="10px">
              변경
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
export default ChangePWModal
