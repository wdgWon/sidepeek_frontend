import { Stack, useMediaQuery } from "@chakra-ui/react"
import { ProjectOverViewUrl } from "api-models"

import SummaryLeft from "./SummaryLeft"
import SummaryRight from "./SummaryRight"

interface SummaryContentProps {
  deployUrl: string
  githubUrl: string
  overviewImageUrl: ProjectOverViewUrl[]
  overview: string
}
const SummaryContent = ({
  deployUrl,
  githubUrl,
  overviewImageUrl,
  overview,
}: SummaryContentProps) => {
  const [isLargerThan1200] = useMediaQuery(["(min-width: 1200px)"])
  return (
    <Stack
      direction={isLargerThan1200 ? "row" : "column"}
      justifyContent={isLargerThan1200 ? "space-between" : "center"}
      align={isLargerThan1200 ? "stretch" : "center"}
      spacing="3rem"
      w="100%">
      <SummaryLeft
        {...{
          deployUrl,
          githubUrl,
          overview,
        }}
      />

      <SummaryRight overviewImageUrl={overviewImageUrl} />
    </Stack>
  )
}
export default SummaryContent
