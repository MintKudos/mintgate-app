import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { func, string } from 'prop-types';
import Button from 'mintflow/Button';

export const DarkModeToggel = ({ theme, themeToggler }) => {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <motion.div onClick={themeToggler} layout transition={spring}>
      <motion.div whileTap={{ rotate: 360 }}>
        <Button variant="nav" circle>
          {theme === 'light' ? (
            <SunIcon className="h-5 w-5 text-base-content" />
          ) : (
            <MoonIcon className="h-5 w-5 text-base-content" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};
