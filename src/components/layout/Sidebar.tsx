import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { FC, useState } from 'react';

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={cn('fixed left-0 top-0 h-screen bg-neutral p-3', isOpen ? 'w-40' : 'w-12')}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        <span className="sr-only">Abrir menú</span>
        {isOpen ? (
          <XMarkIcon className="h-10 w-7 text-primary transition-all" />
        ) : (
          <Bars3Icon className="h-10 w-7 text-primary transition-all" />
        )}
      </button>
      {isOpen ? (
        <ul className="flex flex-col gap-4 py-8">
          <li className="inline-flex">
            <a className="h-full w-full p-2 hover:text-primary" href="/">
              Home
            </a>
          </li>
          <li className="inline-flex">
            <a className="h-full w-full p-2 hover:text-primary" href="/stats">
              Statistics
            </a>
          </li>
        </ul>
      ) : null}
    </header>
  );
};

export default Sidebar;
