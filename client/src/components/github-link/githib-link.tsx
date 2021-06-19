import React from 'react';
import { GithubIcon } from '../icons/github';

export const GithubLink = () => {
  return (
    <a
      href="https://github.com/TheAsda/s3mer"
      target="_blank"
      className="bg-gray-800 p-2 w-10 h-10 block rounded-full absolute right-1 bottom-1 transform translate-y-0 hover:-translate-y-1 transition-transform"
    >
      <GithubIcon />
    </a>
  );
};
