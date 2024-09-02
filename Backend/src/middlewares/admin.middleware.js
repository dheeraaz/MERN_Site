import { apiError } from "../utils/apiError.js"
import { asyncHandler } from '../utils/asyncHandler.js'

const isAdmin = asyncHandler((req, res, next) => {
    // const user = req.user
    if (!req.user.isAdmin) {
        throw new apiError(401, "User Not Authorized - User is not admin")
    }

    // if user is an admin, proceed to next middleware, or controller
    next();
})

export {
    isAdmin
}