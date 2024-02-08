import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppErro } from '../utils/AppErro'

const handleErrorMiddleware = ( err: Error, req: Request, res: Response, next: NextFunction ): Response => {
  if (err instanceof AppErro) {
    return res.status(err.status).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.flatten().fieldErrors });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(409).json({ message: err.message })
  }

  if (err instanceof Error) {
    return res.status(409).json({ message: err.message })
  }
  
  return res.status(500).json({ message: 'Internal Server Error!' })
}

export default handleErrorMiddleware