// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'node:crypto'
import { setTimeout } from 'node:timers/promises'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return getChatHistory(req, res)
  if (req.method === 'POST') return askBot(req, res)
  res.status(404).send('Not Found')
}

const db = [
  {
    id: randomUUID(),
    message: 'Hello',
    isBot: false,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    message: 'Hi my name is Javis, nice to help you.',
    isBot: true,
    createdAt: new Date(),
  },
]
function getChatHistory(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ chats: db })
}
async function askBot(req: NextApiRequest, res: NextApiResponse) {
  const question = req.query.question as string
  const questionId = randomUUID()
  const responseId = randomUUID()
  const now = new Date()

  db.push({
    id: questionId,
    createdAt: now,
    message: question,
    isBot: false,
  })
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    // 'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked',
    'x-question-id': questionId,
    'x-response-id': responseId,
    'x-question-created-at': now.toString(),
    'x-response-created-at': now.toString(),
  })
  let botAnswer = 'This is bot answer: '
  res.write(botAnswer)
  for (let i = 0; i < 100; i++) {
    const chunk = question + ' '
    botAnswer += chunk
    res.write(chunk)

    await setTimeout(100)
  }

  db.push({
    id: responseId,
    message: botAnswer,
    isBot: true,
    createdAt: now,
  })
  res.end()
}
