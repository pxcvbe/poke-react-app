export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
      {/* <div className="container py-6 text-sm text-gray-700 dark:text-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-3"> */}
      <div className="container py-6 text-sm text-gray-700 dark:text-zinc-300 flex flex-col sm:flex-row items-center justify-center">
        <p>© {new Date().getFullYear()} <span className="font-semibold">Poke.CATCH! - 𝗖𝗮𝘁𝗰𝗵 𝘁𝗵𝗲𝗺 𝗮𝗹𝗹​.</span></p>
        {/* <nav className="flex items-center gap-4">
          <a href="" target="_blank" className="hover:underline text-blue-600 dark:text-blue-400">BEBAS</a>
          <a href="https://github.com/" target="_blank" className="hover:underline text-blue-600 dark:text-blue-400">GitHub</a>
        </nav> */}
      </div>
    </footer>
  )
}