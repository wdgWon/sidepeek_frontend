// TODO: 1. 포커스 자동 조정
//       2. 하나만 수정모드 가능하도록 포커스 벗어날시 해제
// 커스텀 훅(상태, )
// 글자수 제한
import { UseFormHandleSubmit, UseFormRegisterReturn } from "react-hook-form"
import ResizeTextarea from "react-textarea-autosize"

import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/react"
import { Comment } from "api-models"

import { EditCommentFormValues } from "@pages/ProjectDetailPage/types/editCommentFormValues"

import CommentTitle from "./CommentTitle"
import CommentsAvatar from "./CommentsAvatar"
import CommentsButton from "./CommentsButton"
import CommentsForm from "./CommentsForm"
import { handleOnEditProps } from "./CommentsList"
import ReplyComment from "./ReplyComment"

interface CommentsItemProps {
  comment: Comment
  handleOnEdit: ({ commentId, isAnonymous, content }: handleOnEditProps) => void
  handleOffEdit: () => void
  handleOnReply: () => void
  handleOffReply: () => void
  handleDelete: (commentId: number) => void
  handleSubmit: UseFormHandleSubmit<EditCommentFormValues>
  onSubmitEdit: (comment: EditCommentFormValues) => void
  editTargetCommentId: number
  isReply: boolean
  isEditing: boolean
  handleNavigateProfile: (commentUserId: number) => void
  register: UseFormRegisterReturn
}

const CommentsItem = ({
  comment,
  handleOnEdit,
  handleOffEdit,
  handleOnReply,
  handleOffReply,
  editTargetCommentId,
  isReply,
  isEditing,
  handleNavigateProfile,
  handleDelete,
  handleSubmit,
  onSubmitEdit,
  register,
}: CommentsItemProps) => {
  return (
    <Stack
      w="100%"
      gap="3rem">
      <HStack
        w="100%"
        gap="2rem"
        align="flex-start">
        <CommentsAvatar
          onClick={() => {
            if (comment.user && comment.user.id) {
              handleNavigateProfile(comment.user.id)
            }
          }}
          user={comment.user}
        />

        <Box w="100%">
          <HStack
            justifyContent="space-between"
            w="100%">
            <Stack
              w="100%"
              gap="1rem"
              align="flex-start">
              <CommentTitle
                user={comment.user}
                createdAt={comment.createdAt}
              />
              <HStack
                w="100%"
                justify="space-between">
                {editTargetCommentId === comment.id && isEditing ? (
                  <Box w="100%">
                    <form onSubmit={handleSubmit(onSubmitEdit)}>
                      <Textarea
                        rows={1}
                        w="100%"
                        fontSize="lg"
                        p="0.2rem"
                        as={ResizeTextarea}
                        isRequired={false}
                        resize="none"
                        {...register}
                      />
                    </form>
                  </Box>
                ) : (
                  <Text
                    fontSize="lg"
                    p="0.2rem">
                    {comment.content}
                  </Text>
                )}
                <HStack gap="1rem">
                  <CommentsButton
                    editTargetCommentId={editTargetCommentId}
                    comment={comment}
                    isEditing={isEditing}
                    handleDelete={handleDelete}
                    handleOnEdit={handleOnEdit}
                    handleOffEdit={handleOffEdit}
                  />
                </HStack>
              </HStack>

              {!comment.parentId &&
                (isReply ? (
                  <>
                    <CommentsForm />
                    <Button onClick={handleOffReply}>취소</Button>
                  </>
                ) : (
                  <Button
                    onClick={handleOnReply}
                    p="0">
                    답글달기
                  </Button>
                ))}
            </Stack>
          </HStack>
        </Box>
      </HStack>
      {comment.replies && <ReplyComment comment={comment.replies} />}
    </Stack>
  )
}

export default CommentsItem
