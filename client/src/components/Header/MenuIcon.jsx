import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MenuIcon = ({ isOpen, setIsOpen }) => {
  const unreadCount = useSelector((state) => state.notifications.unreadCount);

  return (
    <button className='right-2 top-0 lg:hidden' onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        <XMarkIcon className='h-6 w-6 text-slate-900' />
      ) : (
        <Bars3Icon className='h-6 w-6 text-slate-900' />
        
      )}
      {(unreadCount > 0 && !isOpen) &&(<span className="text-sm md:text-sm bg-purple-400 rounded-full absolute top-2 right-1 px-2 transition-all 300 ease">{unreadCount}</span>)}
    </button>);
};

MenuIcon.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default MenuIcon;
