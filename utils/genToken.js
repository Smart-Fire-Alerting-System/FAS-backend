import jwt from "jsonwebtoken";


const genToken = (userId) => {
    const options = {expiresIn: process.env.JWT_EXPRIRES_IN};
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, options);
    return token;
};

export default genToken;
