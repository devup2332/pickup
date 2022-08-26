// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

export const hello: NextApiHandler = async (req, res) => {
	return res.json({ message: 'Works' });
};
