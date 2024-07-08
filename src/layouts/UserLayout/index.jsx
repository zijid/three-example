import { memo, useMemo } from 'react';
export default memo(({ children }) => {
  return (
    <div className='user-layout'>
      {/* <Outlet /> */}
      {children}
    </div>
  );
});
