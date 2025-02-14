import React from 'react'

const PageHero = ({ pageSlogan, subtitle }) => {
  return (
    <div className="h-[320px] bg-blue text-gray flex-none">
      <div className="pt-header px-xl max-w-[1080px] m-[0_auto] h-full flex flex-col justify-center items-center">
        <p className="uppercase font-semibold text-4xl text-center tracking-widest leading-loose">
          {pageSlogan}
        </p>
        {subtitle && (
          <p className="uppercase text-center text-lg mt-md tracking-widest">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default PageHero
