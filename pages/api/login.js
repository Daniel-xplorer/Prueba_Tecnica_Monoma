import users from '../../users.json';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
// import { NextResponse } from 'next/server';

const {
  JWT_KEY,
  JWT_EXPIRES_IN,
} = process.env;

export default function handlerLogin(req, res) {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) return res.status(401).json({ message: 'User not found', status: 401 });
  if (user.password !== password) return res.status(401).json({ message: 'Password is incorrect', status: 401 });
  const token = jwt.sign({
    email: user.email,
    name: user.name,
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + (JWT_EXPIRES_IN * 60),
  }, JWT_KEY);
  const serialized = serialize('userToken', token, {
    httpOnly: true,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
  res.status(200).json({ message: 'Login success', status: 200 })
  // return NextResponse.redirect(new URL('/dashboard', req.url));
};