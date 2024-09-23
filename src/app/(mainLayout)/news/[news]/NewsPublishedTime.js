'use client';

import newsPublishedTime from '@utils/newsPublishedTimeFn';

export default function NewsPublishedTime({ data }) {
  if ('createdon' in data) {
    data.blogCreatedon = data.createdon;
  }

  return (
    <div className="flex items-center justify-between text-[#ADADAD] my-2 border-t">
      <span className="text-sm font-semibold py-2">
        {newsPublishedTime(data.blogCreatedon)}
      </span>
    </div>
  );
}
