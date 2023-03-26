import { verify } from "jsonwebtoken";


export default function handlerUser (req, res) {
    const { userToken } = req.cookies;
    if (!userToken) return res.status(401).json({ message: 'User not auth', status: 401 });
    verify(userToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'User not auth', status: 401 });
        res.status(200).json({ message: 'User auth', status: 200, user: decoded })
    });
};