import { FC } from 'react';

const Loading: FC = () => (
  <div className="fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50">
    <div className="spinner" />
  </div>
);

export default Loading;
