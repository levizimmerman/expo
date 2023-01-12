import { iconSize } from '@expo/styleguide';
import { IconProps } from '@expo/styleguide/dist/types';

export const PreviewIcon = ({ size = iconSize.md, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3039 12.3883L13.0393 15.6802C12.8399 16.1992 12.1129 16.219 11.8856 15.7117L10.3817 12.3562C10.3152 12.2079 10.1937 12.0913 10.0427 12.0312L7.05426 10.8405C6.56523 10.6456 6.5214 9.9705 6.98113 9.71405L10.097 7.97598C10.2146 7.9104 10.3078 7.80862 10.3629 7.68577L11.8856 4.2883C12.1129 3.78093 12.8399 3.80077 13.0393 4.31978L14.3202 7.65403C14.3749 7.7964 14.4797 7.91385 14.615 7.98427L17.9189 9.70439C18.3994 9.95454 18.3559 10.6558 17.8482 10.8446L14.6695 12.0266C14.5014 12.0892 14.3682 12.2209 14.3039 12.3883Z"
        fill="url(#b85404d2905c5b4aea84d64f60bfb563)"
      />
      <path
        d="M6.45292 6.21188L5.59519 8.31334C5.5268 8.48088 5.29201 8.48757 5.2142 8.32418L4.20314 6.20093C4.17993 6.15221 4.13872 6.11439 4.08819 6.09544L2.10248 5.35079C1.93399 5.28761 1.91946 5.05491 2.07879 4.97127L4.10554 3.90723C4.14541 3.88629 4.17743 3.853 4.19679 3.81234L5.2142 1.67577C5.29201 1.51239 5.5268 1.51907 5.59519 1.68661L6.45842 3.80153C6.47773 3.84884 6.51375 3.8874 6.55963 3.90988L8.71968 4.9683C8.88573 5.04967 8.87136 5.29094 8.69683 5.35202L6.57699 6.09397C6.52065 6.11369 6.47548 6.15662 6.45292 6.21188Z"
        fill="url(#cb36f5e05585073599a6547ca9607ccc)"
      />
      <path
        d="M7.05203 16.5051L6.43154 18.2425C6.3675 18.4218 6.11628 18.4283 6.04304 18.2526L5.3106 16.4947C5.28974 16.4446 5.2502 16.4047 5.20036 16.3833L3.70814 15.7438C3.55193 15.6769 3.53728 15.4611 3.68302 15.3737L5.21931 14.4519C5.25748 14.429 5.28731 14.3945 5.30443 14.3534L6.04304 12.5807C6.11628 12.405 6.3675 12.4115 6.43154 12.5908L7.05737 14.3431C7.0743 14.3905 7.10784 14.4302 7.15177 14.4548L8.7863 15.3701C8.93915 15.4557 8.92453 15.6803 8.76188 15.7453L7.17086 16.3818C7.1154 16.4039 7.07213 16.4489 7.05203 16.5051Z"
        fill="url(#eca3139c9f897a973118a2724860d77a)"
      />
      <defs>
        <linearGradient
          id="b85404d2905c5b4aea84d64f60bfb563"
          x1="10.1113"
          y1="1.55701"
          x2="10.1113"
          y2="18.3808"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC700" />
          <stop offset="0.583333" stopColor="#FF44F8" />
          <stop offset="1" stopColor="#6045FF" />
        </linearGradient>
        <linearGradient
          id="cb36f5e05585073599a6547ca9607ccc"
          x1="10.1113"
          y1="1.55701"
          x2="10.1113"
          y2="18.3808"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC700" />
          <stop offset="0.583333" stopColor="#FF44F8" />
          <stop offset="1" stopColor="#6045FF" />
        </linearGradient>
        <linearGradient
          id="eca3139c9f897a973118a2724860d77a"
          x1="10.1113"
          y1="1.55701"
          x2="10.1113"
          y2="18.3808"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC700" />
          <stop offset="0.583333" stopColor="#FF44F8" />
          <stop offset="1" stopColor="#6045FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const PreviewInactiveIcon = ({ size = iconSize.md, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      =
      <path
        d="M14.3039 12.3883L13.0393 15.6802C12.8399 16.1992 12.1129 16.219 11.8856 15.7117L10.3817 12.3562C10.3152 12.2079 10.1937 12.0913 10.0427 12.0312L7.05426 10.8405C6.56523 10.6456 6.5214 9.9705 6.98113 9.71405L10.097 7.97598C10.2146 7.9104 10.3078 7.80862 10.3629 7.68577L11.8856 4.2883C12.1129 3.78093 12.8399 3.80077 13.0393 4.31978L14.3202 7.65403C14.3749 7.7964 14.4797 7.91385 14.615 7.98427L17.9189 9.70439C18.3994 9.95454 18.3559 10.6558 17.8482 10.8446L14.6695 12.0266C14.5014 12.0892 14.3682 12.2209 14.3039 12.3883Z"
        fill="#9B9EA3"
      />
      <path
        d="M6.45292 6.21188L5.59519 8.31334C5.5268 8.48088 5.29201 8.48757 5.2142 8.32418L4.20314 6.20093C4.17993 6.15221 4.13872 6.11439 4.08819 6.09544L2.10248 5.35079C1.93399 5.28761 1.91946 5.05491 2.07879 4.97127L4.10554 3.90723C4.14541 3.88629 4.17743 3.853 4.19679 3.81234L5.2142 1.67577C5.29201 1.51239 5.5268 1.51907 5.59519 1.68661L6.45842 3.80153C6.47773 3.84884 6.51375 3.8874 6.55963 3.90988L8.71968 4.9683C8.88573 5.04967 8.87136 5.29094 8.69683 5.35202L6.57699 6.09397C6.52065 6.11369 6.47548 6.15662 6.45292 6.21188Z"
        fill="#9B9EA3"
      />
      <path
        d="M7.05203 16.5051L6.43154 18.2425C6.3675 18.4218 6.11628 18.4283 6.04304 18.2526L5.3106 16.4947C5.28974 16.4446 5.2502 16.4047 5.20036 16.3833L3.70814 15.7438C3.55193 15.6769 3.53728 15.4611 3.68302 15.3737L5.21931 14.4519C5.25748 14.429 5.28731 14.3945 5.30443 14.3534L6.04304 12.5807C6.11628 12.405 6.3675 12.4115 6.43154 12.5908L7.05737 14.3431C7.0743 14.3905 7.10784 14.4302 7.15177 14.4548L8.7863 15.3701C8.93915 15.4557 8.92453 15.6803 8.76188 15.7453L7.17086 16.3818C7.1154 16.4039 7.07213 16.4489 7.05203 16.5051Z"
        fill="#9B9EA3"
      />
      <path
        d="M14.304 12.3883L13.0394 15.6801C12.84 16.1992 12.113 16.219 11.8856 15.7116L10.3818 12.3562C10.3153 12.2079 10.1937 12.0913 10.0428 12.0312L7.05434 10.8405C6.56532 10.6456 6.52148 9.97048 6.98121 9.71403L10.0971 7.97596C10.2146 7.91038 10.3079 7.8086 10.363 7.68575L11.8856 4.28828C12.113 3.78091 12.84 3.80075 13.0394 4.31976L14.3203 7.65401C14.375 7.79638 14.4798 7.91383 14.6151 7.98425L17.919 9.70437C18.3995 9.95452 18.356 10.6557 17.8483 10.8445L14.6696 12.0266C14.5014 12.0891 14.3683 12.2209 14.304 12.3883Z"
        fill="#595F68"
      />
    </svg>
  );
};
