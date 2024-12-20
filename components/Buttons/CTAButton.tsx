'use client'

import Link from "next/link"

export default function CTAButton( props: { content: string, route: string, color?: string} ) {


  if (props.color) {
    return (
      <Link href={props.route} className="max-w-[250px] max-h-[60px] flex items-center justify-center rounded mt-[20px]">
              <button className={`bg-${props.color}-500 py-2 px-6 rounded text-white text-[20px] max-w-[250px] cursor-pointer transition hover:bg-${props.color}-400 dark:font-medium`}>{props.content}</button>
      </Link>
    );
  }

  return (
    <Link href={props.route} className="max-w-[250px] max-h-[60px] flex items-center justify-center rounded mt-[20px]">
            <button className="bg-green-500 py-2 px-6 rounded text-white text-[20px] max-w-[250px] cursor-pointer transition hover:bg-green-400 dark:font-medium">{props.content}</button>
    </Link>
  );
}
