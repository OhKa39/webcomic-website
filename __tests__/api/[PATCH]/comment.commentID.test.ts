/**
 * @jest-environment node
*/
import {PATCH} from "@/app/api/comment/[commentID]/route"
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
    // default:{
      comments:{
        update:jest.fn()
      }
    // }
  };
});

describe('[PATCH]/api/comment/[commentID]', () => {
  test('[PATCH]: Should return status code 401 when not log in', async () => {
    (initialUser as jest.Mock).mockResolvedValue(null);
    const req = {
      json: async() =>({
        content: "test"
      })   
    } as any
    const params = {
      params:{
        commentID: "660c3db33876d31837f18b94"
      }
    } as any
    const res = await PATCH(req, params)
    const data = await res.json()
    expect(res.status).toBe(401)
    expect(data.message).toEqual("Unauthorized: Please login to use this feature")
  })

  test('[PATCH]: Should return status code 404 when not found comment', async () => {
    (initialUser as jest.Mock).mockResolvedValue("660bdc823ebb37d1a8dcad81");
    const req = {
      json: async() =>({
        content: "test"
      })   
    } as any
    const params = {
      params:{
        commentID: "660c3db33876d31837f18b12"
      }
    } as any
    const res = await PATCH(req, params)
    const data = await res.json()
    expect(res.status).toBe(404)
    expect(data.message).toEqual("Not Found: Can not find comment")
  })

  test('[PATCH]: Should return status code 403 when comment is not created by userID', async () => {
    (initialUser as jest.Mock).mockResolvedValue("6613696f2e2f1db9bf9661fc");
    const req = {
      json: async() =>({
        content: "test"
      })   
    } as any
    const params = {
      params:{
        commentID: "660bcdb11eac56ae4d451709"
      }
    } as any
    const res = await PATCH(req, params)
    const data = await res.json()
    expect(res.status).toBe(403)
    expect(data.message).toEqual("Forbidden: Can not edit comment with this account")
  })

  test('[PATCH]: Should return status code 400 when content is blank', async () => {
    (initialUser as jest.Mock).mockResolvedValue("660bdc823ebb37d1a8dcad81");
    const req = {
      json: async() =>({
        content: ""
      })   
    } as any
    const params = {
      params:{
        commentID: "660bde813ebb37d1a8dcad83"
      }
    } as any
    const res = await PATCH(req, params)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad Request: content is required")
  })

  test('[PATCH]: Should return status code 400 when content is contain all space', async () => {
    (initialUser as jest.Mock).mockResolvedValue("660bdc823ebb37d1a8dcad81");
    const req = {
      json: async() =>({
        content: "           "
      })   
    } as any
    const params = {
      params:{
        commentID: "660bde813ebb37d1a8dcad83"
      }
    } as any
    const res = await PATCH(req, params)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.message).toEqual("Bad Request: content is required")
  })
})