// await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data aginst the defined schema
import { apiError } from "../utils/apiError.js";

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    // console.log(error)
    // res.status(400).json({message: error})
    res.status(400).json(new apiError(401, "Validation error", error.errors));
    // const status = 422;
    // const message = err.errors[0];

    // const error = {
    //     status,
    //     message,
    // }

    // console.log(err)
    // next(error)
  }
};

export { validate };
