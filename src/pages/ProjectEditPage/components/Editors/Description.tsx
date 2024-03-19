import { Controller, FieldPath } from "react-hook-form"

import { Box } from "@chakra-ui/react"
import MDEditor, { commands } from "@uiw/react-md-editor"

import { useFileUpload } from "@pages/ProjectEditPage/hooks/useFileUpload"
import { useProjectFormContext } from "@pages/ProjectEditPage/hooks/useProjectFormContext"
import { ProjectFormValues } from "@pages/ProjectEditPage/types/ProjectFormValues"

import FileUploadBox from "../Files/FileUploadBox"
import FileUploadSection from "../Files/FileUploadSection"
import UploadIcon from "./components/UpdateIcon"

const Description = ({ name }: { name: FieldPath<ProjectFormValues> }) => {
  const { control } = useProjectFormContext()
  const { onChangeFile } = useFileUpload()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <MDEditor
          onChange={onChange}
          onBlur={onBlur}
          value={value as string}
          commands={[
            commands.image,
            commands.divider,
            commands.divider,
            commands.fullscreen,
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
              ],
              {
                name: "title",
                groupName: "title",
                buttonProps: { "aria-label": "Insert title" },
              },
            ),
            commands.group([], {
              name: "update",
              groupName: "update",
              icon: <UploadIcon />,
              buttonProps: { "aria-label": "Insert title" },
              children: ({ close, textApi }) => {
                return (
                  <Box>
                    <FileUploadSection
                      onDrop={async (e) => {
                        const fileUrl = await onChangeFile(e)
                        if (!fileUrl.length) {
                          return
                        }
                        textApi?.replaceSelection(`![](${[fileUrl[0]]})`)
                      }}
                      maxFiles={1}
                      multiple={false}
                      accept={{ "image/*": [".jpeg", ".png"] }}>
                      {(inputProps) => (
                        <FileUploadBox
                          {...inputProps}
                          id="thumbnail"
                          placeholder="대표 사진을 업로드해주세요"
                        />
                      )}
                    </FileUploadSection>
                    <button
                      type="button"
                      onClick={close}>
                      Close
                    </button>
                  </Box>
                )
              },
            }),
          ]}
        />
      )}></Controller>
  )
}

export default Description
