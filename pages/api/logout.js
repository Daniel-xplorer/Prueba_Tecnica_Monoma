import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default function handlerLogout(req, res) {
    const { userToken } = req.cookies;
    if (!userToken) return res.status(401).json({ message: 'User not auth', status: 401 });
    verify(userToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'User not auth', status: 401 });
        const serialized = serialize('userToken', '', {
            httpOnly: true,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized);
        res.status(200).json({ message: 'Logout success', status: 200 })
    });
};