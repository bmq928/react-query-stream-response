/* eslint-disable @next/next/no-img-element */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ChatBoard from './ChatBoard'
import ChatInput from './ChatInput'

export default function Home() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <ChatBoard />
          <ChatInput />
        </div>
      </div>
    </QueryClientProvider>
  )
}
