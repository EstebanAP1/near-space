export function NSIcon() {
  return (
    <a
      href='https://github.com/estebanap1/near-space'
      target='_blank'
      className='absolute left-4 top-3 z-20 flex max-h-fit items-center justify-center gap-2 rounded-md border border-primary/25 bg-primary/15 px-4 py-2 backdrop-blur sm:left-8 sm:top-6'>
      <img
        className='h-7 w-auto sm:h-8'
        src='/icon.webp'
        alt='NearSpace White Logo'
      />
      <p className='font-nasa text-white'>NearSpace</p>
    </a>
  )
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
        d='M4 18h16M4 12h16M4 6h16'
      />
    </svg>
  )
}
