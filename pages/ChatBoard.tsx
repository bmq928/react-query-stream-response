import ChatMessage from './ChatMessage'
import Spinner from './Spinner'

export default function ChatBoard() {
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      <Spinner />
      <ChatMessage
        isBot={false}
        message="Hello loreamda adsfjlajsd;fjasldjfsald faskdjfl;asd"
        createdAt={new Date()}
      />
      <ChatMessage
        isBot={true}
        message="I'am bot aklsdjf;ajsd;fja;lsdjf;ajsd;fj;asjdf;ajs;dfjas;dfj"
        createdAt={new Date()}
      />
    </div>
  )
}
