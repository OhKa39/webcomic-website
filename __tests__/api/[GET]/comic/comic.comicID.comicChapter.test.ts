/**
* @jest-environment node
*/
import {GET, POST} from "@/app/api/comic/[comicID]/[comicChapter]/route"

describe('[GET]/api/comic/[comicID]/[comicChapter]', () => {

  test('[GET]: Should return status code 200 - with exact comicID and comicChapter', async () => {
    const params = {
      params:{
        comicID: "65f90375ba609768fc30cfdb",
        comicChapter: "1"
      }
    } as any
    const req = {nextUrl:{}} as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(200)
  })

  test('[GET]: Should return status code 404 - with comicChapter is not in db', async () => {
    const params = {
      params:{
        comicID: "65f90375ba609768fc30cfdb",
        comicChapter: "100"
      }
    } as any
    const req = {nextUrl:{}} as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(404)
  })

  test('[GET]: Should return status code 404 - with true comicID format but not in db', async () => {
    const params = {
      params:{
        comicID: "65f90375ba609768fc30cetb",
        comicChapter: "1"
      }
    } as any
    const req = {nextUrl:{}} as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(404)
  })

  test('[GET]: Should return status code 404 - with wrong comicID format', async () => {
    const params = {
      params:{
        comicID: "1234",
        comicChapter: "1"
      }
    } as any
    const req = {nextUrl:{}} as any
    const res = await GET(req, params)
    const data = await res.json()
    expect(res.status).toBe(404)
  })
})
