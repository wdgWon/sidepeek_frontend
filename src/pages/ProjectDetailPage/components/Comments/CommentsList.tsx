import { Avatar, Flex } from "@chakra-ui/react"

import { CommentsProps } from "./Comments"
import CommentsContent from "./CommentsContent"

const CommentsList = ({ comments }: CommentsProps) => {
  // TODO: 1. Avatar 누르면 사용자 프로필 정보페이지로(로그인 한 유저만)
  //       2. timeago 적용
  return (
    <Flex
      direction="column"
      gap="4rem"
      p="2rem">
      {comments.map((comment) => (
        <Flex
          justifyContent="space-between"
          align="center"
          key={comment.id}>
          <Flex
            gap="2rem"
            w="100%"
            align="flex-start">
            {comment.user ? (
              <Avatar
                cursor="pointer"
                _hover={{ opacity: "0.5" }}
                src={comment.user.profileImageUrl}
                width="5rem"
                height="5rem"
              />
            ) : (
              <Avatar
                cursor="pointer"
                _hover={{ opacity: "0.5" }}
                src=""
                width="5rem"
                height="5rem"
              />
            )}

            <CommentsContent comment={comment} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default CommentsList
