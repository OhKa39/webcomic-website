/**
* @jest-environment node
*/
import {GET} from "@/app/api/comment/[commentID]/route"

describe('[GET]/api/comment/[commentID]', () => {
  test('[GET]: Should return status code 200 and all children of this comment - with exact commentID', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "false"})
      }
    } as any
    const params = {
      params:{
        commentID: "660c3db33876d31837f18b94"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data)   
      expect(x["commentReplyId"]).toEqual("660c3db33876d31837f18b94")
  })

  test('[GET]: Should return status code 200 and empty children list - with wrong commentID format', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "false"})
      }
    } as any
    const params = {
      params:{
        commentID: "fasfreq124"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and empty children list - with true commentID format but not in db', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "false"})
      }
    } as any
    const params = {
      params:{
        commentID: "65f90375ba609768fc30cqwe"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toBe(0)
  })

  test('[GET]: Should return status code 200 and RootChain list - with exact commentID', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "true"})
      }
    } as any
    const params = {
      params:{
        commentID: "661b927604d047ed7576027b"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toEqual(3)
  })

  test('[GET]: Should return status code 200 and empty RootChain list - with wrong commentID format', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "true"})
      }
    } as any
    const params = {
      params:{
        commentID: "reqr1243"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toEqual(0)
  })

  test('[GET]: Should return status code 200 and empty RootChain list - with true commentID format but not in db', async () => {
    const req = {
      nextUrl:{
        searchParams: new URLSearchParams({isGetRootChain: "true"})
      }
    } as any
    const params = {
      params:{
        commentID: "661b927604d047ed7576032s"
      }
    } as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.length).toEqual(0)
  })
})