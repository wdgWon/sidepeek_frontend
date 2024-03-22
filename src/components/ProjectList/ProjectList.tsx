import { ForwardedRef, forwardRef } from "react"

import { Center, Grid, Spinner, Text } from "@chakra-ui/react"
import { AllProject } from "api-models"

import ProjectCard from "@components/ProjectCard/ProjectCard"

interface ProjectListProps {
  projects: AllProject[]
  isLoading: boolean
  isFetchingNextPage?: boolean
  projectCount: number
}

const ProjectList = forwardRef(
  (
    { projects, isLoading, isFetchingNextPage, projectCount }: ProjectListProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <>
        {isLoading ? (
          <Center>
            <Spinner
              thickness="0.3rem"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.100"
              size="xl"
            />
          </Center>
        ) : (
          <Grid
            mt="0.5rem"
            templateColumns={
              projectCount ? "repeat(auto-fill, minmax(24rem, 1fr))" : ""
            }
            gap={0}>
            {!projectCount && !isLoading ? (
              <Center>
                <Text fontSize="2xl">프로젝트가 없습니다</Text>
              </Center>
            ) : (
              projects.map((project) => (
                <Center key={project.id}>
                  <ProjectCard
                    imgUrl={project.thumbnailUrl}
                    viewCount={project.viewCount}
                    heartCount={project.likeCount}
                    isFullHeart={project.isLiked}
                    title={project.name}
                    content={project.subName}
                    url={`/project/${project.id}`}
                    ref={ref}
                  />
                </Center>
              ))
            )}
            ){isFetchingNextPage ? <Spinner /> : null}
          </Grid>
        )}
      </>
    )
  },
)

ProjectList.displayName = "ProjectList"

export default ProjectList
