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
async function getChatHistory(req: NextApiRequest, res: NextApiResponse) {
  await setTimeout(1000)
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
  let respAnswer = 'This is bot answer: '
  const generatedAnswer = `AWS Aurora does not use a traditional Network Attached Storage (NAS) for its cluster volumes. Instead, Amazon Aurora is designed to automatically replicate your data across multiple Availability Zones (AZs) in a region, and it abstracts the storage layer from the user. Here’s how it works:
  - When you use Amazon Aurora, you are given what's called an "Aurora Cluster Volume," which is a virtual database storage volume that spans multiple AZs and is automatically replicated six times across three Availability Zones.
  - The storage layer of Aurora is managed by AWS and is designed to be fault-tolerant, self-healing, and highly available. Data blocks and disks are continuously scanned for errors and repaired automatically.
  - Amazon Aurora uses a distributed, multitenant storage subsystem that AWS built specifically for the relational database. This storage layer is designed to perform automatic scaling and can grow up to 128 TiB in size.
  - Given its distributed nature and the way it handles data replication and scaling, Aurora's storage layer does share some similarities with a Network Attached Storage system in that it is network-based and separates the database engine from the data storage. However, Aurora's storage is not accessible in a manner similar to a NAS where you would have a network path to a shared volume. It is a proprietary storage service fully managed by AWS and specifically optimized for the Aurora databases.
  - The Aurora cluster volume is designed to offer greater resiliency against the loss of an entire AZ and to provide read replicas with very low replica lag.
  For the choice of storage, when you choose Aurora, you are specifically opting for a managed, high-performance database storage backend that's tailored for relational database patterns and not a generalized NAS.`
  res.write(respAnswer)

  for (const word of generatedAnswer.split(' ')) {
    const chunk = word + ' '
    respAnswer += chunk
    res.write(chunk)

    await setTimeout(100)
  }

  db.push({
    id: responseId,
    message: respAnswer,
    isBot: true,
    createdAt: now,
  })
  res.end()
}
