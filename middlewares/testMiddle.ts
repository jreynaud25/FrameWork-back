export const testMiddle = async (req: Request, _res: Response, next: Function) => {
  console.log("Bonjour le body", req.body)
  next()
}