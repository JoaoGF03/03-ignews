import { NextApiRequest, NextApiResponse } from 'next';

/** Webhooks Stripe
 * Install stripe on machine
 * login on stripe via terminal
 * run 'stripe listen --forward-to localhost:3000/api/webhooks'
*/

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('hi')

  res.status(200).json({ ok: true })
}