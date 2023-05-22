import { encode } from "../controllers/urlShortner";
import { UrlModel } from "../models/Urls";

UrlModel.create = jest.fn() as jest.Mock;
UrlModel.findOne = jest.fn() as jest.Mock;

describe("app controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
})

  describe('encode controller', () =>{
    it("should create new entry of url", async () => {
      UrlModel.create = jest.fn().mockResolvedValue({
        _id: "65d9c18fe68b3a5a7ea81042",
        visit: 0,
        shortUrl: "https://localhost:5000/short",
        originalUrl: 'https://www.examples.com/'
      })
      UrlModel.findOne = jest.fn().mockResolvedValue(null)
    await expect(encode('https://www.examples.com/')).resolves.toEqual('https://localhost:5000/short');
  });

  it("should get return if shorturl for the provided url already exists", async () => {
    UrlModel.findOne = jest.fn().mockResolvedValue({
      _id: "65d9c18fe68b3a5a7ea81042",
      visit: 0,
      shortUrl: "https://localhost:5000/short",
      originalUrl: 'https://www.examples.com/'
    })
    await expect(encode('https://www.examples.com/')).resolves.toEqual('https://localhost:5000/short');
  });

  })
  

})