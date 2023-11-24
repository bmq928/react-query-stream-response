import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export type ChatMessageProps = {
  isBot: boolean
  message: string
  createdAt: Date
}

export default function ChatMessage({ isBot, ...args }: ChatMessageProps) {
  return isBot ? <BotChatMessage {...args} /> : <HumanChatMessage {...args} />
}

function BotChatMessage({
  message,
  createdAt,
}: Omit<ChatMessageProps, 'isBot'>) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <svg
        className="flex-shrink-0 h-10 w-10 fill-gray-500"
        fill="#000000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z" />
        <ellipse cx={8.5} cy={12} rx={1.5} ry={2} />
        <ellipse cx={15.5} cy={12} rx={1.5} ry={2} />
        <path d="M8 16h8v2H8z" />
      </svg>
      <div className="flex flex-col gap-y-2">
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">{message}</p>
        </div>
        <span className="flex w-full text-xs text-gray-500 leading-none text-right">
          {formatDistanceToNow(createdAt)}
        </span>
      </div>
    </div>
  )
}

function HumanChatMessage({
  message,
  createdAt,
}: Omit<ChatMessageProps, 'isBot'>) {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div className="flex flex-col gap-y-2">
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{message}</p>
        </div>
        <span className="flex w-full text-xs text-gray-500 leading-none justify-end">
          {formatDistanceToNow(createdAt)}
        </span>
      </div>
    </div>
  )
}
