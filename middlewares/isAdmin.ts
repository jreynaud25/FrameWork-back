import { Request, Response, NextFunction} from 'express'

export const isAdmin = async (req:Request, res:Response, next: NextFunction) => {
	try {
		if (req.user.status === "admin") {
			return next()
		}
		return res.status(401).json({ message: "Unauthorized" })
	} catch (error) {
		next(error)
	}
}
