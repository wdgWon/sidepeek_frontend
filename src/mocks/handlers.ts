import { projectsHandlers, userInfoHandlers } from "@pages/ProfilePage/mocks"

import { searchHandlers } from "@components/Search/mocks"

import allProjectHandlers from "@pages/HomePage/mocks"
import { projectDetailHandlers } from "@pages/ProjectDetailPage/mocks"

import { postEmailLogin } from "./auth/postEmailLogin.mock"
import { postEmailRefresh } from "./auth/postEmailRefresh.mock"

export const handlers = [
  rest.get("/api/v1/skills", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        skills: [
          {
            id: 2,
            name: "spring",
            iconImageUrl: "https://www.iconimageurl.com",
          },
          {
            id: 3,
            name: "swift",
            iconImageUrl: "https://www.iconimageurl.com",
          },
        ],
      }),
    )
  }),
  ...projectDetailHandlers,
  ...searchHandlers,
  ...allProjectHandlers,
  postEmailRefresh,
  postEmailLogin,
  ...userInfoHandlers,
  ...projectsHandlers
]
