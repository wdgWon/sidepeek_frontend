// TODO: 1. 포커스 자동 조정(register edit name 사용)
import { UseFormRegisterReturn } from "react-hook-form"

import { Box, Button, HStack, Stack } from "@chakra-ui/react"
import { Comment } from "api-models"

import { useComment } from "@pages/ProjectDetailPage/hooks/useComment"

import CommentsForm from "../CommentsForm/CommentsForm"
import CommentTitle from "./CommentTitle"
import CommentsAvatar from "./CommentsAvatar"
import CommentsEditFormText from "./CommentsEditFormText"
import ReplyComment from "./ReplyComment"

interface CommentsItemProps {
  comment: Comment
  register: UseFormRegisterReturn
}

const CommentsItem = ({ comment, register }: CommentsItemProps) => {
  const {
    replyTargetCommentId,
    isReply,
    handleOnReply,
    handleOffReply,
    handleNavigateProfile,
  } = useComment()

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
              <CommentsEditFormText
                {...{
                  comment,
                  register,
                }}
              />
              {!comment.parentId &&
                (isReply ? (
                  comment.id === replyTargetCommentId && (
                    <>
                      <CommentsForm parentId={replyTargetCommentId} />
                      <Button
                        p="0"
                        _hover={{ opacity: "0.5" }}
                        onClick={handleOffReply}>
                        취소
                      </Button>
                    </>
                  )
                ) : (
                  <Button
                    onClick={() => handleOnReply(comment.id)}
                    p="0">
                    답글달기
                  </Button>
                ))}
            </Stack>
          </HStack>
        </Box>
      </HStack>
      {comment.replies && (
        <ReplyComment
          comment={comment.replies}
          {...{
            register,
          }}
        />
      )}
    </Stack>
  )
}

export default CommentsItem
