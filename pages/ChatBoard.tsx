import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import ChatMessage from './ChatMessage'
import Spinner from './Spinner'

export default function ChatBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { isLoading, data } = useQuery<ChatResponse[]>({
    queryKey: ['chats'],
    queryFn: () =>
      fetch('/api/chats')
        .then((resp) => resp.json())
        .then((data) => data.chats),
  })
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={ref}>
      {isLoading ? (
        <LoadingBoard />
      ) : (
        data?.map(({ id, isBot, message, createdAt }) => (
          <ChatMessage
            key={id}
            isBot={isBot}
            message={message}
            createdAt={new Date(createdAt)}
          />
        ))
      )}
    </div>
  )
}

function LoadingBoard() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Spinner />
    </div>
  )
}
