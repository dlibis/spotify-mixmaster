import { useCallback } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';

import { LoginButton } from '@/components/LoginButton';
import useGetSpotifyData from '@/hooks/useGetSpotifyData';

const Navbar: React.FC = () => {
  const { displayName, loggedIn } = useGetSpotifyData();

  const handleLogOut = useCallback(async () => {
    try {
      await axios.get(`/api/logout`);
      window.location.reload();
      Cookies.remove('connect.sid');
    } catch (e: any) {
      console.error(e);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between md:p-3 h-[var(--nav-height)]">
      <>
        <div className="flex items-center">
          <div>
            <Image src={'images/logo.svg'} fill className="h-full w-full relative" alt="" />
          </div>
          <div className="text-sm md:text-xl font-bold pb-3 ml-[-25px]">Spotify Mixmaster</div>
        </div>
        <LoginButton displayName={displayName} handleLogOut={handleLogOut} loggedIn={loggedIn} />
      </>
    </nav>
  );
};

export default Navbar;
