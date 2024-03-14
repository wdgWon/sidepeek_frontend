import { useEffect } from "react"
import { IoMdCheckmarkCircle } from "react-icons/io"

import { Button, ButtonProps, Icon, Text, useToast } from "@chakra-ui/react"

import { toastOptions } from "@pages/SignUpPage/constants/toastOptions"

interface DoubleCheckButtonProps extends ButtonProps {
  isDuplicated?: boolean
  errorMessage: string
  successMessage: string
}

const DoubleCheckButton = ({
  isDuplicated,
  errorMessage,
  successMessage,
  ...props
}: DoubleCheckButtonProps) => {
  const toast = useToast(toastOptions)

  useEffect(() => {
    if (isDuplicated === true) {
      toast({
        status: "error",
        title: errorMessage,
      })
    } else if (isDuplicated === false) {
      toast({
        status: "success",
        title: successMessage,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicated])

  return (
    <Button
      width="9rem"
      height="5rem"
      variant="outline"
      borderRadius="0.8rem"
      {...props}>
      {isDuplicated === false ? (
        <Icon
          as={IoMdCheckmarkCircle}
          color="green"
          boxSize="2rem"
        />
      ) : (
        <Text>중복 확인</Text>
      )}
    </Button>
  )
}

export default DoubleCheckButton
