import cn from 'classnames';
import { FC, useState } from 'react';

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={cn('fixed left-0 top-0 h-screen bg-neutral p-2', isOpen ? 'w-40' : 'w-12')}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        <span className="sr-only">Abrir menú</span>
        <div className="my-1 h-0.5 w-6 bg-primary" />
        <div className="my-1 h-0.5 w-6 bg-primary" />
        <div className="my-1 h-0.5 w-6 bg-primary" />
      </button>
      {isOpen ? (
        <ul className="flex flex-col gap-4 py-8">
          <li className="inline-flex">
            <a className="h-full w-full p-2" href="/">
              Home
            </a>
          </li>
          <li className="inline-flex">
            <a className="h-full w-full p-2" href="/">
              Home
            </a>
          </li>
        </ul>
      ) : null}
    </header>
  );
};

export default Sidebar;
