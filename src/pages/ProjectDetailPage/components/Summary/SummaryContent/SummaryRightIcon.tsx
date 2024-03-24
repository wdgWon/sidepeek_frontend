import { IconButton, IconButtonProps } from "@chakra-ui/react"

interface SummaryRightIconProps extends IconButtonProps {
  direction: string
  onClick: () => void
}

const SummaryRightIcon = ({
  direction,
  onClick,
  ...props
}: SummaryRightIconProps) => {
  const directionStyle =
    direction === "left" ? { left: "-5%" } : { right: "-5%" }

  return (
    <IconButton
      top="44%"
      position="absolute"
      bgColor="grey.300"
      height="5rem"
      width="5rem"
      borderRadius="50%"
      zIndex="docked"
      onClick={onClick}
      {...directionStyle}
      {...props}
    />
  )
}

export default SummaryRightIcon
