/**
* @jest-environment node
*/
import {GET} from "@/app/api/comic/route"

// jest.mock('axios', () => ({
//   get: jest.fn()
//   .mockResolvedValue({ status: 200, data: { foo: 'bar' }})
//   .mockRejectedValue()
// }))

describe('[GET]/api/comic', () => {

  test('[GET]: Should return status code 200 and list with 20 items', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "3", offset: "20"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data["comics"].length).toBe(20)
  })

  test('[GET]: Should return status code 400 - with page contain alphabet char', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "3a", offset: "20"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad request: Page or offset must be a number")
  })

  test('[GET]: Should return status code 400 - with offset contain alphabet char', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "3", offset: "20we"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad request: Page or offset must be a number")
  })

  test('[GET]: Should return all comic name contain `thế` - with sValue exactly match', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "thế"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      expect(x["comicName"].toLowerCase()).toContain("thế");
    }
  })

  test('[GET]: Should return all comic name contain `thế` - with sValue contain at least one UpperCase char', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "tHế"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      expect(x["comicName"].toLowerCase()).toContain("thế");
    }
  })

  test('[GET]: Should return all comic name contain `thế` - with sValue contain at least one space at begin', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "            thế"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      expect(x["comicName"].toLowerCase()).toContain("thế");
    }
  })

  test('[GET]: Should return all comic name contain `thế` - with sValue contain at least one space at end', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "thế              "})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      expect(x["comicName"].toLowerCase()).toContain("thế");
    }
  })

  test('[GET]: Should return all comic name contain `thế` - with sValue contain all UpperCase char', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "THẾ"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      expect(x["comicName"].toLowerCase()).toContain("thế");
    }
  })

  test('[GET]: Should return empty comic array - with sValue does not match with filter condition', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", sValue: "?!#"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data["comics"].length).toBe(0)
  })

  test('[GET]: Should return comic that match categoryIds filter condition - with exact categoryIds', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", categoryIds: "65f9036c61fdfa8e07f48ba4,65f9036c61fdfa8e07f48ba5"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    const testCase = ["65f9036c61fdfa8e07f48ba4", "65f9036c61fdfa8e07f48ba5"]
    expect(res.status).toBe(200)
    for(const x of data["comics"]){
      for(const ele of testCase)
        expect(x["comicTypesIDs"].join(",")).toContain(ele);
    }
  })

  test('[GET]: Should return empty comic array - with contain at least one wrong id format in categoryIds', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", categoryIds: "65f9036c61fdf,65f9036c61fdfa8e07f48ba5"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data["comics"].length).toBe(0)
  })

  test('[GET]: Should return empty comic array - with categoryIds does not match with filter condition', async () => {
    const searchobj = {
      nextUrl:{
        searchParams: new URLSearchParams({page: "1", offset: "999", categoryIds: "65f9036c61fdfa8e07f48ba7,65f9036c61fdfa8e07f48baa"})
      }
    } as any
    const res = await GET(searchobj)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data["comics"].length).toBe(0)
  })
})
