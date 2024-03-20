declare module "api-models" {
  /* FIXME: 초기 ERD 모델 (아직 정해지지 않아서 일단 남겨놓습니다)
  export type User = {
    id: number
    nickname: string
    provider: string
    email: string
    password?: string
    profileImageUrl?: string
    introduction?: string
    job?: string
    career?: string
    githubUrl?: string
    blogUrl?: string
    createdAt: string
    updatedAt: string
    deletedAt?: string
    isDeleted: boolean
  } */

  export type TechStackRequest = {
    skillId?: number
    category?: string
  }

  export type UserInfoProperties = {
    nickname: string
    introduction: string
    profileImageUrl: string
    job: string
    career: string
    githubUrl: string
    blogUrl: string
    techStacks: TechStack[]
  }
  export interface UserInfo {
    userInfo: UserInfoProperties
  }

  export type UserSummary = {
    id: number | null
    isSocialLogin: boolean | null
    nickname: string
    profileImageUrl: string | null
  }

  export type Project = {
    id: number
    name: string
    subName: string
    overview: string
    thumbnailUrl: string
    overviewImageUrl: ProjectOverViewUrl[]
    githubUrl: string
    deployUrl: string
    techStacks: TechStack[]
    startDate: string
    endDate: string
    ownerId: number
    members: Member[]
    viewCount: number
    likeCount: number
    likeId: number | null
    commentCount: number
    comments: Comment[]
    description: string
    troubleShooting: string
  }

  export type AllProject = {
    id: number
    name: string
    subName: string
    thumbnailUrl: string
    viewCount: number
    likeCount: number
    isLiked: boolean
  }

  export type BannerProject = {
    id: number
    name: string
    subName: string
    thumbnailUrl: string
  }

  export type Description = {
    content: string
    imageUrls: string[]
  }

  export type Member = {
    id: number
    role: string
    userSummary: UserSummary
  }

  export type ProjectTag = {
    id: number
    projectId: string
    tagId: string
  }

  export type ProjectSkill = {
    id: number
    projectId: string
    skillId: string
  }

  export type ProjectFile = {
    id: number
    projectId: string
    fileId: string
  }

  export type ProjectMember = {
    id: number
    projectId: string
    memberId?: string
    authority: string
    role: string
    nickname: string
  }

  export type ProjectOverViewUrl = {
    id: number
    url: string
  }

  export type Owner = {
    id: number
    nickname: string
    profileImageUrl: string
  }

  export type Comment = {
    id: number
    user: userSummary | null
    parentId: number | null
    isOwner: boolean
    isAnonymous: boolean
    content: string
    createdAt: string
    replies: Comment[]
  }

  export type Like = {
    id: number
    projectId: string
    userId: string
    createdAt: string
  }

  export type TechStack = {
    id: number
    skill: Skill
    category: string
  }

  export type Skill = {
    id: number
    name: string
    iconImageUrl?: string
  }

  export type Tag = {
    id: number
    name: string
  }

  /* 인증 관련 */
  export type postEmailAuthResponseType = UserSummary

  export type postEmailRefreshPayload = {
    refreshToken: string
  }

  export type postEmailRefreshResponseType = {
    accessToken: string
    refreshToken: string
    user: UserSummary
  }

  export type postEmailLoginPayload = {
    email: string
    password: string
  }

  export type postEmailLoginResponseType = {
    accessToken: string
    refreshToken: string
    user: UserSummary
  }

  /* 회원 관련 */
  export type postEmailSignUpPayload = {
    email: string
    password: string
    nickname: string
  }

  export type getUserListPayload = {
    keyword: string
  }

  export type getUserListResponseType = {
    users: UserSummary[]
  }

  export type getUserDetailPayload = { userId: number }

  export type getUserDetailResponseType = UserInfoProperties

  export type UserInfoRequest = {
    nickname: string
    introduction: string
    profileImageUrl: string
    job: string
    career: string
    githubUrl: string
    blogUrl: string
    techStacks: TechStackRequest[]
  }
  export type putUserDetailPayload = {
    userId: number
  } & {
    userInfo: UserInfoRequest
  }

  export type PasswordChangeType = {
    originalPassword: string
    password: string
  }

  export type putUserPasswordPayload = {
    userId: number
    passwordChange: PasswordChangeType
  }

  export type postDoubleCheckEmailPayload = {
    email: string
  }

  export type postDoubleCheckEmailResponseType = {
    isDuplicated: boolean
  }

  export type postDoubleCheckNicknamePayload = {
    nickname: string
  }

  export type getUserProjectsPayload = {
    userId: number
    type: string
  }

  export type postDoubleCheckNicknameResponseType = {
    isDuplicated: boolean
  }

  /* 기술 스택 */
  export type getTechStacksPayload = {
    keyword?: string
  }

  export type getTechStacksResponseType = {
    skills: Skill[]
  }

  /* 프로젝트 파일 */
  export type postProjectFilesPayload = {
    //FIXME: file에 저장될 키 값을 아직 안정함
    file: FormData
  }

  export type postProjectFilesResponseType = {
    fileUrl: string
  }

  /* 프로젝트 게시글 */
  //FIXME: 미완성 api
  export type postProjectPayload = {
    name: string
    overview: string
    ownerId: number
    githubUrl: string
    techStacks: { skillId: number; category: string }[]
    subName: string
    thumbnailUrl: string
    deployUrl: string
    startDate: string
    endDate: string
    overviewImageUrl: string[]
    members: { id: number | null; nickname: string; role: string }[]
    description: string
    troubleShooting: string
  }

  export type getProjectDetailPayload = {
    projectId: number
  }

  export type getProjectDetailResponseType = {
    projectDetailInfo: Project
  }

  export type getAllProjectsResponseType = {
    content: AllProject[]
    totalElements: number
    numberOfElements: number
    hasNext: boolean
  }

  export type getAllProjectsType = {
    sortOption: "createdAt" | "like" | "view"
    isReleased: boolean
    lastProjectId?: number | null
    lastProject?: AllProject | undefined
    search?: string | null
    skills?: string[]
  }

  export type putProjectPayload = {
    projectId: number
  } & Project

  export type deleteProjectPayload = {
    projectId: number
  }

  /* 좋아요 */
  export type getLikeResponseType = {
    likeId: number | null
  }

  export type postLikePayload = {
    projectId: number
  }

  export type deleteLikePayload = {
    likeId: number
  }

  /* 댓글 */

  export type postCommentPayload = {
    ownerId: number
    projectId: number | null
    parentId: number | null
    isAnonymous: boolean
    content: string
  }

  export type editCommentPayload = {
    isAnonymous: boolean
    content: string
    commentId: number
  }

  export type deleteCommentPayload = {
    commentId: number
  }
}
