/**
 * @jest-environment node
*/
import {POST} from "@/app/api/comment/route"
import initialUser from '@/lib/initial-user'
import prisma from '@/lib/db'
jest.mock('@/lib/initial-user', ()=>{
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('@/lib/db', ()=>{
  return {
    __esModule: true,
    ...jest.requireActual("@/lib/db"),
    comments:{
      ...jest.requireActual("@/lib/db").comments,
      create:jest.fn()
    }
  };
});

describe('[POST]/api/comment/', () => {
  test('[POST]: Should return status code 401 when not log in', async () => {
    (initialUser as jest.Mock).mockResolvedValue(null);
    const req = {
      json: async() =>({
        comicsID: "65f90375ba609768fc30cfdb",
        content: "test"
      })   
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(401)
    expect(data.message).toEqual("Unauthorized: Please login to use this feature")
  })

  test('[POST]: Should return status code 201 when logged in and sent true format data to comic', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    (prisma.comments.create as jest.Mock).mockResolvedValue({
      "id": "6649a31fcca08269ba08b831",
      "content": "Abc",
      "commentReplyId": null,
      "userID": "6613696f2e2f1db9bf9661fc",
      "createdAt": "2024-05-19T06:58:39.525Z",
      "updateAt": "2024-05-19T06:58:39.525Z",
      "comicsId": "65f90375ba609768fc30cfdb",
      "comicChaptersId": null,
      "userLikesId": [],
      "user": {
          "id": "6613696f2e2f1db9bf9661fc",
          "role": "MEMBER",
          "name": "Khoa Lý",
          "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZW5sUUx6V3J4STJuTDBkUjVXWTF3U1VtUFQifQ"
      }
  })
    const req = {
      json: async() =>({
        comicsID: "65f90375ba609768fc30cfdb",
        content: "Abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(201)
    expect(data.comicsID).toEqual("65f90375ba609768fc30cfdb")
    expect(data.userID).toEqual("6613696f2e2f1db9bf9661fc")
    expect(data.content).toEqual("Abc")
  })

  test('[POST]: Should return status code 400 when input both comicID and chapterID', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        comicsID: "65f90375ba609768fc30cfdb",
        chapterID: "65f90375ba609768fc30cfdb",
        content: "Abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad Request: Can not have both chapterID and comicsID")
  })

  test('[POST]: Should return status code 400 when content is blank', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        comicsID: "65f90375ba609768fc30cfdb",
        content: ""
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad Request: Content is required")
  })

  test('[POST]: Should return status code 400 when content is contain all space', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        comicsID: "65f90375ba609768fc30cfdb",
        content: "                "
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad Request: Content is required")
  })

  test('[POST]: Should return status code 404 when comicID has true format but not in db', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        comicsID: "65f904b3ba609768fc30d023",
        content: "abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(404)
    expect(data.message).toEqual("Not Found: Can not find comic")
  })

  test('[POST]: Should return status code 400 when comicID has wrong format', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        comicsID: "123214",
        content: "abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Some fields are wrong format")
  })

  test('[POST]: Should return status code 404 when chapterID has true format but not in db', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        chapterID: "65f94174ffe7bc342723c069",
        content: "abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(404)
    expect(data.message).toEqual("Not Found: Can not find comic chapter")
  })

  test('[POST]: Should return status code 400 when chapterID has wrong format', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        chapterID: "1234",
        content: "abc"
      })
    } as any
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Some fields are wrong format")
  })
})