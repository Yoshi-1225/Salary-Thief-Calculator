import React from 'react';

interface HeaderProps {
  onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
  return (
    <header className="w-full header-bg shadow-md relative overflow-hidden group">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-center text-white">
        <h1 
          className="text-4xl md:text-6xl font-black mb-2 tracking-tight cursor-pointer hover:text-blue-200 transition-colors select-none drop-shadow-lg"
          onClick={onTitleClick}
        >
          上班跳錢機 💸
        </h1>
        <p className="text-xl font-bold opacity-90">每一秒鐘，都是金錢的聲音</p>
      </div>
    </header>
  );
};

export default Header;