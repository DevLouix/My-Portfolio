export const CodeBlockComponent = ({ code, language }: any) => {
  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-gray-900 shadow-xl border border-gray-800">
      <div className="flex items-center justify-between px-5 py-2 bg-gray-800/50">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{language}</span>
        <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
      </div>
      <pre className="p-6 text-sm md:text-base text-blue-100 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}