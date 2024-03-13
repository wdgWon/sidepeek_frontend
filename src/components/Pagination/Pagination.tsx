import { HStack } from "@chakra-ui/react"

import NextButton from "./components/NextButton/NextButton"
import PageButtons from "./components/PageButtons/PageButtons"
import PrevButton from "./components/PrevButton/PrevButton"
import PaginationProvider from "./stores/contexts"

const Pagination = () => {
  const handlePageChange = (page: number) => {
    console.log(`${page}렌더`)
  }
  return (
    <PaginationProvider
      limit={24}
      total={400}
      onPageChange={handlePageChange}>
      <HStack>
        <PrevButton />
        <PageButtons />
        <NextButton />
      </HStack>
    </PaginationProvider>
  )
}

export default Pagination
