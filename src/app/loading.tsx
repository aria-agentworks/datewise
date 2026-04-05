export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-2xl font-bold text-white">DW</span>
        </div>
        <div className="flex items-center gap-1 justify-center">
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-gray-400 text-sm mt-3">Loading DateWise...</p>
      </div>
    </div>
  )
}
