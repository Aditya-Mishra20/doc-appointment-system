// routes will be protected by token
// token used for authorization
// how? middleware is created to get token and compare token, if valid then show route to user
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  // token related data are present in header of request
  // whereas , normal data like form data present in body section req
  // in jsonwebtoken there is Bearer naming convention so we need to split
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res
          .status(200)
          .send({ message: "Auth Failed!", success: false });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Auth Failed!!!!", success: false });
  }
};
