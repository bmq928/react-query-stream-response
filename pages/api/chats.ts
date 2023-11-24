// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setTimeout } from 'node:timers/promises'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return getChatHistory(req, res)
  if (req.method === 'POST') return askBot(req, res)
  res.status(404).send('Not Found')
}

const db = [
  {
    message: '',
    isBot: false,
    createdAt: new Date(),
  },
  {
    message: '',
    isBot: true,
    createdAt: new Date(),
  },
]
function getChatHistory(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ chats: db })
}
async function askBot(req: NextApiRequest, res: NextApiResponse) {
  const question = req.query.question as string

  db.push({ createdAt: new Date(), message: question, isBot: false })
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked',
  })
  let botAnswer = ''
  for (let i = 0; i < 100; i++) {
    const chunk = question + ' '
    await setTimeout(10)
    botAnswer += chunk
    res.write(chunk)
  }

  db.push({ message: botAnswer, isBot: true, createdAt: new Date() })
  res.end()
}
