import React, { ComponentPropsWithoutRef } from 'react';

export const GithubIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      viewBox="0 0 33 32"
      {...props}
    >
      <path
        d="M16.288 0C7.293 0 0 7.293 0 16.29c0 7.197 4.667 13.302 11.14 15.457.815.149 1.112-.354 1.112-.786 0-.386-.014-1.411-.022-2.77-4.531.984-5.487-2.184-5.487-2.184-.741-1.882-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.679 2.495 1.679 1.453 2.489 3.813 1.77 4.741 1.353.148-1.052.568-1.77 1.034-2.177-3.617-.411-7.42-1.809-7.42-8.051 0-1.778.635-3.232 1.677-4.371-.168-.412-.727-2.068.159-4.311 0 0 1.368-.438 4.48 1.67 1.299-.362 2.693-.542 4.078-.548 1.383.006 2.777.186 4.078.548 3.11-2.108 4.475-1.67 4.475-1.67.889 2.243.33 3.899.162 4.311 1.044 1.139 1.675 2.593 1.675 4.371 0 6.258-3.809 7.635-7.438 8.038.585.503 1.106 1.497 1.106 3.017 0 2.177-.02 3.934-.02 4.468 0 .436.293.943 1.12.784 6.468-2.159 11.131-8.26 11.131-15.455C32.579 7.293 25.285 0 16.288 0"
        fill="#fff"
      />
    </svg>
  );
};