/**
* @jest-environment node
*/
import {GET} from "@/app/api/comment/route"
import moment from "moment";

describe('[GET]/api/comment', () => {
  test('[GET]: Should return status code 200 and sorted list(updateDate: desc) - with exact comicID', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "65f90375ba609768fc30cfdb", chapterId:"undefined"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    let previousDate = 999999999999999999999999999999999999999999999999
    for(const x of data)
    {      
      expect(moment(x["updateAt"]).valueOf()).toBeLessThanOrEqual(previousDate)
      expect(x["comicsId"]).toEqual("65f90375ba609768fc30cfdb")
      expect(x["commentReplyId"]).toBeNull
      previousDate = moment(x["updateAt"]).valueOf()
    }
  })

  test('[GET]: Should return status code 200 and empty list - with wrong comicID format', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "faa4rw", chapterId:"undefined"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and empty list - with true comicID format but not in db', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "65f90375ba609768fc30cekh", chapterId:"undefined"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and empty list - with input both ComicId and chapterId', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "65f90375ba609768fc30cfdb", chapterId:"65f9413effe7bc342723bfeb"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and sorted list(updateDate: desc) - with exact chapterId', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId:"undefined",chapterId:"65f9413effe7bc342723bfeb"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    let previousDate = 999999999999999999999999999999999999999999999999
    for(const x of data)
    {
      expect(moment(x["updateAt"]).valueOf()).toBeLessThanOrEqual(previousDate)
      expect(x["comicChaptersId"]).toEqual("65f9413effe7bc342723bfeb")
      expect(x["commentReplyId"]).toBeNull
      previousDate = moment(x["updateAt"]).valueOf()
    }
  })

  test('[GET]: Should return status code 200 and empty list - with wrong chapterId format', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "undefined", chapterId:"1rqdqd"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and empty list - with true chapterId format but not in db', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({ComicId: "undefined", chapterId:"65f9413effe7bc342723bmke"})
      }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })
})