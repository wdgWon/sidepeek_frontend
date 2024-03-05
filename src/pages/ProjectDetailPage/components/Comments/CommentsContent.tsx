// TODO: 1. 포커스 자동 조정
//       2. 하나만 수정모드 가능하도록 포커스 벗어날시 해제
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { Box, Flex, Text } from "@chakra-ui/react"
import { Comment } from "api-models"

import useEditCommentMutation from "@pages/ProjectDetailPage/hooks/mutations/useEditCommentMutation"

import { FormValues } from "../../types/formValues"
import CommentsButton from "./CommentsButton"
import CommentsText from "./CommentsText"

interface CommentsContentProps {
  comment: Comment
}

const CommentsContent = ({ comment }: CommentsContentProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>()
  const [isEditing, setIsEditing] = useState(false)

  const { projectId } = useParams()

  const { editCommentMutation } = useEditCommentMutation(
    Number(projectId),
    Number(comment.id),
  )

  useEffect(() => {
    setValue("content", comment.content)
  }, [isEditing, setValue, comment.content])

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    reset()
  }

  const onEditSubmit: SubmitHandler<FormValues> = (text) => {
    const commentRequestValue = {
      ownerId: comment.owner.id,
      isAnonymous: false,
      content: text.content,
    }
    editCommentMutation.mutate(commentRequestValue)
    setIsEditing(false)
  }

  return (
    <Box w="100%">
      <form
        onSubmit={handleSubmit(onEditSubmit)}
        style={{ width: "100%" }}>
        <Flex
          justifyContent="space-between"
          w="100%">
          <Flex
            direction="column"
            gap="1rem"
            flex="9.5">
            <Text
              fontFamily="SCDream_Bold"
              fontSize="xl">
              {comment.owner.nickname}
            </Text>
            <CommentsText
              register={register("content")}
              isEditing={isEditing}
              content={comment.content}
            />
          </Flex>
          <Flex
            gap="1rem"
            flex="0.5"
            height="fit-content">
            <CommentsButton
              isOwner={comment.isOwner}
              id={comment.id}
              isEditing={isEditing}
              handleCancelEdit={handleCancelEdit}
              handleStartEdit={handleStartEdit}
            />
          </Flex>
        </Flex>
      </form>
    </Box>
  )
}

export default CommentsContent
