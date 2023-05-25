import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((pathname) => pathname);

  return (
    <nav>
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const isFirst = index === 0;
        return (
          <span key={routeTo}>
            {isFirst == false ?
            (<span> &gt; </span>):""}
            {isLast ? (
              <span>{pathname}</span>
            ) : (
              <Link style={{outline:"none"}} to={routeTo}>{pathname}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
